import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, type NodeChange, type EdgeChange, Background, Controls, MiniMap, useNodesState, useEdgesState } from '@xyflow/react';
import { useState, useCallback } from 'react';
import ElkNode from '~/components/customNodes/ElkNode';
import { nodes as initNodes } from '~/repositories/mockData/nodes';
import { edges as initEdges } from '~/repositories/mockData/edges';
import useLayoutNodes from '~/hooks/useLayoutNodes';

const nodeTypes = {
  elk: ElkNode,
};

   
  export default function FlowTest() {
    const [nodes, , onNodesChange] = useNodesState(initNodes);
    const [edges, , onEdgesChange] = useEdgesState(initEdges);

    useLayoutNodes();
   
    return (
      <div style={{ width: '100vw', height: '92vh' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          fitView
        >
          <Background />
          <Controls />
          <MiniMap />
      </ReactFlow>
      </div>
    );
  }