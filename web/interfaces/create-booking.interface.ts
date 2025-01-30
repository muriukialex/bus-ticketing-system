export interface CreateBooking {
    userId?: number;
    travellingBusId?: number;
    seatNumbers: Array<string>; // this ideally should be an array of strings
}
