import { Button } from '@/components';
import BookBusCard from '@/components/book-bus-card';
import { TravellingBus } from '@/interfaces/travelling-bus.interface';
import { Dispatch, SetStateAction } from 'react';

interface TravellingBusProps {
    data?: TravellingBus[];
    error: unknown;
    isLoading: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutate: any;
    isCartOpen: boolean;
    setIsCartOpen: Dispatch<SetStateAction<boolean>>;
    handleAddToCart: () => void;
    bookingRequestOngoing: boolean;
    bookBus: ({
        seatNumbers,
        travellingBusId,
    }: {
        seatNumbers: Array<string>;
        travellingBusId: number;
    }) => Promise<void>;
}

const BookBuses = ({
    data,
    error,
    isLoading,
    mutate,
    isCartOpen,
    setIsCartOpen,
    handleAddToCart,
    bookingRequestOngoing,
    bookBus,
}: TravellingBusProps) => {
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
                <BookBusCard
                    key={data.id}
                    travellingBus={data}
                    isCartOpen={isCartOpen}
                    setIsCartOpen={setIsCartOpen}
                    handleAddToCart={handleAddToCart}
                    bookingRequestOngoing={bookingRequestOngoing}
                    bookBus={bookBus}
                />
            ))}
        </div>
    );
};

export default BookBuses;
