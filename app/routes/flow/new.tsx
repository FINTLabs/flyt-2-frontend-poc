import { useNavigate } from 'react-router';
import React, { useCallback, useState } from 'react';
import { useFlow } from '~/context/flowContext';
import { Button, Heading, HStack, Page, Select, TextField, VStack } from '@navikt/ds-react';
import { ArrowRightIcon } from '@navikt/aksel-icons';
import { allIntegrationsInputNodes, arkivInstanceOutput } from '~/mockData/nodes/instances';
import getInitialNodesOnCreateNew from '~/mockData/getInitialNodesOnCreateNew';
import type { CustomNodeDemo } from '~/types/nodeTypes';
import type { Edge } from '@xyflow/react';

const NewFlowPage = () => {
    const { saveNewFlow } = useFlow();
    let navigate = useNavigate();

    const [name, setName] = useState('');
    const [inputIntegration, setInputIntegration] = useState('');
    const [outputIntegration, setOutputIntegration] = useState('instanceOutputArkivsak');

    const handleSaveNewFlow = useCallback(() => {
        const initialFlow = getInitialNodesOnCreateNew(inputIntegration);
        console.log('handleSaveNewFlow', initialFlow);
        if (!initialFlow?.instanceNode) return;

        const nodes: CustomNodeDemo[] = [initialFlow.instanceNode, arkivInstanceOutput];

        if (initialFlow.metadataNode) {
            nodes.push(initialFlow.metadataNode);
        }

        const newFlowId = saveNewFlow(name, nodes, initialFlow.edge ? [initialFlow.edge] : []);
        navigate(`/flow/edit/${newFlowId}`);
    }, [name, inputIntegration, outputIntegration]);

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSaveNewFlow();
    };
    return (
        <Page.Block gutters>
            <VStack paddingBlock="8" gap="8">
                <Heading size="large" level="1">
                    Opprett ny flyt
                </Heading>
                <form method="dialog" id="skjema" onSubmit={onSubmit}>
                    <VStack gap={'4'} maxWidth={'600px'}>
                        <HStack gap={'4'} align={'end'} justify={'space-between'}>
                            <Select
                                id={'inputIntegration'}
                                label={'Integrasjon for innkomne data'}
                                size={'small'}
                                value={inputIntegration}
                                onChange={(e) => {
                                    setInputIntegration(e.target.value);
                                    if (name === '') {
                                        setName(
                                            `${e.target.selectedOptions[0].label} til Arkivsak`
                                        );
                                    }
                                }}
                            >
                                <option value="" disabled>
                                    -Velg integrasjon-
                                </option>
                                {allIntegrationsInputNodes.map((integration) => (
                                    <option key={integration.id} value={integration.id}>
                                        {integration.data.label}
                                    </option>
                                ))}
                            </Select>
                            <ArrowRightIcon fontSize="2rem" />
                            <Select
                                id={'outputIntegration'}
                                label={'Integrasjon for utgående data'}
                                size={'small'}
                                value={outputIntegration}
                                onChange={(e) => setOutputIntegration(e.target.value)}
                                readOnly={true}
                            >
                                <option value="arkivInstanceOutput">Arkivsak</option>
                            </Select>
                        </HStack>
                        <TextField
                            id={'name'}
                            type={'text'}
                            label="Visningsnavn"
                            size={'small'}
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                        <HStack gap={'4'} justify={'end'}>
                            <Button
                                type="button"
                                size={'small'}
                                variant="secondary"
                                onClick={() => navigate('/flow')}
                            >
                                Avbryt
                            </Button>
                            <Button
                                form="skjema"
                                size={'small'}
                                disabled={!name || !inputIntegration}
                            >
                                Opprett
                            </Button>
                        </HStack>
                    </VStack>
                </form>
            </VStack>
        </Page.Block>
    );
};

export default NewFlowPage;
