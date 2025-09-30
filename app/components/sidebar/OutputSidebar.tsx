import { useFlow } from '~/context/flowContext';
import { useMemo } from 'react';
import { allIntegrationsInputNodes, arkivInstanceOutput } from '~/mockData/nodes';
import { Heading, VStack } from '@navikt/ds-react';
import type { Node } from '@xyflow/react';
import type { BaseNodeData, CustomNode } from '~/types/nodeTypes';

const OutputSidebar = () => {
    const { currentFlow } = useFlow();

    const outputNode = useMemo(() => {
        if (!currentFlow) return null;
        return currentFlow.nodes.find((flowNode: CustomNode) => flowNode.type === arkivInstanceOutput.type)
    }, [currentFlow]);

    console.log('Output Node:', outputNode);

    return (
        <aside>
            <VStack paddingInline={'4'}>
                <Heading size="xsmall" spacing>
                    {outputNode ? outputNode.data?.label : 'Ingen output node funnet'}
                </Heading>

            </VStack>
        </aside>
    );
};

export default OutputSidebar;
