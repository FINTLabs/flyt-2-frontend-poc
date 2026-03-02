import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import {
    ReactFlow,
    type NodeChange,
    useReactFlow,
    useEdgesState,
    useNodesState,
    type Edge,
    type Node,
    Background,
    Panel,
    type OnNodesChange,
    Controls,
    MiniMap,
} from '@xyflow/react';
import type { IInstanceMetadataContent } from '~/types/data/integration';
import useLayoutNodes from '~/context/useLayoutNodes';
import { initEdges, initNodes } from '~/dataHandlers/dataMapper/metadataMapper';
import { allNodeTypes, type CustomNode } from '~/types/flow/nodes';
import type { IConfiguration } from '~/types/data/configuration';
import { Button } from '@navikt/ds-react';
import { createIncomingDataNodes } from '~/dataHandlers/dataMapper/incomingDataMapper';
import { createOutgoingDataNodes } from '~/dataHandlers/dataMapper/outgoingDataMapper';

type ConfigurationFlowProps = {
    dataName: string;
    metadataContent?: IInstanceMetadataContent;
    configuration: IConfiguration;
};

// http://localhost:3000/integration/configuration/edit/18
const ConfigurationFlow = ({
    dataName,
    metadataContent,
    configuration,
}: ConfigurationFlowProps) => {
    const [nodes, setNodes, onNodesChange] = useNodesState<CustomNode>(initNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initEdges);

    const { resetLayout } = useLayoutNodes();

    const handleNodeChange: OnNodesChange<CustomNode> = (changes: NodeChange<CustomNode>[]) => {
        onNodesChange(changes);
    };

    const onRedoLayout = useCallback(() => {
        resetLayout();
    }, [nodes, edges]);

    useEffect(() => {
        const incomingFlowElements = createIncomingDataNodes(
            dataName,
            metadataContent,
            configuration
        );
        const outgoingFlowElements = createOutgoingDataNodes(
            dataName,
            metadataContent,
            configuration
        );

        setNodes([...incomingFlowElements.nodes, ...outgoingFlowElements.nodes]);
        setEdges([...incomingFlowElements.edges, ...outgoingFlowElements.edges]);
    }, []);

    return (
        <div style={{ width: '100vw', height: '75vh' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={allNodeTypes}
                onNodesChange={handleNodeChange}
                onEdgesChange={onEdgesChange}
                fitView
            >
                <MiniMap />
                <Panel position="top-right">
                    <Button size={'small'} onClick={() => onRedoLayout()}>
                        Tilbakestill plassering
                    </Button>
                </Panel>
                <Background />
                <Controls />
            </ReactFlow>
        </div>
    );
};

export default ConfigurationFlow;
