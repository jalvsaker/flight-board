# Norwegian Flight Board

A real-time flight information board for Norwegian airports using the Avinor Flight Data API.

## Features

- **Real-time Flight Data**: Live flight information from Avinor's public API
- **Auto-Refresh**: Automatically updates every 3 minutes
- **All Norwegian Airports**: Support for 48+ Avinor-operated airports
- **Departures & Arrivals**: Switch between departure and arrival boards
- **Full Airport Names**: Displays full airline and airport names instead of codes
- **Check-in Information**: Shows check-in desk numbers for departures
- **Responsive Design**: Works on desktop and mobile devices
- **Dark Mode**: Automatic dark mode support

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the flight board.

## Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **fast-xml-parser** - XML parsing for Avinor API

## API

This application uses the public Avinor Flight Data API:
- Flight Data: `https://asrv.avinor.no/XmlFeed/v1.0`
- Airport Names: `https://asrv.avinor.no/airportNames/v1.0`
- Airline Names: `https://asrv.avinor.no/airlineNames/v1.0`

Data is cached according to Avinor's recommendations:
- Flight data: 3 minutes
- Name data: 1 hour

## Deployment

Deploy to Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

The application uses Next.js ISR (Incremental Static Regeneration) for caching, which works seamlessly on Vercel's serverless platform.
