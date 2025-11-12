import { Box, Button, Heading, HStack, VStack } from '@navikt/ds-react';
import type { RunlogType } from '~/types/generalTypes';
import { Background, BackgroundVariant, Controls, ReactFlow, useReactFlow } from '@xyflow/react';
import { nodeTypes } from '~/components/customNodes/nodetypes';
import React, { useEffect, useState } from 'react';
import { useFlow } from '~/context/flowContext';

const RunlogContent = ({ runData, open }: { runData: RunlogType; open: boolean }) => {
    const { initNodes, initEdges } = useFlow();

    const { fitView, viewportInitialized } = useReactFlow();

    useEffect(() => {
        fitView();
    }, [viewportInitialized, open]);

    return (
        <HStack>
            <Box height="500px" width={'1000px'} borderWidth={'1'} borderColor={'border-divider'}>
                <ReactFlow
                    nodes={initNodes}
                    edges={initEdges}
                    nodeTypes={nodeTypes}
                    nodesDraggable={false}
                    elementsSelectable={false}
                    nodesConnectable={false}
                    selectNodesOnDrag={false}
                    fitView
                    isValidConnection={() => false}
                    defaultEdgeOptions={{ type: 'step' }}
                >
                    <Background variant={BackgroundVariant.Dots} />
                    <Controls showInteractive={false} />
                </ReactFlow>
            </Box>
        </HStack>
    );
};

export default RunlogContent;
