'use client';
import { loginRequest } from '@/api';
import { Button, Input } from '@/components';
import { ErrorResponse } from '@/interfaces/error-response.interface';
import { SignInForm } from '@/interfaces/sign-in-form.interface';
import links from '@/utils/links';
import Cookies from 'js-cookie';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export default function SignIn() {
    const { push } = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignInForm>();
    const [loading, setLoading] = React.useState(false);

    const onSubmit = async (data: SignInForm) => {
        setLoading(true);

        try {
            const response = await loginRequest(data);
            const accessToken = response.data.accessToken;

            Cookies.set('X-AUTH-TOKEN', accessToken, {
                expires: 7,
            });
            setLoading(false);
            toast.success('Login was successfull! Continue with booking');

            push(links.home);
        } catch (error) {
            const errorResponse = error as ErrorResponse;
            if (errorResponse.message) {
                toast.error(errorResponse.message);
            }

            setLoading(false);
        }
    };
    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <div>
                        <Image
                            alt="Bus ticket"
                            height="180"
                            src="/images/bus-ticket-logo.png"
                            width="180"
                        />
                    </div>
                    <h2 className="mt-2 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                        Sign In
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4">
                        <Input
                            id="email"
                            name="email"
                            label="Email Address"
                            type="email"
                            placeholder="Email"
                            register={register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: 'Kindly enter a valid email',
                                },
                            })}
                            error={errors.email}
                        />

                        <Input
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            placeholder="Password"
                            register={register('password', {
                                required: 'Password is required',
                            })}
                            error={errors.password}
                        />

                        <Button type="submit" loading={loading}>
                            Sign Up
                        </Button>
                    </form>

                    <p className="mt-10 text-center text-sm/6 text-gray-500">
                        Not a member?{' '}
                        <Link
                            href={links.sign_up}
                            className="font-semibold text-indigo-600 hover:text-indigo-500">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}
