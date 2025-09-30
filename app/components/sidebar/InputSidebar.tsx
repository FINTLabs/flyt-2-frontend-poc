import { useFlow } from '~/context/flowContext';
import { allIntegrationsInputNodes } from '~/mockData/nodes';
import { useMemo } from 'react';
import { Heading, VStack } from '@navikt/ds-react';
import { eGrvSakMockData, mockDataContent } from '~/mockData/dataObjects';
import TestForm from '~/components/sidebar/testForms/TestForm';
import EgrvTestForm from '~/components/sidebar/testForms/EgrvTestForm';

const InputSidebar = () => {
    const { currentFlow } = useFlow();

    console.log('Current Flow:', currentFlow);

    const inputNode = useMemo(() => {
        if (!currentFlow) return null;
        return allIntegrationsInputNodes.find((node) =>
            currentFlow.nodes.some((flowNode) => flowNode.type === node.type)
        );
    }, [currentFlow]);

    const dataContent = useMemo(() => {
        if (!inputNode || !inputNode.data.typeName) return;
        return mockDataContent(inputNode.data.typeName);
    }, [inputNode]);
    console.log('Input Node:', inputNode);

    return (
        <aside className={'sidebar_form'} style={{ overflowY: 'auto', height: '100%' }}>
            <VStack paddingInline={'4'}>
                <Heading size="xsmall" spacing>
                    {inputNode ? inputNode.data.label : 'Ingen input node funnet'}
                </Heading>
                <form id={'testForm'}>
                    {/*
                    onSubmit={onSubmit}
                    <TestForm dataContent={dataContent} />
                     */}
                    {inputNode?.data.typeName === 'eGrv Sak' && (
                        <EgrvTestForm dataContent={eGrvSakMockData} />
                    )}
                </form>
            </VStack>
        </aside>
    );
};

export default InputSidebar;
