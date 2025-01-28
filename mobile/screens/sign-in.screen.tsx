import { AppButton, FormBuilder, Header, Logo } from '@/components/ui';
import { SignInForm } from '@/interfaces/sign-in-form.interface';
import appNotifications from '@/utils/notification-messages';
import { Link } from 'expo-router';
import React from 'react';
import {
    Control,
    FieldErrors,
    UseFormHandleSubmit,
    UseFormSetFocus,
} from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

interface SignInScreenProps {
    control: Control<SignInForm, any>;
    errors: FieldErrors<SignInForm>;
    loginState: boolean;
    setFocus: UseFormSetFocus<SignInForm>;
    isValid: boolean;
    handleSubmit: UseFormHandleSubmit<SignInForm, undefined>;
    onSubmit: (data: SignInForm) => void;
}

export default function SignInScreen({
    control,
    errors,
    loginState,
    setFocus,
    handleSubmit,
    onSubmit,
}: SignInScreenProps) {
    return (
        <View style={styles.center}>
            <View style={styles.centerHeader}>
                <Logo />
                <Header>Sign In</Header>
            </View>

            <FormBuilder
                control={control}
                setFocus={setFocus}
                formConfigArray={[
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
                                message: appNotifications.signIn.email,
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
                ]}
            />

            <AppButton
                loading={loginState}
                mode="contained"
                onPress={handleSubmit(onSubmit)}>
                {loginState ? 'Please wait...' : 'Login'}
            </AppButton>

            <View style={styles.row}>
                <View>
                    <Text style={styles.forgot}>
                        You do not have an account yet?{' '}
                    </Text>
                </View>
                <Link relativeToDirectory href="/sign-up">
                    <Text style={styles.link}>Create one</Text>
                </Link>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
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
