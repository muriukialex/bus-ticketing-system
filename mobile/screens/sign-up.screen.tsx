import { AppButton, FormBuilder, Header, Logo } from '@/components/ui';
import { SignUpForm } from '@/interfaces/sign-up-form.interface';
import appNotifications from '@/utils/notification-messages';
import { Link } from 'expo-router';
import React from 'react';
import {
    Control,
    FieldErrors,
    UseFormHandleSubmit,
    UseFormSetFocus,
} from 'react-hook-form';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

interface SignUpScreenProps {
    control: Control<SignUpForm, any>;
    errors: FieldErrors<SignUpForm>;
    setFocus: UseFormSetFocus<SignUpForm>;
    signUpState: boolean;
    isValid: boolean;
    handleSubmit: UseFormHandleSubmit<SignUpForm, undefined>;
    onSubmit: (data: SignUpForm) => void;
}

export default function SignUpScreen({
    control,
    errors,
    setFocus,
    signUpState,
    handleSubmit,
    onSubmit,
}: SignUpScreenProps) {
    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.center}>
                <View style={styles.centerHeader}>
                    <Logo />
                    <Header>Sign Up</Header>
                </View>

                <FormBuilder
                    control={control}
                    setFocus={setFocus}
                    formConfigArray={[
                        {
                            name: 'name',
                            label: 'Full name',
                            returnKeyType: 'next',
                            autoCapitalize: 'none',
                            rules: {
                                required: {
                                    value: true,
                                    message: appNotifications.signUp.name,
                                },
                            },
                        },
                        {
                            type: 'email',
                            name: 'email',
                            label: 'Email',
                            returnKeyType: 'next',
                            textContentType: 'emailAddress',
                            autoCapitalize: 'none',
                            rules: {
                                required: {
                                    value: true,
                                    message: appNotifications.signUp.email,
                                },
                            },
                        },
                        {
                            name: 'phone_number',
                            label: 'Phone number',
                            returnKeyType: 'next',
                            autoCapitalize: 'none',
                            textContentType: 'telephoneNumber',
                            keyboardType: 'phone-pad',
                            rules: {
                                required: {
                                    value: true,
                                    message:
                                        appNotifications.signUp.phone_number,
                                },
                            },
                        },
                        {
                            type: 'password',
                            name: 'password',
                            label: 'Password',
                            returnKeyType: 'done',
                            rules: {
                                required: {
                                    value: true,
                                    message: appNotifications.signIn.password,
                                },
                            },
                        },
                        {
                            type: 'password',
                            name: 'password_confirm',
                            label: 'Confirm password',
                            returnKeyType: 'done',
                            rules: {
                                required: {
                                    value: true,
                                    message:
                                        appNotifications.signUp
                                            .password_confirm,
                                },
                            },
                        },
                    ]}
                />

                <AppButton
                    loading={signUpState}
                    mode="contained"
                    onPress={handleSubmit(onSubmit)}>
                    {signUpState ? 'Please wait...' : 'Sign Up'}
                </AppButton>

                <View style={styles.row}>
                    <View>
                        <Text style={styles.forgot}>
                            Already have an account yet?{' '}
                        </Text>
                    </View>
                    <Link relativeToDirectory href="/sign-in">
                        <Text style={styles.link}>Login</Text>
                    </Link>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollView: {},
    center: {
        display: 'flex',
        justifyContent: 'center',
        flex: 1,
    },
    centerHeader: {
        display: 'flex',
        alignItems: 'center',
    },
    forgotPassword: {
        width: '100%',
        alignItems: 'flex-end',
        marginBottom: 10,
    },
    row: {
        flexDirection: 'row',
        marginTop: 16,
    },
    forgot: {},
    dontHaveAccountText: {},
    link: {
        textDecorationLine: 'underline',
        fontWeight: 'bold',
    },
});
