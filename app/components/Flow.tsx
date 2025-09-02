import React, { useEffect, useCallback } from 'react';
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
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import { getMinimapNodeColor, getMinimapNodeStrokeColor } from '~/utils/nodeHandlers';
import { IntegrationNode } from '~/components/customNodes/IntegrationNode';
import { OperationNode } from '~/components/customNodes/OperationNode';
import { VariableNode } from '~/components/customNodes/VariableNode';
import { useFlow } from '~/context/flowContext';
import { JoinTextOperationNode } from '~/components/customNodes/functionalNodes/JoinTextOperationNode';

const nodeTypes = {
    flowInput: IntegrationNode,
    operation: OperationNode,
    variableInput: VariableNode,
    externalFunction: OperationNode,
    flowOutput: IntegrationNode,
    operationJoinText: JoinTextOperationNode,
};

const Flow = () => {
    const { initNodes, initEdges, newNodeId, setNewNodeId, getNodeDataById } = useFlow();
    const [nodes, setNodes, onNodesChange] = useNodesState<Node>(initNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>(initEdges);
    const { screenToFlowPosition } = useReactFlow();
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

    const onDragOver = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (event: React.DragEvent) => {
            event.preventDefault();
            if (!newNodeId) return;

            const nodeData = getNodeDataById(newNodeId);
            const position = screenToFlowPosition({ x: event.clientX, y: event.clientY });
            const newNode = { ...nodeData, position };

            setNodes((nds) => [...nds, newNode]);

            if (newNode.type === 'operationJoinText') {
                const newInputNodeData = getNodeDataById('variableInputNode');
                const inputPosition = screenToFlowPosition({ x: event.clientX - 300, y: event.clientY +55 });
                const newInputNode = { ...newInputNodeData, position: inputPosition };
                const newEdge = {
                    id: `e${newInputNode.id}-${newNode.id}`,
                    source: newInputNode.id,
                    target: newNode.id,
                    targetHandle: 'b',
                    type: 'step',
                };

                setNodes((nds) => [...nds, newInputNode]);
                setEdges((eds) => [...eds, newEdge]);
            }
        },
        [screenToFlowPosition, newNodeId]
    );

    const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeId: string) => {
        console.log('Flow onDragStart', nodeId);
        setNewNodeId(nodeId);
        event.dataTransfer.setData('text/plain', nodeId);
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDrop={onDrop}
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            fitView
            defaultEdgeOptions={{ type: 'step' }}
            attributionPosition="bottom-left">
            <Background variant={BackgroundVariant.Dots} />
            <MiniMap
                nodeStrokeColor={(n: Node): string => getMinimapNodeStrokeColor(n)}
                nodeColor={(n) => getMinimapNodeColor(n)}
            />
            <Controls />
        </ReactFlow>
    );
};

export default Flow;
