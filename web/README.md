# Web Version - Bus Ticketing Service

## Overview

This is the web version of the Bus Ticketing Service, providing an intuitive user interface for booking bus tickets. Built with Next.js and TypeScript, it enables users to view for available routes, buses, select seats, and complete booking.

---

## Features

### 1. User Authentication

-   Sign Up and Sign In functionality for users.
-   Secure authentication using JWT.

### 2. Routes Display

-   Users can view available routes by providing origin and destination.

### 3. Available Buses

-   Displays a list of buses traveling on a selected route along with departure time and pricing.

### 4. Seat Selection

-   Users can select seats from the available options.
-   Booked seats are visually indicated as unavailable.

### 5. Booking Confirmation

-   Users can confirm their booking after selecting a seat.
-   Booking details are stored and retrievable.

---

## Tech Stack

-   **Frontend:** Next.js, TypeScript, Tailwind CSS
-   **State Management:** SWR for data fetching
-   **Backend:** NestJS API
-   **Database:** PostgreSQL (via backend API)

---

## Installation & Setup

### Prerequisites

-   Node.js installed
-   Backend API running (Follow the backend setup guide)

### Steps

1. Clone the repository:
    ```sh
    git clone git@github.com:muriukialex/bus-ticketing-system.git
    ```
2. Navigate into the project directory:
    ```sh
    cd web
    ```
3. Install dependencies:
    ```sh
    npm install
    ```
4. Set up environment variables by creating a `.env.local` file and configuring API URLs:
    ```env
    NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
    ```
5. Start the development server:
    ```sh
    npm run dev
    ```
6. Open the application in the browser:
    ```
    http://localhost:3001
    ```

---

## Usage

### 1. Searching for Buses

-   Users can view destinations and find available buses.

### 2. Selecting Seats

-   Available seats are displayed, and users can choose from unbooked seats.

### 3. Booking Confirmation

-   Users confirm their seat selection and complete the booking.

### 4. Viewing Bookings

-   Users can view their past bookings from their account section.(TODO)

---

## Deployment

To deploy the application:

1. Build the project:
    ```sh
    npm run build
    ```
2. Start the production server:
    ```sh
    npm start
    ```

---

## Contribution

-   Contributions are welcome! Please create a pull request with any improvements.

---
