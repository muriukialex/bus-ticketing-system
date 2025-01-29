import formatDate from '@/helpers/format-date';
import { TravellingBus } from '@/interfaces/travelling-bus.interface';
import { Dispatch, SetStateAction } from 'react';
import { MdEventSeat } from 'react-icons/md';
import { BookBusOverlay } from './book-bus-overlay';
import Button from './button';

interface BookBusCardProps {
    travellingBus: TravellingBus;
    isCartOpen: boolean;
    setIsCartOpen: Dispatch<SetStateAction<boolean>>;
    handleAddToCart: () => void;
    bookingRequestOngoing: boolean;
    bookBus: ({
        seatNumber,
        travellingBusId,
    }: {
        seatNumber: string;
        travellingBusId: number;
    }) => Promise<void>;
}

const BookBusCard = ({
    travellingBus,
    isCartOpen,
    setIsCartOpen,
    handleAddToCart,
    bookingRequestOngoing,
    bookBus
}: BookBusCardProps) => {
    return (
        <div className="flex items-center justify-between">
            <div className="py-4 w-full">
                <div>
                    <div className="my-2">
                        <div className="font-extrabold">
                            {travellingBus.busName}
                        </div>
                    </div>
                    <div>
                        <div>
                            <div className="flex flex-col">
                                <span>
                                    <span className="text-orange-500">
                                        From:
                                    </span>{' '}
                                    {travellingBus.route.origin}
                                </span>{' '}
                                {formatDate(travellingBus.departureTime)}
                            </div>
                            <hr className="my-2" />
                            <div className="flex flex-col">
                                <span>
                                    <span className="text-green-500">To:</span>{' '}
                                    {travellingBus.route.destination}
                                </span>{' '}
                                {formatDate(travellingBus.arrivalTime)}
                            </div>
                        </div>
                        <div className="my-2">
                            Distance: {travellingBus.route.distance} Kilometres
                        </div>
                    </div>
                </div>

                <div className="my-2 flex justify-between items-center">
                    <div>
                        <div>KES: {travellingBus.priceOfTrip}</div>
                    </div>

                    <div>
                        <div className="flex items-center mb-2">
                            <MdEventSeat />
                            {travellingBus.busSeats} seats
                        </div>
                        <Button type="button" onClick={() => handleAddToCart()}>
                            Select seat
                        </Button>
                    </div>
                </div>
            </div>

            <BookBusOverlay
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                travellingBus={travellingBus}
                bookingRequestOngoing={bookingRequestOngoing}
                bookBus={bookBus}
            />
        </div>
    );
};

export default BookBusCard;
