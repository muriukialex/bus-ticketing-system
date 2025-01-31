import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import axios from 'axios';
import Cookies from 'js-cookie';
export const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL

const request = async function <T>(
    req: AxiosRequestConfig
): Promise<AxiosResponse<T>> {
    try {
        const response = await axios(req);
        return response;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

type RequestParameters = {
    params?: object;
    url: string;
    headers?: object;
    data?: object;
};

class Request {
    static async get<T>({
        params = {},
        url,
    }: // headers,
    RequestParameters): Promise<AxiosResponse<T>> {
        return request({
            method: 'GET',
            url: BASE_URL + url,
            params,
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${Cookies.get('X-AUTH-TOKEN')}`,
            },
        });
    }

    static async post<T>({
        data = {},
        params = {},
        url,
    }: RequestParameters): Promise<AxiosResponse<T>> {
        return request({
            method: 'POST',
            url: BASE_URL + url,
            data,
            params,
            headers: {
                Authorization: `Bearer ${Cookies.get('X-AUTH-TOKEN')}`,
                'Content-type': 'application/json',
            },
        });
    }

    static async put<T>({
        data = {},
        params = {},
        url,
    }: RequestParameters): Promise<AxiosResponse<T>> {
        return request({
            method: 'PUT',
            url: BASE_URL + url,
            data,
            params,
            headers: {
                Authorization: `Bearer ${Cookies.get('X-AUTH-TOKEN')}`,
                'Content-type': 'application/json',
            },
        });
    }

    static async delete<T>({
        params = {},
        data = {},
        url,
    }: RequestParameters): Promise<AxiosResponse<T>> {
        return request({
            method: 'DELETE',
            url: BASE_URL + url,
            data,
            params,
            headers: {
                Authorization: `Bearer ${Cookies.get('X-AUTH-TOKEN')}`,
                'Content-type': 'application/json',
            },
        });
    }
}

export default Request;
