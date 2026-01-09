import { getData } from '~/api/apiAdapter';
import type { IUser } from '~/types/data/user';
const API_URL = import.meta.env.VITE_API_CONF || '';

const getAuthorized = (request: Request) => {
    return getData(request, '/api/intern/authorization/me/is-authorized', {
        headers: new Headers({ 'Content-Type': ' text/plain' }),
    });
};

const getUser = (request: Request) => {
    return getData<{ userPermissionPage: boolean }>(
        request,
        '/api/intern/authorization/me/restricted-page-authorization'
    );
};

export const getUserSourceApplications = (request: Request) => {
    return getData<IUser>(request, '/api/intern/authorization/me');
};
