# Campus Rooms

A campus room discovery and booking demo built with Next.js, React, and Tailwind CSS.

## Features

- Browse eight sample study, meeting, and collaboration rooms.
- Search by room name, building, room type, and amenities.
- Filter by building, space type, and minimum capacity; sort results by name or capacity.
- Save favorite spaces in this browser.
- View room details and amenities before booking.
- Reserve one-hour time slots and review or cancel saved bookings.
- Responsive layout with keyboard-visible focus styles and reduced-motion support.

## Run locally

Use Node.js and npm, then run these commands from this project directory:

```powershell
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). If that port is already in use, Next.js will print the alternate local URL in the terminal.

## Validate changes

```powershell
npm run lint
npm run build
```

## Demo data and storage

The room catalog is sample data in `src/app/data/rooms.js`. Favorites and bookings are stored in the browser's local storage, so they are available only in the same browser profile and device. This demo does not connect to a campus scheduling system or provide shared availability, authentication, or server-side reservations. Do not enter sensitive personal information.
