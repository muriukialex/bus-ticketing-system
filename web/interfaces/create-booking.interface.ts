export interface CreateBooking {
    userId?: number;
    travellingBusId?: number;
    seatNumber: string; // this ideally should be an array of strings
}
