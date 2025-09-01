import React, {
    useEffect,
    useCallback,    
} from 'react';
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
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import {
    getMinimapNodeColor,
    getMinimapNodeStrokeColor,
} from '~/utils/nodeHandlers';
import { IntegrationNode } from '~/components/customNodes/IntegrationNode';
import { OperationNode } from '~/components/customNodes/OperationNode';
import { VariabelNode } from '~/components/customNodes/VariabelNode';
import { useFlow } from '~/context/flowContext';

const nodeTypes = {
    flowInput: IntegrationNode,
    operation: OperationNode,
    variableInput: VariabelNode,
    externalFunction: OperationNode,
    flowOutput: IntegrationNode
};

const Flow = () => {
    const { initNodes, initEdges } = useFlow();
    const [nodes, setNodes, onNodesChange] = useNodesState<Node>(initNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>(initEdges);

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

    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView
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
