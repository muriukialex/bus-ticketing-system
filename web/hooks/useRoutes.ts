import { getRoutes } from '@/api';
import useSWR from 'swr';

import { PaginationParamTypes } from '@/interfaces/pagination-params.interface';

interface useRoutesProps {
    params: PaginationParamTypes;
}

const useRoutes = ({ params }: useRoutesProps) => {
    const { data, error, mutate, isLoading } = useSWR(
        ['/routes', params],
        ([url, params]: [url: string, params: PaginationParamTypes]) =>
            getRoutes({ url, params })
    );

    return {
        isLoading,
        data,
        error,
        mutate,
    };
};

export default useRoutes;
