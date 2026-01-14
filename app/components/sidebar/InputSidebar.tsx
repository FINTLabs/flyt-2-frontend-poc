import { useFlow } from '~/context/flowContext';
import { Heading, VStack } from '@navikt/ds-react';
import { eGrvSakMockData } from '~/demo/mockData/dataObjects';
import EgrvTestForm from '~/components/sidebar/testForms/EgrvTestForm';
import type { MockDataTypes } from '~/types/mockedDataTypes';

const InputSidebar = () => {
    const { runDataThroughFlow, inputNode } = useFlow();

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
