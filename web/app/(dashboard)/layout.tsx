'use client';

import { AuthProvider } from '@/context/auth-context';
import type { FC, PropsWithChildren } from 'react';

const DashboardLayout: FC<PropsWithChildren> = function ({ children }) {
    return <AuthProvider>{children}</AuthProvider>;
};

export default DashboardLayout;
