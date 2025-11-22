import { fetchFlights, fetchAirlineNames, fetchAirportNames } from "@/lib/avinor";
import { FlightBoard } from "@/components/FlightBoard";

interface PageProps {
  searchParams: Promise<{
    airport?: string;
    direction?: 'A' | 'D';
  }>;
}

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams;
  const airport = params.airport || 'OSL';
  const direction = params.direction || 'D';

  // Fetch flights
  // For departures, we want to see flights in the next few hours
  // For arrivals, we might want to see recent arrivals too
  const hoursBack = direction === 'A' ? 2 : 1;
  const hoursForward = direction === 'A' ? 2 : 4;

  const [flights, airlineNames, airportNames] = await Promise.all([
    fetchFlights(airport, direction, hoursBack, hoursForward),
    fetchAirlineNames(),
    fetchAirportNames(),
  ]);

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-black">
      <FlightBoard
        flights={flights}
        direction={direction}
        airport={airport}
        airlineNames={airlineNames}
        airportNames={airportNames}
      />
    </main>
  );
}
