import React, {
    useState,
    useEffect,
    useCallback,
    type ChangeEvent,
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
    Background, useUpdateNodeInternals,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import { initBgColor } from '~/mockData/constants';
import { getInitialColorDemoNodes } from '~/mockData/nodes';
import { initDemoEdges } from '~/mockData/edges';
import {
    getMinimapNodeColor,
    getMinimapNodeStrokeColor,
    onChangeNodeColor,
} from '~/utils/nodeHandlers';
import { IntegrationNode } from '~/components/customNodes/IntegrationNode';
import { OperationNode } from '~/components/customNodes/OperationNode';
import { VariabelNode } from '~/components/customNodes/VariabelNode';

const nodeTypes = {
    flowInput: IntegrationNode,
    operation: OperationNode,
    variableInput: VariabelNode,
    externalFunction: OperationNode,
    flowOutput: IntegrationNode
};

const DemoFlow = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
    const [bgColor, setBgColor] = useState(initBgColor);

    const updateNodeInternals = useUpdateNodeInternals();


    useEffect(() => {
        const onChange = (event: ChangeEvent<HTMLInputElement>) => {
            const { newColor, newNodes } = onChangeNodeColor(event, nodes);
            setBgColor(newColor);
            setNodes(newNodes);
        };

        const nodes = getInitialColorDemoNodes(initBgColor, onChange);

        setNodes(nodes);
        setEdges(initDemoEdges);
        updateNodeInternals(nodes.map((node) => node.id));
    }, []);


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
                nodeStrokeColor={(n: Node): string => getMinimapNodeStrokeColor(n, bgColor)}
                nodeColor={(n) => getMinimapNodeColor(n)}
            />
            <Controls />
        </ReactFlow>
    );
};

export default DemoFlow;
