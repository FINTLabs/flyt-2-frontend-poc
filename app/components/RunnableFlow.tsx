import React, { useEffect, useState } from 'react';
import { ReactFlow, Controls, BackgroundVariant, Background } from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import { useFlow } from '~/context/flowContext';
import { nodeTypes } from '~/components/customNodes/nodetypes';

const RunnableFlow = () => {
    const { initNodes, initEdges } = useFlow();

    const [nodes, setNodes] = useState(initNodes);
    const [edges, setEdges] = useState(initEdges);

    useEffect(() => {
        setNodes(initNodes);
        setEdges(initEdges);
    }, [initNodes, initEdges]);

    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            nodesDraggable={false}
            elementsSelectable={false}
            nodesConnectable={false}
            selectNodesOnDrag={false}
            fitView
            isValidConnection={() => false}
            defaultEdgeOptions={{ type: 'step' }}>
            <Background variant={BackgroundVariant.Dots} />
            <Controls showInteractive={false} />
        </ReactFlow>
    );
};

export default RunnableFlow;
