import React, { useState } from 'react';
import { BodyShort, Button, Heading, HStack, Page, VStack } from '@navikt/ds-react';
import type { Route } from './+types/edit';
import { FormProvider, useForm } from 'react-hook-form';
import type { IConfiguration } from '~/types/data/configuration';
import ControlledTextAreaInput from '~/components/formelements/ControlledTextAreaInput';
import ControlledCheckbox from '~/components/formelements/ControlledCheckbox';
import ConfigurationFlow from '~/components/editConfiguration/ConfigurationFlow';
import { getConfigurationDataById } from '~/dataHandlers/configuration';
import { ReactFlowProvider } from '@xyflow/react';

export async function clientLoader({ params, request }: Route.ClientLoaderArgs) {
    console.log('params', params);
    if (!params.id) {
        return {};
    }

    const data = await getConfigurationDataById(request, params.id);

    return {
        configId: params.id,
        configuration: data.configuration,
        integration: data.integration,
        integrationMetadata: data.integrationMetadata,
        availableMetadataVersions: data.availableMetadataVersions,
    };
}

export default function EditConfiguration({ loaderData }: Route.ComponentProps) {
    const { configuration, integration, integrationMetadata } = loaderData;

    const [version, setVersion] = useState<number | undefined>(
        integrationMetadata?.version ?? undefined
    );

    if (!integration || !integrationMetadata) {
        return (
            <Page.Block gutters>
                <VStack paddingBlock="8" gap="4">
                    <Heading size="large" level="1">
                        Fant ikke integrasjonen
                    </Heading>
                    <HStack justify="space-between" style={{ width: '100%' }}>
                        <BodyShort>Gå tilbake og prøv på nytt </BodyShort>
                    </HStack>
                </VStack>
            </Page.Block>
        );
    }

    const methods = useForm<IConfiguration>({
        mode: 'onChange',
        defaultValues: {
            integrationId: Number(integration?.id),
            integrationMetadataId: Number(integrationMetadata?.id),
            completed: configuration ? configuration.completed : false,
            comment: configuration?.comment,
        },
    });

    // TODO: make comment be a modal when user click save

    return (
        <ReactFlowProvider>
            <FormProvider {...methods}>
                <Page.Block gutters>
                    <VStack paddingBlock="8">
                        <HStack justify="space-between" style={{ width: '100%' }}>
                            <VStack>
                                <Heading size="small" level="1" spacing>
                                    Konfigurasjon {integration.sourceApplicationIntegrationId} -{' '}
                                    {integrationMetadata.integrationDisplayName}
                                </Heading>
                                <BodyShort>
                                    Siden er under konstruksjon. Det er foreløpig begrenset med
                                    handlinger.
                                </BodyShort>
                            </VStack>
                            <VStack gap={'3'} paddingBlock={'0 4'}>
                                <HStack gap={'6'} align={'center'}>
                                    <ControlledTextAreaInput
                                        name={'comment'}
                                        displayName={'Kommentar'}
                                        disabled={configuration?.completed}
                                    />
                                    <ControlledCheckbox
                                        name={'completed'}
                                        displayName={'Ferdigstilt'}
                                        disabled={configuration?.completed}
                                    />
                                    <ControlledCheckbox
                                        name={'form-active'}
                                        displayName={'Aktiv'}
                                        disabled={
                                            configuration?.completed || !methods.watch('completed')
                                        }
                                    />
                                </HStack>
                            </VStack>
                            <HStack align={'start'} gap={'6'}>
                                <Button
                                    id="form-submit-btn"
                                    size={'small'}
                                    disabled={configuration?.completed}
                                    type="submit"
                                >
                                    {!methods.watch('completed') ? 'Lagre' : 'Fullfør'}
                                </Button>

                                <Button
                                    variant={'secondary'}
                                    type="button"
                                    id="form-cancel-btn"
                                    size={'small'}
                                    onClick={() => {
                                        // history('/');
                                    }}
                                >
                                    Avbryt
                                </Button>
                            </HStack>
                        </HStack>
                        <HStack justify={'end'}>
                            <BodyShort>Version: {version}</BodyShort>
                        </HStack>
                        <HStack gap={'8'} wrap={false}>
                            <ConfigurationFlow
                                metadataContent={integrationMetadata.instanceMetadata}
                            />
                        </HStack>
                    </VStack>
                </Page.Block>
            </FormProvider>
        </ReactFlowProvider>
    );
}
