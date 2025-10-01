import { useFlow } from '~/context/flowContext';
import { useMemo, useRef } from 'react';
import { allIntegrationsInputNodes, arkivInstanceOutput } from '~/mockData/nodes';
import {
    BodyLong,
    BodyShort,
    Box,
    Button,
    Heading,
    HStack,
    Label,
    Modal,
    VStack,
} from '@navikt/ds-react';
import type { Node } from '@xyflow/react';
import type { BaseNodeData, CustomNode } from '~/types/nodeTypes';
import type { ArkivSakType } from '~/types/mockedDataTypes';

const OutputSidebar = () => {
    const { currentFlow, testFlowOutput } = useFlow();

    const outputNode = useMemo(() => {
        if (!currentFlow) return null;
        return currentFlow.nodes.find(
            (flowNode: CustomNode) => flowNode.type === arkivInstanceOutput.type
        );
    }, [currentFlow]);

    return (
        <aside className={'sidebar-form output'}>
            <VStack padding={'4'}>
                <Heading size="medium" spacing>
                    {outputNode ? outputNode.data?.label : 'Ingen output node funnet'}
                </Heading>
                <ViewJSONDataModal data={testFlowOutput?.data} />
                <VStack>
                    {testFlowOutput ? (
                        <VStack gap={'4'}>
                            <DisplayData label={'Tittel'} data={testFlowOutput.data.tittel} />
                            <DisplayData
                                label={'Offentlig tittel'}
                                data={testFlowOutput.data.offentligTittel}
                            />
                            <DisplayData
                                label={'Saksmappetype'}
                                data={testFlowOutput.data.saksmappetype}
                            />
                            <DisplayData
                                label={'Administrativ enhet'}
                                data={testFlowOutput.data.administrativEnhet}
                            />
                            <DisplayData
                                label={'Saksansvarlig'}
                                data={testFlowOutput.data.saksansvarlig}
                            />
                            <DisplayData label={'Arkivdel'} data={testFlowOutput.data.arkivdel} />
                            <DisplayData
                                label={'Saksstatus'}
                                data={testFlowOutput.data.saksstatus}
                            />
                        </VStack>
                    ) : (
                        <p>Ingen testdata kjørt gjennom flyten enda.</p>
                    )}
                </VStack>
            </VStack>
        </aside>
    );
};

export default OutputSidebar;

const DisplayData = ({ label, data }: { label: string; data?: string }) => {
    return (
        <HStack gap={'2'} maxWidth={'100%'}>
            <Label size={'small'}>{label}:</Label>
            <BodyShort style={{ maxWidth: '100%', overflowWrap: 'break-word' }} size={'small'}>
                {data ? data : '-'}
            </BodyShort>
        </HStack>
    );
};

const ViewJSONDataModal = ({ data }: { data?: ArkivSakType }) => {
    const ref = useRef<HTMLDialogElement>(null);

    return (
        <VStack align={'end'}>
            {data && (
                <Button
                    variant={'tertiary'}
                    size={'small'}
                    onClick={() => ref.current?.showModal()}>
                    Se JSON
                </Button>
            )}

            <Modal
                ref={ref}
                header={{ heading: 'Arkivsak JSON', size: 'medium' }}
                style={{ maxWidth: '100%', overflowWrap: 'break-word' }}>
                <Modal.Body>
                    <code>
                        <pre>{JSON.stringify(data, null, 2)}</pre>
                    </code>
                </Modal.Body>
            </Modal>
        </VStack>
    );
};
