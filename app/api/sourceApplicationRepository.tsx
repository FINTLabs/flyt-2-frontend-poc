import { getData } from '~/api/apiAdapter';
import type { IInstanceMetadataContent, IIntegrationMetadata } from '~/types/data/integration';

export const getMetadataForSourceApplications = (
    request: Request,
    ids: string,
    onlyLastestVersion?: boolean
) => {
    return getData<Record<number, IIntegrationMetadata[]>>(request, '/api/intern/metadata', {
        params: { kildeapplikasjonIds: ids, bareSisteVersjoner: onlyLastestVersion },
    });
};

export const getInstanceElementMetadataById = (request: Request, metadataId: string) => {
    return getData<IInstanceMetadataContent>(
        request,
        `/api/intern/metadata/${metadataId}/instans-metadata`
    );
};
