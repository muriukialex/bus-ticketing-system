'use client';

import { createBooking } from '@/api';
import { Button, PaperCenter } from '@/components';
import { useAuth } from '@/context/auth-context';
import defaultParams from '@/helpers/default-params';
import useTravellingBuses from '@/hooks/useTravellingBuses';
import { CreateBooking } from '@/interfaces/create-booking.interface';
import { ErrorResponse } from '@/interfaces/error-response.interface';
import { PaginationParamTypes } from '@/interfaces/pagination-params.interface';
import { TravellingBusesParams } from '@/interfaces/travelling-buses-params.interface';
import links from '@/utils/links';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import { useImmer } from 'use-immer';
import { BookBuses } from './_components';

const BookBus = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const origin = searchParams.get('origin');
    const destination = searchParams.get('destination');
    const [params] = useImmer(defaultParams);
    const { userData } = useAuth();
    const [bookingRequestOngoing, setBookingRequestOngoing] = useState(false);

    const [isCartOpen, setIsCartOpen] = useState(false);

    const handleAddToCart = useCallback(() => {
        setIsCartOpen(prev => !prev);
    }, []);

    const travellingBusParams: TravellingBusesParams & PaginationParamTypes = {
        ...params,
        origin,
        destination,
    };

    const { data, error, isLoading, mutate } = useTravellingBuses({
        params: travellingBusParams,
    });

    const bookBus = async ({
        seatNumbers,
        travellingBusId,
    }: {
        seatNumbers: Array<string>;
        travellingBusId: number;
    }) => {
        const payload: CreateBooking = {
            seatNumbers: seatNumbers,
            travellingBusId: travellingBusId,
            userId: userData?.id,
        };
        setBookingRequestOngoing(true);

        try {
            const response = await createBooking(payload);
            if ((await response.data).id) {
                toast.success('Booking was successful!');
                mutate();
                handleAddToCart();
            }
        } catch (error) {
            const errorResponse = error as ErrorResponse;
            if (errorResponse.message) {
                toast.error(errorResponse.message);
            }
        } finally {
            setBookingRequestOngoing(false);
        }
    };

    return (
        <div>
            <PaperCenter>
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-extrabold">
                        {origin} to {destination}
                    </h1>
                    <div>
                        <Button
                            type="button"
                            onClick={() => router.push(links.home)}>
                            Back
                        </Button>
                    </div>
                </div>
                <BookBuses
                    data={data?.data.data}
                    error={error}
                    isLoading={isLoading}
                    mutate={mutate}
                    isCartOpen={isCartOpen}
                    setIsCartOpen={setIsCartOpen}
                    handleAddToCart={handleAddToCart}
                    bookingRequestOngoing={bookingRequestOngoing}
                    bookBus={bookBus}
                />
            </PaperCenter>
        </div>
    );
};

export default BookBus;
