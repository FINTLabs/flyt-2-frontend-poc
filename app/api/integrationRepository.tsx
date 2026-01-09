import { getData } from '~/api/apiAdapter';
import type { IIntegration } from '~/types/data/integration';

export const getIntegration = (request: Request, integrationId: number) => {
    return getData<IIntegration>(request, `/api/intern/integrasjoner/${integrationId}`);
};
