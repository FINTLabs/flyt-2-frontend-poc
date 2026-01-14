import type { IConfiguration } from '~/types/data/configuration';
import { getData } from '~/api/apiAdapter';
const API_URL = import.meta.env.VITE_API_CONF || '';

export const getConfigurationById = (
    request: Request,
    configurationId: string,
    excludeElements?: boolean
) => {
    return getData<IConfiguration>(request, `/api/intern/konfigurasjoner/${configurationId}`, {
        params: { ekskluderMapping: excludeElements },
    });
};
// http://localhost:3000/api/intern/konfigurasjoner/18?ekskluderMapping=false
// http://localhost:5173/api/intern/konfigurasjoner/18
