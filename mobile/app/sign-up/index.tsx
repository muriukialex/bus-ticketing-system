import { loginRequest, signUpRequest } from '@/api';
import { PaperCenter } from '@/components/ui';
import { AppStateContext } from '@/context/app-state.context';
import { useNotification } from '@/context/snackbar.context';
import SignUpScreen from '@/screens/sign-up.screen';
import { securelyStoreData } from '@/utils/async-storage';
import { useRouter } from 'expo-router';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';

export interface SignUpForm {
    name: string;
    email: string;
    phone_number: string;
    password: string;
    password_confirm: string;
}

export default function SignUp() {
    const router = useRouter();
    const { setUserToken, setUserDetails } = useContext(AppStateContext);
    const { showNotification } = useNotification();
    const [signUpState, setSignUpState] = useState(false);

    const {
        control,
        handleSubmit,
        setFocus,
        formState: { errors, isValid },
    } = useForm<SignUpForm>();

    const handleSuccessfulSignUp = () => {
        router.push('/');
    };

    const onSubmit = (data: SignUpForm) => {
        setSignUpState(true);
        signUpRequest(data)
            .then(() => {
                const { email, password } = data;
                const loginData = { email, password };

                loginRequest(loginData)
                    .then(response => {
                        securelyStoreData(
                            'X-AUTH-TOKEN',
                            JSON.stringify(response?.data.token)
                        );
                        setUserToken(JSON.stringify(response?.data.token));

                        // getUserDetails(response?.data.token)
                        // 	.then(userResponse => {
                        // 		const userData = userResponse?.data as UserDetailsType
                        // 		setUserDetails({
                        // 			name: userData?.name,
                        // 			email: userData?.email,
                        // 			phone_number: userData?.phone_number,
                        // 		})

                        // show success snackbar
                        showNotification({
                            onDismissSnackBar: () => {},
                            snackBarProperties: {
                                label: '',
                                onPress: () => {},
                            },
                            children: 'Successfully logged in to Lomu Homes!',
                        });

                        setSignUpState(false);

                        return handleSuccessfulSignUp();
                    })
                    .catch(error => {
                        console.error(error);
                    })
                    // })
                    .catch(error => {
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
            })
            .catch(error => {
                setSignUpState(false);

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
            <SignUpScreen
                control={control}
                errors={errors}
                setFocus={setFocus}
                signUpState={signUpState}
                isValid={isValid}
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
            />
        </PaperCenter>
    );
}
