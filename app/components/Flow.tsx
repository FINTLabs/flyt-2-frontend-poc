import React, { useEffect, useCallback, useState, type DragEventHandler } from 'react';
import {
    ReactFlow,
    useNodesState,
    useEdgesState,
    addEdge,
    MiniMap,
    Controls,
    type Node,
    type Edge,
    type OnConnect,
    BackgroundVariant,
    Background,
    useReactFlow,
    type Connection,
    Panel,
    useUpdateNodeInternals,
    type XYPosition,
    type OnNodeDrag,
    type NodeChange,
    type EdgeChange,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import { getMinimapNodeColor, getMinimapNodeStrokeColor } from '~/utils/nodeHandlers';
import { useFlow } from '~/context/flowContext';
import { Button, HStack } from '@navikt/ds-react';
import { useNavigate, useParams } from 'react-router';
import { IGNORED_CHANGES, NODE_BASE_HEIGHT } from '~/mockData/constants';
import { allIntegrationsNodes } from '~/mockData/nodes';
import { nodeTypes } from '~/components/customNodes/nodetypes';
import type { CustomNode } from '~/types/nodeTypes';

const Flow = () => {
    const {
        currentFlow,
        initNodes,
        initEdges,
        newNodeId,
        setNewNodeId,
        getCustomNodeDataById,
        saveFlow,
        saveNewFlow,
    } = useFlow();
    let navigate = useNavigate();

    const [nodes, setNodes, onNodesChange] = useNodesState<CustomNode>(initNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>(initEdges);
    const { screenToFlowPosition, getNode } = useReactFlow();
    const [hasChanged, setHasChanged] = useState(false);
    const { mode } = useParams();
    const updateNodeInternals = useUpdateNodeInternals();
    const { getIntersectingNodes, isNodeIntersecting } = useReactFlow();

    useEffect(() => {
        setNodes(initNodes);
        setEdges(initEdges);
    }, [initNodes, initEdges]);

    const handleNodePosition = useCallback(
        (node: CustomNode, position?: XYPosition): CustomNode => {
            const intersections = getIntersectingNodes(
                position ? { ...position, width: NODE_BASE_HEIGHT, height: NODE_BASE_HEIGHT } : node
            );

            if (intersections.some((n) => n.type === 'listOperation')) {
                const parentNode = intersections.find((n) => n.type === 'listOperation');
                return { ...node, parentId: parentNode?.id };
            } else if (position) {
                return { ...node, position };
            } else {
                return node;
            }
        },
        [getIntersectingNodes]
    );

    const onConnect: OnConnect = useCallback(
        (connection) => {
            setHasChanged(true);
            setEdges((eds) => addEdge(connection, eds));
        },
        [setEdges]
    );

    const onNodeDrag: OnNodeDrag = useCallback((_: React.MouseEvent, node: Node) => {
        // TODO: handle the possibility of dragging an existing node into a parentNode
        setHasChanged(true);
    }, []);

    const onDragOver = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        console.log('Flow onDragOver');
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (event: React.DragEvent) => {
            event.preventDefault();
            if (!newNodeId) return;
            console.log('event', event);
            const position = screenToFlowPosition({ x: event.clientX, y: event.clientY });
            let newNode = getCustomNodeDataById(newNodeId);
            const positionedNode = handleNodePosition(newNode, position);

            console.log('New node:', positionedNode);
            setNodes((nds) => [...nds, positionedNode]);
            updateNodeInternals(positionedNode.id);
            setHasChanged(true);
        },
        [screenToFlowPosition, newNodeId]
    );

    const onDragStart: DragEvent<HTMLDivElement> = (
        event: React.DragEvent<HTMLDivElement>,
        nodeId: string
    ) => {
        console.log('Flow onDragStart', nodeId);
        setNewNodeId(nodeId);
        event.dataTransfer.setData('text/plain', nodeId);
        event.dataTransfer.effectAllowed = 'move';
    };

    const handleSave = useCallback(() => {
        if (!currentFlow || currentFlow.id === 'new') {
            navigate(`/flows/new`, { replace: true });
        } else {
            saveFlow(currentFlow.id, nodes, edges);
            setHasChanged(false);
        }
    }, [nodes, edges]);

    const handleCancel = useCallback(() => {}, []);

    //TODO: handle type object by checking typeName
    const isValidDatatypeConnection = useCallback((edge: Edge | Connection): boolean => {
        const sourceNodeData = getNode(edge.source)?.data;
        const targetNode = getNode(edge.target);
        if (targetNode && targetNode.type === 'innerFlowOutput') return true;
        const targetNodeData = targetNode?.data;
        if (!sourceNodeData || !targetNodeData) return false;

        const sourceHandleType = sourceNodeData.sourceHandles
            ? Object.values(sourceNodeData.sourceHandles).find((h) => h.id === edge.sourceHandle)
                  ?.type
            : sourceNodeData.type;

        const targetHandleType = targetNodeData.targetHandles
            ? Object.values(targetNodeData.targetHandles).find((h) => h.id === edge.targetHandle)
                  ?.type
            : targetNodeData.type;

        if (sourceHandleType && targetHandleType) {
            return sourceHandleType === targetHandleType;
        }
        return false;
    }, []);

    const handleNodesChange = useCallback((changes: NodeChange<CustomNode>[]) => {
        const filteredChanges = changes.filter(
            (change) =>
                change.type !== 'remove' || !allIntegrationsNodes.some((n) => n.id === change.id)
        );
        setHasChanged(filteredChanges.some((change) => !IGNORED_CHANGES.includes(change.type)));
        onNodesChange(filteredChanges);
    }, []);

    const handleEdgesChange = useCallback((changes: EdgeChange[]) => {
        setHasChanged(changes.some((change) => !IGNORED_CHANGES.includes(change.type)));
        onEdgesChange(changes);
    }, []);

    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={handleNodesChange}
            onEdgesChange={handleEdgesChange}
            onConnect={onConnect}
            onDrop={onDrop}
            onNodeDrag={onNodeDrag}
            onDragStart={onDragStart}
            isValidConnection={isValidDatatypeConnection}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            fitView
            defaultEdgeOptions={{ type: 'step' }}
            selectNodesOnDrag={false}
            attributionPosition="bottom-left">
            <Background variant={BackgroundVariant.Dots} />
            <MiniMap
                nodeStrokeColor={(n: Node): string => getMinimapNodeStrokeColor(n)}
                nodeColor={(n) => getMinimapNodeColor(n)}
            />
            <Panel position="top-right">
                {currentFlow?.id !== 'demo' && mode === 'edit' && (
                    <HStack gap={'2'} wrap={false}>
                        <Button variant="secondary" disabled={!hasChanged} size="small">
                            Avbryt
                        </Button>
                        <Button disabled={!hasChanged} size="small" onClick={handleSave}>
                            Lagre
                        </Button>
                    </HStack>
                )}
            </Panel>
            <Controls />
        </ReactFlow>
    );
};

export default Flow;
