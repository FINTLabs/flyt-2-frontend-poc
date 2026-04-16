import React, { type DragEventHandler, useCallback, useEffect, useState } from 'react';
import { Button, HStack } from '@navikt/ds-react';
import { useNavigate, useParams } from 'react-router';
import '@xyflow/react/dist/style.css';
import {
    addEdge,
    Background,
    BackgroundVariant,
    type Connection,
    Controls,
    type Edge,
    type EdgeChange,
    MiniMap,
    type Node,
    type NodeChange,
    type OnConnect,
    type OnDelete,
    type OnNodeDrag,
    Panel,
    ReactFlow,
    useEdgesState,
    useNodesState,
    useReactFlow,
    useUpdateNodeInternals,
    type XYPosition,
} from '@xyflow/react';
import { SmartStepEdge } from '@tisoap/react-flow-smart-edge';

import { useFlow } from '~/context/flowContext';
import useLayoutNodes from '~/context/useLayoutNodes';
import type { CustomNodeDemo } from '~/types/nodeTypes';
import { IGNORED_CHANGES, NODE_BASE_HEIGHT, NODE_BASE_WIDTH } from '~/utils/constants';
import { getMinimapNodeColor, getMinimapNodeStrokeColor } from '~/utils/minimapUtils';
import { isConnectionAllowed } from '~/utils/datatypeUtils';
import { nodeTypes } from '~/components/customNodes/nodetypes';
import { allIntegrationsNodes } from '~/mockData/nodes/instances';

const edgeTypes = {
    smart: SmartStepEdge,
};

const Flow = () => {
    const {
        currentFlow,
        initNodes,
        initEdges,
        newNodeId,
        setNewNodeId,
        getCustomNodeDataById,
        saveFlow,
    } = useFlow();
    let navigate = useNavigate();

    const [nodes, setNodes, onNodesChange] = useNodesState<CustomNodeDemo>(initNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>(initEdges);
    const { screenToFlowPosition, getNode } = useReactFlow();
    const [hasChanged, setHasChanged] = useState(false);
    const { mode } = useParams();
    const updateNodeInternals = useUpdateNodeInternals();
    const { getIntersectingNodes } = useReactFlow();
    const { resetLayout } = useLayoutNodes();

    useEffect(() => {
        setNodes(initNodes);
        setEdges(initEdges);
    }, [initNodes, initEdges]);

    const onRedoLayout = useCallback(() => {
        resetLayout();
    }, [nodes, edges]);

    const handleNodePosition = useCallback(
        (node: CustomNodeDemo, position: XYPosition): CustomNodeDemo => {
            const intersections = getIntersectingNodes(
                position ? { ...position, width: NODE_BASE_WIDTH, height: NODE_BASE_HEIGHT } : node
            );

            if (intersections.some((n) => n.type === 'listOperation' || n.type === 'innerFlow')) {
                const parentNode = intersections.find(
                    (n) => n.type === 'listOperation' || n.type === 'innerFlow'
                );

                return { ...node, parentId: parentNode?.id, extent: 'parent' };
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

    const onDelete: OnDelete = useCallback(() => {
        setHasChanged(true);
    }, []);

    const onNodeDrag: OnNodeDrag = useCallback((_: React.MouseEvent, node: Node) => {
        // TODO: handle the possibility of dragging an existing node into a parentNode
        setHasChanged(true);
    }, []);

    const onDragOver = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (event: React.DragEvent) => {
            event.preventDefault();
            if (!newNodeId) return;
            const position = screenToFlowPosition({ x: event.clientX, y: event.clientY });
            let newNode = getCustomNodeDataById(newNodeId);
            const positionedNode = handleNodePosition(newNode, position);

            setNodes((nds) => [...nds, positionedNode]);
            updateNodeInternals(positionedNode.id);
            setHasChanged(true);
        },
        [screenToFlowPosition, newNodeId]
    );

    // @ts-ignore
    const onDragStart: DragEventHandler<HTMLDivElement> = (
        event: React.DragEvent<HTMLDivElement>,
        nodeId: string
    ) => {
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

    const isValidConnection = useCallback((edge: Edge | Connection): boolean => {
        const sourceNode = getNode(edge.source);
        const targetNode = getNode(edge.target);
        if (!sourceNode || !targetNode) return false;
        return isConnectionAllowed(edge, sourceNode, targetNode);
    }, []);

    const handleNodesChange = useCallback((changes: NodeChange<CustomNodeDemo>[]) => {
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
            onDelete={onDelete}
            onNodeDrag={onNodeDrag}
            onDragStart={onDragStart}
            isValidConnection={isValidConnection}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            fitView
            defaultEdgeOptions={{ type: 'smoothstep' }}
            selectNodesOnDrag={false}
            attributionPosition="bottom-left"
        >
            <Background variant={BackgroundVariant.Dots} />
            <MiniMap
                nodeStrokeColor={(n: Node): string => getMinimapNodeStrokeColor(n)}
                nodeColor={(n) => getMinimapNodeColor(n)}
            />
            <Panel position="top-right">
                {currentFlow?.id !== 'demo' && mode === 'edit' && (
                    <HStack gap={'2'} wrap={false}>
                        <Button variant="secondary" size="small" onClick={() => onRedoLayout()}>
                            Autolayout
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
