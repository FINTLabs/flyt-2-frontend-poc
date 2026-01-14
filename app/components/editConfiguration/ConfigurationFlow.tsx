import { useCallback, useEffect, useState } from 'react';
import {
    addEdge,
    applyEdgeChanges,
    applyNodeChanges,
    ReactFlow,
    type EdgeChange,
    type NodeChange,
    useNodesInitialized,
    useReactFlow,
    useEdgesState,
    useNodesState,
    useUpdateNodeInternals,
} from '@xyflow/react';
import type { IInstanceMetadataContent } from '~/types/data/integration';
import useLayoutNodes, { getLayoutedNodes } from '~/context/useLayoutNodes';
import { initEdges, initNodes, mapMetaDataToNode } from '~/dataHandlers/dataMapper/metadataMapper';
import {
    allNodeTypes,
    type CustomNode,
    type CustomNodeTypes,
    type ElkNode,
} from '~/types/flow/nodes';

type ConfigurationFlowProps = {
    metadataContent?: IInstanceMetadataContent;
};

// http://localhost:3000/integration/configuration/edit/18
const ConfigurationFlow = ({ metadataContent }: ConfigurationFlowProps) => {
    const [nodes, setNodes, onNodesChange] = useNodesState<CustomNode>(initNodes);
    const [edges, , onEdgesChange] = useEdgesState(initEdges);

    useLayoutNodes();

    useEffect(() => {
        console.log('=== metadataContent', metadataContent);
        const metadataNode = mapMetaDataToNode(metadataContent);
        setNodes([metadataNode]);
    }, []);

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={allNodeTypes}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                fitView
            />
        </div>
    );
};

export default ConfigurationFlow;
