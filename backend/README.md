# Bus Ticketing Service

## Overview

This is a small bus ticketing service API built with NestJS and TypeORM. It includes modules for user authentication, route management, travelling buses, and bookings. Below is a guide to the available endpoints and their functionalities.

---

## Authentication Module

### Sign Up

**POST** `http://localhost:3000/auth/sign-up/`

**Sample Payload:**

```json
{
  "firstName": "Miriam",
  "lastName": "Wanjiku",
  "email": "miriam@gmail.com",
  "password": "Test1234@#2"
}
```

### Sign In

**POST** `http://localhost:3000/auth/sign-in/`

**Sample Payload:**

```json
{
  "email": "miriam@gmail.com",
  "password": "Test1234@#2"
}
```

---

## Routes Module

### Create New Route

**POST** `http://localhost:3000/routes/`

**Sample Payload:**

```json
{
  "origin": "Nairobi",
  "destination": "Bungoma",
  "distance": 315
}
```

### Get Routes

**GET** `http://localhost:3000/routes/?per=10&page=1`

### Get Route by ID

**GET** `http://localhost:3000/routes/1`

---

## Travelling Bus Module

### Create Travelling Bus

**POST** `http://localhost:3000/travelling-bus/`

**Sample Payload:**

```json
{
  "routeId": 2,
  "busName": "KAV004X",
  "busSeats": 45,
  "departureTime": "2025-01-25T08:57:17.382Z",
  "arrivalTime": "2025-01-25T18:57:17.382Z",
  "priceOfTrip": 1750
}
```

### Get Travelling Bus by ID

**GET** `http://localhost:3000/travelling-bus/6`

### Get Travelling Buses by Origin and Destination

**GET** `http://localhost:3000/travelling-bus/?origin=Nairobi&destination=Bungoma`

---

## Booking Module

### Create Booking

**POST** `http://localhost:3000/booking/`

**Sample Payload:**

```json
{
  "userId": 1,
  "travellingBusId": 6,
  "seatNumber": "1X"
}
```

### Get User Bookings

**GET** `http://localhost:3000/booking/user/1`

---

## Running the Service

1. Clone the repository.
2. Install dependencies: `npm install`
3. Configure the environment variables for the database and other settings.
4. Run the service: `npm run start:dev`.
5. Access the API on `http://localhost:3000/`.
