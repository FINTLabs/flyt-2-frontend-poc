import { getData } from '~/api/apiAdapter';
import type { IIntegrationMetadata } from '~/types/data/integration';

export const getMetadataForSourceApplications = (
    request: Request,
    ids: string,
    onlyLastestVersion?: boolean
) => {
    return getData<Record<number, IIntegrationMetadata[]>>(request, '/api/intern/metadata', {
        params: { kildeapplikasjonIds: ids, bareSisteVersjoner: onlyLastestVersion },
    });
};
