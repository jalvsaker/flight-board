import { fetchFlights, fetchAirlineNames, fetchAirportNames } from "@/lib/avinor";
import { FlightBoard } from "@/components/FlightBoard";
import { redirect } from "next/navigation";
import { VALID_AIRPORTS } from "@/lib/constants";

interface PageProps {
  searchParams: Promise<{
    airport?: string;
    direction?: string;
  }>;
}

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams;
  const airportParam = params.airport?.toUpperCase();
  const directionParam = params.direction?.toUpperCase();

  // Validate airport
  const airport = (airportParam && VALID_AIRPORTS.includes(airportParam as any) ? airportParam : 'OSL') as string;

  // Validate direction
  const direction: 'A' | 'D' = (directionParam === 'A' || directionParam === 'D') ? directionParam : 'D';

  // Redirect if invalid parameters were provided
  if (airportParam && !VALID_AIRPORTS.includes(airportParam as any)) {
    redirect(`/?airport=OSL&direction=${direction}`);
  }
  if (directionParam && directionParam !== 'A' && directionParam !== 'D') {
    redirect(`/?airport=${airport}&direction=D`);
  }

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
        lastUpdated={new Date().toISOString()}
      />
    </main>
  );
}
