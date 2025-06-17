const ApiAdapter = (baseURL = '', request: Request) => {
    /*    const client = axios.create({
            baseURL: baseURL
        });*/

    const handleResponse = async (response: Response) => {
        if (response.ok) return response.json();
        // TODO: handle response errors
        throw new Error('An error occurred while processing the request.');
    };

    return {
        get: async (url: string) => {
            const response = await fetch(url, { headers: request.headers });
            return handleResponse(response);
        },

        post: async (url: string, data: object) => {
            const response = await fetch(url, {
                headers: {
                    Authorization: request.headers.get('Authorization') ?? '',
                    'content-type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify(data ?? {}),
            });
            return handleResponse(response);
        },

        put: async (url: string, data: object) => {
            const response = await fetch(url, {
                headers: {
                    Authorization: request.headers.get('Authorization') ?? '',
                    'content-type': 'application/json',
                },
                method: 'PUT',
                body: JSON.stringify(data ?? {}),
            });
            return handleResponse(response);
        },

        delete: async (url: string) => {
            const response = await fetch(url, {
                headers: {
                    Authorization: request.headers.get('Authorization') ?? '',
                    'content-type': 'application/json',
                },
                method: 'DELETE',
            });
            return handleResponse(response);
        },
    };
};

export default ApiAdapter;
