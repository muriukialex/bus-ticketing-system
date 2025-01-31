'use client';

import { AuthProvider } from '@/context/auth-context';
import type { FC, PropsWithChildren } from 'react';
import { Suspense } from 'react';

const DashboardLayout: FC<PropsWithChildren> = function ({ children }) {
    return (
        <AuthProvider>
            <Suspense>{children}</Suspense>
        </AuthProvider>
    );
};

export default DashboardLayout;
