import axios from 'axios';
export const BASE_URL = `http://localhost:3000/`;

const request = async function (req: any) {
    try {
        // const token = Cookies.get('X-AUTH-TOKEN');
        // if (token) {
        //     req.headers = {
        //         ...req.headers,
        //         Authorization: `Bearer ${token}`,
        //     };
        // }
        const response = await axios(req);
        return response;
    } catch (e: any) {
        if (e.response) {
            const {
                status,
                data: { error_message, ...rest },
            } = e.response;
            const err = {
                status,
                errorMessage:
                    error_message ||
                    'Failed to perform request, please try again.',
                ...rest,
            };
            throw err;
        } else {
            const errObject = e.toJSON();
            const err = {
                status: errObject.code,
                errorMessage: errObject.message,
                isNetworkError: true,
            };
            throw err;
        }
    }
};

const DEFAULT_HEADERS = {
    'Content-type': 'application/json',
};

type RequestParameters = {
    params?: {};
    url: string;
    headers?: {};
    data?: {};
};

class Request {
    static get({
        params = {},
        url,
        headers = DEFAULT_HEADERS,
    }: RequestParameters): Promise<any> {
        return request({
            method: 'GET',
            url: BASE_URL + url,
            params,
            headers: Object.assign(DEFAULT_HEADERS, headers),
        });
    }

    static post({
        data = {},
        params = {},
        headers = DEFAULT_HEADERS,
        url,
    }: RequestParameters): Promise<any> {
        return request({
            method: 'POST',
            url: BASE_URL + url,
            data,
            params,
            headers: Object.assign(DEFAULT_HEADERS, headers),
        });
    }

    static put({
        data = {},
        params = {},
        url,
        headers = DEFAULT_HEADERS,
    }: RequestParameters): Promise<any> {
        return request({
            method: 'PUT',
            url: BASE_URL + url,
            data,
            params,
            headers,
        });
    }

    static delete({
        params = {},
        data = {},
        url,
        headers = DEFAULT_HEADERS,
    }: RequestParameters): Promise<any> {
        return request({
            method: 'DELETE',
            url: BASE_URL + url,
            data,
            params,
            headers,
        });
    }
}

export default Request;
