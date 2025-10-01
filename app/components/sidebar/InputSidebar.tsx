import { useFlow } from '~/context/flowContext';
import { allIntegrationsInputNodes } from '~/mockData/nodes';
import { useMemo } from 'react';
import { Button, Heading, HStack, VStack } from '@navikt/ds-react';
import { eGrvSakMockData } from '~/mockData/dataObjects';
import TestForm from '~/components/sidebar/testForms/TestForm';
import EgrvTestForm from '~/components/sidebar/testForms/EgrvTestForm';
import type { MockDataTypes } from '~/types/mockedDataTypes';

const InputSidebar = () => {
    const { currentFlow, runDataThroughFlow } = useFlow();

    const inputNode = useMemo(() => {
        if (!currentFlow) return null;
        return allIntegrationsInputNodes.find((node) =>
            currentFlow.nodes.some((flowNode) => flowNode.type === node.type)
        );
    }, [currentFlow]);

    /*    const dataContent = useMemo(() => {
        if (!inputNode || !inputNode.data.typeName) return;
        return mockDataContent(inputNode.data.typeName);
    }, [inputNode]);*/

    const handleRun = (data: MockDataTypes) => {
        runDataThroughFlow('egrv sak', data);
    };

    return (
        <aside className={'sidebar-form input'} style={{ overflowY: 'auto', height: '100%' }}>
            <VStack padding={'4'}>
                <Heading size="medium" spacing>
                    {inputNode ? inputNode.data.label : 'Ingen input node funnet'}
                </Heading>
                <form id={'testForm'} onSubmit={(e) => e.preventDefault()}>
                    {/*
                    <TestForm dataContent={dataContent} />
                     */}
                    {inputNode?.data.typeName === 'eGrv Sak' && (
                        <EgrvTestForm dataContent={eGrvSakMockData} onRunFlow={handleRun} />
                    )}
                </form>
            </VStack>
        </aside>
    );
};

export default InputSidebar;
