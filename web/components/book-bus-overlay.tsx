'use client';

import { TravellingBus } from '@/interfaces/travelling-bus.interface';
import { lastSeatsRow, seatsA, seatsB, seatsC, seatsD } from '@/utils/seats';
import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import { FaRegTrashAlt } from 'react-icons/fa';
import { AvailableSeat, OccupiedSeat } from './bus-seats';
import Button from './button';
import { Sheet, SheetContent, SheetTitle } from './sheet';

export function BookBusOverlay({
    isOpen,
    onClose,
    travellingBus,
    bookingRequestOngoing,
    bookBus,
}: {
    isOpen: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onClose: any;
    travellingBus: TravellingBus;
    bookingRequestOngoing: boolean;
    bookBus: ({
        seatNumber,
        travellingBusId,
    }: {
        seatNumber: string;
        travellingBusId: number;
    }) => Promise<void>;
}) {
    const [seatsToBook, setSeatsToBook] = useState<Array<string>>([]);

    const handleSeatSelection = (seat: string) => {
        if (!seat) return;
        if (seatsToBook.includes(seat)) {
            setSeatsToBook(seatsToBook.filter(s => s !== seat));
        } else {
            setSeatsToBook([...seatsToBook, seat]);
        }
    };

    const clearSeatsToBook = () => {
        setSeatsToBook([]);
    };

    const isBooked = useCallback(
        (seat: string) => {
            if (!seat) return false;
            return seatsToBook.includes(seat);
        },
        [seatsToBook]
    );

    const totalCost = useCallback(
        (costPerItem: number, numberOfItems: number) => {
            if (!numberOfItems) return 0;
            return costPerItem * numberOfItems || 1;
        },
        []
    );

    const confirmBooking = async () => {
        try {
            await bookBus({
                seatNumber: seatsToBook[0],
                travellingBusId: travellingBus.id,
            });
            clearSeatsToBook();
        } catch {
            toast.success('Something went wrong');
        }
    };

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="w-full sm:max-w-md border-l-0 p-0 [&_button[aria-label=Close]]:size-12 absolute right-0 top-0 h-full">
                <SheetTitle className="sr-only">Cart</SheetTitle>
                <div className="flex flex-col h-full">
                    <div className="flex-1 overflow-auto py-6 px-8">
                        <div>
                            <div>
                                <div className="flex">
                                    <span>
                                        <span className="text-orange-500">
                                            From:
                                        </span>{' '}
                                        {travellingBus.route.origin}
                                    </span>{' '}
                                    <span className="ml-2">
                                        <span className="text-green-500">
                                            To:
                                        </span>{' '}
                                        {travellingBus.route.destination}
                                    </span>{' '}
                                </div>
                                <div className="my-2">
                                    Bus: {travellingBus.busName}
                                </div>
                                <div className="my-4 flex justify-between">
                                    <div className="my-2 place-items-center">
                                        <AvailableSeat
                                            seat=""
                                            handleSeatSelection={
                                                handleSeatSelection
                                            }
                                            booked={isBooked('')}
                                        />
                                        <div>Available</div>
                                    </div>
                                    <div className="my-2 place-items-center">
                                        <OccupiedSeat />
                                        <div>Occupied</div>
                                    </div>
                                </div>
                                <div>
                                    <h2 className="underline">Select seat</h2>
                                    <div className="flex">
                                        <div className="mr-8 flex">
                                            {/* 1st and 2nd column */}
                                            <div>
                                                {seatsA.map((seat, idx) =>
                                                    travellingBus.seats.includes(
                                                        seat
                                                    ) ? (
                                                        <AvailableSeat
                                                            key={idx}
                                                            seat={seat}
                                                            handleSeatSelection={
                                                                handleSeatSelection
                                                            }
                                                            booked={isBooked(
                                                                seat
                                                            )}
                                                        />
                                                    ) : (
                                                        <OccupiedSeat
                                                            key={idx}
                                                        />
                                                    )
                                                )}
                                            </div>
                                            <div>
                                                {seatsB.map((seat, idx) =>
                                                    travellingBus.seats.includes(
                                                        seat
                                                    ) ? (
                                                        <AvailableSeat
                                                            key={idx}
                                                            seat={seat}
                                                            handleSeatSelection={
                                                                handleSeatSelection
                                                            }
                                                            booked={isBooked(
                                                                seat
                                                            )}
                                                        />
                                                    ) : (
                                                        <OccupiedSeat
                                                            key={idx}
                                                        />
                                                    )
                                                )}
                                            </div>
                                        </div>
                                        <div className="mr-8 flex">
                                            {/* 3rd and 4th column */}
                                            <div>
                                                {seatsC.map((seat, idx) =>
                                                    travellingBus.seats.includes(
                                                        seat
                                                    ) ? (
                                                        <AvailableSeat
                                                            key={idx}
                                                            seat={seat}
                                                            handleSeatSelection={
                                                                handleSeatSelection
                                                            }
                                                            booked={isBooked(
                                                                seat
                                                            )}
                                                        />
                                                    ) : (
                                                        <OccupiedSeat
                                                            key={idx}
                                                        />
                                                    )
                                                )}
                                            </div>
                                            <div className="ml-1">
                                                {seatsD.map((seat, idx) =>
                                                    travellingBus.seats.includes(
                                                        seat
                                                    ) ? (
                                                        <AvailableSeat
                                                            key={idx}
                                                            seat={seat}
                                                            handleSeatSelection={
                                                                handleSeatSelection
                                                            }
                                                            booked={isBooked(
                                                                seat
                                                            )}
                                                        />
                                                    ) : (
                                                        <OccupiedSeat
                                                            key={idx}
                                                        />
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        {/* last seats row */}
                                        <div className="flex">
                                            {lastSeatsRow.map((seat, idx) =>
                                                travellingBus.seats.includes(
                                                    seat
                                                ) ? (
                                                    <AvailableSeat
                                                        key={idx}
                                                        seat={seat}
                                                        handleSeatSelection={
                                                            handleSeatSelection
                                                        }
                                                        booked={isBooked(seat)}
                                                    />
                                                ) : (
                                                    <OccupiedSeat key={idx} />
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="border-t">
                        <div className="p-8 space-y-4">
                            <div className="flex justify-between items-center">
                                <p className="font-mono uppercase">Total</p>
                                <p className="font-mono">
                                    KES:{' '}
                                    {totalCost(
                                        Number(travellingBus.priceOfTrip),
                                        seatsToBook.length
                                    )}
                                </p>
                            </div>
                            {seatsToBook.length > 0 && (
                                <button
                                    onClick={clearSeatsToBook}
                                    className="my-4 flex items-center">
                                    Clear ({seatsToBook.length}) selections{' '}
                                    <FaRegTrashAlt
                                        className="ml-2"
                                        color="red"
                                    />
                                </button>
                            )}
                            <p className="font-mono text-xs text-muted-foreground">
                                PLEASE NOTE THAT GOODS ONCE BOUGHT CAN NOT BE
                                RETURNED
                            </p>
                            <Button
                                loading={bookingRequestOngoing}
                                disabled={Boolean(seatsToBook.length === 0)}
                                type="button"
                                className="font-mono"
                                onClick={() => confirmBooking()}>
                                CONFIRM
                            </Button>
                        </div>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
