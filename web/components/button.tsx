import React from 'react';

interface ButtonProps {
    type: 'button' | 'submit' | 'reset';
    onClick?: () => void;
    loading?: boolean;
    disabled?: boolean;
    className?: string;
    children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
    type,
    onClick,
    loading = false,
    disabled = false,
    className = '',
    children,
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={loading || disabled}
            className={`flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}>
            {loading ? 'Loading...' : children}
        </button>
    );
};

export default Button;
