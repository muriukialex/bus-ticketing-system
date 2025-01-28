'use client';

import { PaperCenter } from '@/components';
import { useAuth } from '@/context/auth-context';
import defaultParams from '@/helpers/default-params';
import useRoutes from '@/hooks/useRoutes';
import { useImmer } from 'use-immer';
import { Profile, Routes } from './_components';

const Home = () => {
    const [params] = useImmer(defaultParams);
    const { data, error, isLoading, mutate } = useRoutes({ params });
    const { userData, logout } = useAuth();

    return (
        <div>
            <PaperCenter>
                <Profile userData={userData} logout={logout} />

                <h1 className="mt-12 mb-4 text-2xl font-extrabold underline">
                    Available destinations
                </h1>
                <Routes
                    data={data?.data.data}
                    error={error}
                    isLoading={isLoading}
                    mutate={mutate}
                />
            </PaperCenter>
        </div>
    );
};

export default Home;
