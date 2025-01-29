export interface TravellingBus {
    id: number;
    busName: string;
    busSeats: string;
    departureTime: string;
    arrivalTime: string;
    priceOfTrip: string;
    route: {
        id: number;
        origin: string;
        destination: string;
        createdAt: string;
        distance: string;
    };
    seats: Array<string>;
}
