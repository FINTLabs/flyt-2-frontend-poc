import { Box, HStack } from '@navikt/ds-react';
import { Background, BackgroundVariant, Controls, ReactFlow, useReactFlow } from '@xyflow/react';
import { nodeTypes } from '~/components/customNodes/nodetypes';
import React, { useEffect } from 'react';
import { useFlow } from '~/context/flowContext';

const RunlogContent = ({ open }: { open: boolean }) => {
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
