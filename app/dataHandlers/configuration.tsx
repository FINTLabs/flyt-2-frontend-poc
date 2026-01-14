import { getUserSourceApplications } from '~/api/authorizationRepository';
import { getMetadataForSourceApplications } from '~/api/sourceApplicationRepository';
import type { IIntegration, IIntegrationMetadata } from '~/types/data/integration';
import { getConfigurationById } from '~/api/configurationRepository';
import { getIntegration } from '~/api/integrationRepository';
import type { IConfiguration } from '~/types/data/configuration';

const getMetadata = async (
    request: Request,
    sourceApplicationIds: string | undefined
): Promise<IIntegrationMetadata[] | undefined> => {
    if (sourceApplicationIds) {
        const metadataResponse = await getMetadataForSourceApplications(
            request,
            sourceApplicationIds,
            true
        );
        const metaDataBySourceApplication = metadataResponse.data;
        return Object.values(metaDataBySourceApplication).flat();
    }
};

const getConfigurationData = async (request: Request, configurationId: string) => {
    const configurationResponse = await getConfigurationById(request, configurationId);
    return configurationResponse.data;
};

const findIntegrationMetadata = (
    metaData: IIntegrationMetadata[] | undefined,
    sourceApplicationIntegrationId: string | undefined
): IIntegrationMetadata | undefined => {
    if (sourceApplicationIntegrationId && metaData) {
        return metaData?.find(
            (metaData) => metaData.sourceApplicationIntegrationId === sourceApplicationIntegrationId
        );
    }
};

const getAvailableVersions = (
    metaData: IIntegrationMetadata[] | undefined,
    sourceApplicationIntegrationId: string | undefined
) => {
    if (sourceApplicationIntegrationId && metaData) {
        return metaData
            ?.filter(
                (metaData) =>
                    metaData.sourceApplicationIntegrationId === sourceApplicationIntegrationId
            )
            .map((md) => md.version);
    }
};

type ConfigDataType = {
    configuration: IConfiguration;
    integration: IIntegration;
    integrationMetadata: IIntegrationMetadata | undefined;
    availableMetadataVersions: number[] | undefined;
};

export const getConfigurationDataById = async (
    request: Request,
    configurationId: string
): Promise<ConfigDataType> => {
    const configuration = await getConfigurationData(request, configurationId);

    let integration: IIntegration = {};
    if (configuration.integrationId) {
        const integrationResponse = await getIntegration(request, configuration.integrationId);
        integration = integrationResponse.data;
    }

    const metadata = await getMetadata(request, integration?.sourceApplicationId);

    const integrationMetaData = findIntegrationMetadata(
        metadata,
        integration.sourceApplicationIntegrationId
    );

    const availableVersions = getAvailableVersions(
        metadata,
        integration.sourceApplicationIntegrationId
    );

    return {
        configuration,
        integration,
        integrationMetadata: integrationMetaData,
        availableMetadataVersions: availableVersions,
    };
};
