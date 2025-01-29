import { getTravellingBuses } from '@/api';
import useSWR from 'swr';

import { PaginationParamTypes } from '@/interfaces/pagination-params.interface';
import { TravellingBusesParams } from '@/interfaces/travelling-buses-params.interface';

interface useTravellingBusesProps {
    params: PaginationParamTypes & TravellingBusesParams;
}

const useTravellingBuses = ({ params }: useTravellingBusesProps) => {
    const { data, error, mutate, isLoading } = useSWR(
        ['/travelling-bus/', params],
        ([url, params]: [
            url: string,
            params: PaginationParamTypes & TravellingBusesParams
        ]) => getTravellingBuses({ url, params })
    );

    return {
        isLoading,
        data,
        error,
        mutate,
    };
};

export default useTravellingBuses;
