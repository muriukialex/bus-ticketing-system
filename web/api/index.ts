import { PaginationParamTypes } from '@/interfaces/pagination-params.interface';
import { Result } from '@/interfaces/result.interface';
import { Route } from '@/interfaces/route.interface';
import { SignInForm } from '@/interfaces/sign-in-form.interface';
import { SignUpForm } from '@/interfaces/sign-up-form.interface';
import { UserDetails } from '@/interfaces/user-details.interface';
import Cookies from 'js-cookie';
import Request from './Request';

export const loginRequest = (data: SignInForm) => {
    return Request.post<{
        accessToken: string;
    }>({
        url: `/auth/sign-in`,
        data: data,
    });
};

export const signUpRequest = (data: SignUpForm) => {
    return Request.post({
        url: `/auth/sign-up`,
        data: data,
    });
};

export const getUserDetails = (id: string): Promise<{ data: UserDetails }> => {
    return Request.get({
        url: `/user/${id}`,
        headers: {
            'X-AUTH-TOKEN': Cookies.get('X-AUTH-TOKEN'),
        },
    });
};

export const getRoutes = ({
    url,
    params,
}: {
    url: string;
    params: PaginationParamTypes;
}): Promise<{ data: Result<Route> }> => {
    return Request.get({
        url,
        params,
        headers: {
            'X-AUTH-TOKEN': Cookies.get('X-AUTH-TOKEN'),
        },
    });
};
