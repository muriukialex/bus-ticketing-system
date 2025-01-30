import { TravellingBus } from './travelling-bus.interface';
import { UserDetails } from './user-details.interface';

export interface BookingSuccess {
    seatNumbers: Array<string>;
    user: UserDetails;
    travellingBus: TravellingBus;
    bookingStatus: string;
    id: number;
    timeBooked: string;
}
