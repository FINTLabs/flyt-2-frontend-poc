import { useFlow } from '~/context/flowContext';
import { useRef } from 'react';
import { BodyShort, Button, FormSummary, HStack, Label, Modal, VStack } from '@navikt/ds-react';
import type { ArkivSakType } from '~/types/mockedDataTypes';

const OutputSidebar = () => {
    const { currentFlow, testFlowOutput, outputNode } = useFlow();

    return (
        <aside className={'sidebar-form output'}>
            <VStack padding={'4'}>
                <FormSummary>
                    <FormSummary.Header>
                        <FormSummary.Heading level="2">
                            {outputNode ? outputNode.data?.label : 'Ingen output funnet'}
                        </FormSummary.Heading>
                        <ViewJSONDataModal data={testFlowOutput?.data} />
                    </FormSummary.Header>

                    <FormSummary.Answers>
                        {testFlowOutput ? (
                            <>
                                <FormSummary.Answer>
                                    <FormSummary.Label>Tittel</FormSummary.Label>
                                    <FormSummary.Value>
                                        {testFlowOutput.data.tittel}
                                    </FormSummary.Value>
                                </FormSummary.Answer>

                                <FormSummary.Answer>
                                    <FormSummary.Label>Offentlig tittel</FormSummary.Label>
                                    <FormSummary.Value>
                                        {testFlowOutput.data.offentligTittel}
                                    </FormSummary.Value>
                                </FormSummary.Answer>

                                <FormSummary.Answer>
                                    <FormSummary.Label>Saksmappetype</FormSummary.Label>
                                    <FormSummary.Value>
                                        {testFlowOutput.data.saksmappetype}
                                    </FormSummary.Value>
                                </FormSummary.Answer>
                                <FormSummary.Answer>
                                    <FormSummary.Label>Administrativ enhet</FormSummary.Label>
                                    <FormSummary.Value>
                                        {testFlowOutput.data.administrativEnhet}
                                    </FormSummary.Value>
                                </FormSummary.Answer>
                                <FormSummary.Answer>
                                    <FormSummary.Label>Saksansvarlig</FormSummary.Label>
                                    <FormSummary.Value>
                                        {testFlowOutput.data.saksansvarlig}
                                    </FormSummary.Value>
                                </FormSummary.Answer>

                                <FormSummary.Answer>
                                    <FormSummary.Label>Arkivdel</FormSummary.Label>
                                    <FormSummary.Value>
                                        {testFlowOutput.data.arkivdel}
                                    </FormSummary.Value>
                                </FormSummary.Answer>

                                <FormSummary.Answer>
                                    <FormSummary.Label>Saksstatus</FormSummary.Label>
                                    <FormSummary.Value>
                                        {testFlowOutput.data.saksstatus}
                                    </FormSummary.Value>
                                </FormSummary.Answer>
                                <FormSummary.Answer>
                                    <FormSummary.Label>Skjerming</FormSummary.Label>
                                    <FormSummary.Value>{''}</FormSummary.Value>
                                </FormSummary.Answer>
                            </>
                        ) : (
                            <BodyShort>Ingen testdata kjørt gjennom flyten enda.</BodyShort>
                        )}
                    </FormSummary.Answers>
                </FormSummary>
            </VStack>
        </aside>
    );
};

export default OutputSidebar;

const DisplayData = ({ label, data }: { label: string; data?: string | object }) => {
    return (
        <HStack gap={'2'} maxWidth={'100%'}>
            <Label size={'small'}>{label}:</Label>
            <BodyShort style={{ maxWidth: '100%', overflowWrap: 'break-word' }} size={'small'}>
                {data ? data.toString() : '-'}
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
