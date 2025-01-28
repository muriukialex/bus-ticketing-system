import { SignInForm } from '@/interfaces/sign-in-form.interface';
import { SignUpForm } from '@/interfaces/sign-up-form.interface';
import { UserDetails } from '@/interfaces/user-details.interface';
import formatToken from '@/utils/format-token';
import Request from './Request';

export const loginRequest = (data: SignInForm) => {
    return Request.post({
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

export const getUserDetails = (
    token: string,
    id: string
): Promise<{ data: UserDetails }> => {
    return Request.get({
        url: `/users/${id}`,
        headers: {
            'X-AUTH-TOKEN': formatToken(token),
        },
    });
};
