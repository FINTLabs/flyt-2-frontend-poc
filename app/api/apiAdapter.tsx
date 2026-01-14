export type AdapterRequestOptions = {
    params?: Record<string, string | string[] | number | boolean | null | undefined>;
    headers?: Headers;
    timeout?: number;
};

export interface AdapterResponse<T> {
    data: T;
    status: number;
}

async function handleResponse<T>(response: Response): Promise<{ data: T; status: number }> {
    if (!response.ok) {
        console.error(response);
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const contentType = response.headers.get('content-type');
    const isJson = contentType && contentType.includes('application/json');
    let data: T;
    if (isJson) {
        data = (await response.json()) as T;
    } else {
        data = (await response.text()) as T;
    }
    return { data, status: response.status };
}

export async function getData<T>(
    request: Request,
    url: string,
    options?: AdapterRequestOptions
): Promise<AdapterResponse<T>> {
    try {
        const searchParams = new URLSearchParams();

        if (options?.params) {
            Object.entries(options.params).forEach(([key, value]) => {
                if (value != null) {
                    (Array.isArray(value) ? value : [value]).forEach((v) => {
                        searchParams.append(key, String(v));
                    });
                }
            });
        }

        const finalURL = searchParams.toString() ? `${url}?${searchParams.toString()}` : url;

        const controller = new AbortController();
        const signal = controller.signal;
        if (options?.timeout) {
            setTimeout(() => controller.abort(), options.timeout);
        }
        const headers = new Headers(request.headers);

        const response = await fetch(finalURL, {
            method: 'GET',
            headers,
            signal,
        });
        return handleResponse<T>(response);
    } catch (error) {
        console.error('error in apiAdapter get: ', error, url);
        throw error;
    }
}
