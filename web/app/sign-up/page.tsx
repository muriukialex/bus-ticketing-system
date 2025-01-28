'use client';
import { signUpRequest } from '@/api';
import { Button, Input } from '@/components';
import { ErrorResponse } from '@/interfaces/error-response.interface';
import { SignUpForm } from '@/interfaces/sign-up-form.interface';
import links from '@/utils/links';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export default function SignUp() {
    const { push } = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpForm>();
    const [loading, setLoading] = React.useState(false);

    const onSubmit = async (data: SignUpForm) => {
        setLoading(true);

        setLoading(true);

        try {
            const response = await signUpRequest(data);
            if (response.data) {
                toast.success('Sign up was successful. Please log in');

                push(links.sign_in);
            }
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
                            alt="Flowbite logo"
                            height="180"
                            src="/images/bus-ticket-logo.png"
                            width="180"
                        />
                    </div>
                    <h2 className="mt-2 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                        Register an account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4">
                        <Input
                            id="firstName"
                            name="firstName"
                            label="First name"
                            type="text"
                            placeholder="First name"
                            register={register('firstName', {
                                required: 'First name is required',
                            })}
                            error={errors.firstName}
                        />
                        <Input
                            id="lastName"
                            name="lastName"
                            label="Last name"
                            type="text"
                            placeholder="Last name"
                            register={register('lastName', {
                                required: 'Last name is required',
                            })}
                            error={errors.lastName}
                        />
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
                        Already a member?{' '}
                        <Link
                            href={links.sign_in}
                            className="font-semibold text-indigo-600 hover:text-indigo-500">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}
