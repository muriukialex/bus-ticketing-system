import { Button, RouteCard } from '@/components';
import { Route } from '@/interfaces/route.interface';

interface RoutesProps {
    data?: Route[];
    error: unknown;
    isLoading: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutate: any;
}

const Routes = ({ data, error, isLoading, mutate }: RoutesProps) => {
    if (isLoading) {
        return <p>Loading...</p>;
    }
    if (error) {
        return (
            <>
                <p className="my-4">An error occurred</p>
                <Button type="button" onClick={() => mutate()}>
                    Refresh
                </Button>
            </>
        );
    }

    return (
        <div>
            {data?.map(data => (
                <RouteCard
                    key={data.id}
                    origin={data.origin}
                    distance={data.distance}
                    destination={data.destination}
                />
            ))}
        </div>
    );
};

export default Routes;
