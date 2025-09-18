import React, { useEffect, useCallback, useState } from 'react';
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
    Panel, useUpdateNodeInternals,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import { getMinimapNodeColor, getMinimapNodeStrokeColor } from '~/utils/nodeHandlers';
import { IntegrationNode } from '~/components/customNodes/IntegrationNode';
import { OperationNode } from '~/components/customNodes/OperationNode';
import { VariableNode } from '~/components/customNodes/functionalNodes/VariableNode';
import { useFlow } from '~/context/flowContext';
import { JoinTextOperationNode } from '~/components/customNodes/functionalNodes/JoinTextOperationNode';
import { Button, HStack } from '@navikt/ds-react';
import { CreateNewFlowModal } from '~/components/modals/createNewFlowModal';
import { useParams } from 'react-router';
import { OperationOpenObjectNode } from '~/components/customNodes/functionalNodes/OperationOpenObjectNode';
import { InnerFlowListOperation } from '~/components/customNodes/functionalNodes/OperationListInnerFlowNode';
import { InnerFlowDataNode } from '~/components/customNodes/functionalNodes/InnerFlowDataNode';

const nodeTypes = {
    flowInput: IntegrationNode,
    operation: OperationNode,
    variableInput: VariableNode,
    externalFunction: OperationNode,
    flowOutput: IntegrationNode,
    operationJoinText: JoinTextOperationNode,
    openObject: OperationOpenObjectNode,
    createObject: OperationOpenObjectNode,
    listOperation: InnerFlowListOperation,
    innerFlowInput: InnerFlowDataNode,
    innerFlowOutput: InnerFlowDataNode,
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
        saveNewFlow,
    } = useFlow();
    const [nodes, setNodes, onNodesChange] = useNodesState<Node>(initNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>(initEdges);
    const { screenToFlowPosition, getNode } = useReactFlow();
    const [hasChanged, setHasChanged] = useState(false);
    const [showNewFlowModal, setShowNewFlowModal] = useState(false);
    const { mode } = useParams();
    const updateNodeInternals = useUpdateNodeInternals();
    const { getIntersectingNodes } = useReactFlow();

    useEffect(() => {
        setNodes(initNodes);
        setEdges(initEdges);
    }, [initNodes, initEdges]);

    const onConnect: OnConnect = useCallback(
        (connection) => {
            setEdges((eds) => addEdge(connection, eds));
        },
        [setEdges]
    );

    const onNodeDrag = useCallback((_: React.MouseEvent, node: Node) => {
        const intersections = getIntersectingNodes(node).map((n) => n.id);

        // TODO: if parentnode is of type listoperation, then add that as parent
        // console.log('Intersections:', intersections);
/*        setNodes((ns) =>
            ns.map((n) => ({
                ...n,
                className: intersections.includes(n.id) ? 'highlight' : '',
            })),
        );*/
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
            const position = screenToFlowPosition({ x: event.clientX, y: event.clientY });
            const newNode = getCustomNodeDataById(newNodeId);
            setNodes((nds) => [...nds, {...newNode, position}]);
            setHasChanged(true);
        },
        [screenToFlowPosition, newNodeId]
    );

    const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeId: string) => {
        console.log('Flow onDragStart', nodeId);
        setNewNodeId(nodeId);
        event.dataTransfer.setData('text/plain', nodeId);
        event.dataTransfer.effectAllowed = 'move';
    };

    const handleSave = useCallback(() => {
        if (!currentFlow || currentFlow.id === 'new') {
            setShowNewFlowModal(true);
        } else {
            saveFlow(currentFlow.id, nodes, edges);
            setHasChanged(false);
        }
    }, [nodes, edges]);

    const handleSaveNewFlow = useCallback(
        (name: string) => {
            saveNewFlow(name, nodes, edges);
            setShowNewFlowModal(false);
            setHasChanged(false);
        },
        [nodes, edges]
    );

    //TODO: handle type object by checking typeName
    const isValidDatatypeConnection = useCallback((edge: Edge | Connection): boolean => {
        const sourceNodeData = getNode(edge.source)?.data;
        const targetNodeData = getNode(edge.target)?.data;
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

    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
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
                <CreateNewFlowModal
                    open={showNewFlowModal}
                    onCancel={() => setShowNewFlowModal(false)}
                    onSave={handleSaveNewFlow}
                />
            </Panel>
            <Controls />
        </ReactFlow>
    );
};

export default Flow;
