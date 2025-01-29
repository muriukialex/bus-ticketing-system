const seats = [
    '1A',
    '1B',
    '1C',
    '1D',
    '2A',
    '2B',
    '2C',
    '2D',
    '3A',
    '3B',
    '3C',
    '3D',
    '4A',
    '4B',
    '4C',
    '4D',
    '5A',
    '5B',
    '5C',
    '5D',
    '6A',
    '6B',
    '6C',
    '6D',
    '7A',
    '7B',
    '7C',
    '7D',
    '8A',
    '8B',
    '8C',
    '8D',
    '9A',
    '9B',
    '9C',
    '9D',
    '10A',
    '10B',
    '10C',
    '10D',
];

const lastSeatsRow = ['11A', '11B', '11C', '11D', '11E'];

const seatsA = seats.filter(seat => seat.endsWith('A'));
const seatsB = seats.filter(seat => seat.endsWith('B'));
const seatsC = seats.filter(seat => seat.endsWith('C'));
const seatsD = seats.filter(seat => seat.endsWith('D'));

export { lastSeatsRow, seatsA, seatsB, seatsC, seatsD };
