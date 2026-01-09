import React from 'react';
import {
    BodyShort,
    Button,
    Checkbox,
    CheckboxGroup,
    Heading,
    HStack,
    Page,
    VStack,
} from '@navikt/ds-react';
import type { Route } from './+types/edit';
import { getConfigurationById } from '~/api/configurationRepository';
import { getIntegration } from '~/api/integrationRepository';
import { getUserSourceApplications } from '~/api/authorizationRepository';
import { getMetadataForSourceApplications } from '~/api/sourceApplicationRepository';
import type { IIntegration } from '~/types/data/integration';
import { FormProvider, useForm } from 'react-hook-form';
import type { IConfiguration } from '~/types/data/configuration';
import ControlledTextAreaInput from '~/components/formelements/ControlledTextAreaInput';
import ControlledCheckbox from '~/components/formelements/ControlledCheckbox';

export async function clientLoader({ params, request }: Route.ClientLoaderArgs) {
    console.log('params', params);
    if (!params.id) {
        return {};
    }

    const sourceApplicationResponse = await getUserSourceApplications(request);
    const sourceApplicationIds = sourceApplicationResponse.data.sourceApplicationIds
        .map(String)
        .join(',');

    const metadataResponse = await getMetadataForSourceApplications(
        request,
        sourceApplicationIds,
        true
    );

    const metaDataBySourceApplication = metadataResponse.data;
    const flattenedListOfMetadata = Object.values(metaDataBySourceApplication).flat();

    const configurationResponse = await getConfigurationById(request, params.id);
    console.log('response', configurationResponse.data);

    let integration: IIntegration = {};

    if (configurationResponse.data.integrationId) {
        const integrationResponse = await getIntegration(
            request,
            configurationResponse.data.integrationId
        );
        integration = integrationResponse.data;
    }

    const integrationMetaData = flattenedListOfMetadata?.find(
        (metaData) =>
            metaData.sourceApplicationIntegrationId === integration.sourceApplicationIntegrationId
    );

    return {
        configId: params.id,
        configuration: configurationResponse.data,
        integration: integration,
        integrationMetadata: integrationMetaData,
    };
}

export default function EditConfiguration({ loaderData }: Route.ComponentProps) {
    const { configId, configuration, integration, integrationMetadata } = loaderData;
    console.log('configId', configId);

    console.log('configuration', configuration);
    console.log('integration', integration);

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

    return (
        <Page.Block gutters>
            <VStack paddingBlock="8" gap="4">
                <Heading size="small" level="1">
                    Konfigurasjon {integration.sourceApplicationIntegrationId} -{' '}
                    {integrationMetadata.integrationDisplayName}
                </Heading>
                <HStack justify="space-between" style={{ width: '100%' }}>
                    <BodyShort>
                        Siden er under konstruksjon. Det er foreløpig begrenset med handlinger.
                    </BodyShort>
                </HStack>
                <FormProvider {...methods}>
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
                            {/*                 {methods.watch('completed') && (
                                <CheckboxGroup
                                    legend="form-active"
                                    hideLegend
                                    disabled={completed}
                                    value={[active && 'form-active']}
                                    onChange={(val: string[]) => {
                                        setActive(val.includes('form-active'));
                                    }}
                                >
                                    <Checkbox
                                        id="form-active"
                                        value="form-active"
                                        size={'small'}
                                        aria-label="active-checkbox"
                                    >
                                        {t('label.activeLabel')}
                                    </Checkbox>
                                </CheckboxGroup>
                            )}*/}
                        </HStack>
                        <HStack align={'center'} gap={'6'}>
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
                        <HStack gap={'8'} wrap={false}></HStack>
                    </VStack>
                </FormProvider>
            </VStack>
        </Page.Block>
    );
}
