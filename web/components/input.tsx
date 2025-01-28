import React from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

interface InputProps {
    id: string;
    name: string;
    label: string;
    type: string;
    placeholder?: string;
    register?: UseFormRegisterReturn;
    error?: FieldError;
    required?: boolean;
    className?: string;
}

const Input: React.FC<InputProps> = ({
    id,
    name,
    label,
    type,
    placeholder = '',
    register,
    error,
    required = false,
    className = '',
}) => {
    return (
        <div className="w-full">
            <label
                htmlFor={name}
                className="block text-sm/6 font-medium text-gray-900">
                {label}
            </label>
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                required={required}
                autoComplete={name}
                className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-offset-1 border border-gray-300 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600 sm:text-sm ${className}`}
                {...register}
            />
            {error && (
                <p className="mt-1 text-sm text-red-500">{error.message}</p>
            )}
        </div>
    );
};

export default Input;
