import { loginRequest } from '@/api';
import { AppBackButton, PaperCenter } from '@/components/ui';
import { AppStateContext } from '@/context/app-state.context';
import { useNotification } from '@/context/snackbar.context';
import SignInScreen from '@/screens/sign-in.screen';
import { securelyStoreData } from '@/utils/async-storage';
import { useRouter } from 'expo-router';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';

export interface LoginForm {
    email: string;
    password: string;
}

export default function SignIn() {
    const router = useRouter();
    const { setUserToken, setUserDetails } = useContext(AppStateContext);
    const { showNotification } = useNotification();
    const [loginState, setLoginState] = useState(false);

    const {
        control,
        handleSubmit,
        setFocus,
        formState: { errors, isValid },
    } = useForm<LoginForm>();

    const handleRedirectToHome = () => {
        router.push('/');
    };

    const onSubmit = (data: LoginForm) => {
        setLoginState(true);
        loginRequest(data)
            .then((res: any) => {
                securelyStoreData(
                    'X-AUTH-TOKEN',
                    JSON.stringify(res?.data.token)
                );
                setUserToken(JSON.stringify(res?.data.token));

                // getUserDetails(res?.data.token).then((response: any) => {
                //     const userData = response?.data as UserDetails;
                //     setUserDetails({
                //         name: userData?.name,
                //         email: userData?.email,
                //         phone_number: userData?.phone_number,
                //     });

                // show success snackbar
                showNotification({
                    onDismissSnackBar: () => {},
                    snackBarProperties: {
                        label: '',
                        onPress: () => {},
                    },
                    children: 'Successfully logged in!',
                });

                setLoginState(false);
                try {
                    return router.back();
                } catch {
                    return handleRedirectToHome();
                }
                // });
            })
            .catch(error => {
                setLoginState(false);

                // show error snackbar
                showNotification({
                    onDismissSnackBar: () => {},
                    snackBarProperties: {
                        label: 'Retry',
                        onPress: () => {},
                    },
                    children:
                        error?.message ??
                        'Something went wrong, please try again',
                });
            });
    };

    return (
        <PaperCenter>
            <AppBackButton goBack={() => router.back()}></AppBackButton>
            <SignInScreen
                control={control}
                errors={errors}
                setFocus={setFocus}
                loginState={loginState}
                isValid={isValid}
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
            />
        </PaperCenter>
    );
}
