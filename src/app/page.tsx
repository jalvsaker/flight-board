import { fetchFlights, fetchAirlineNames, fetchAirportNames } from "@/lib/avinor";
import { FlightBoard } from "@/components/FlightBoard";
import { redirect } from "next/navigation";
import { isValidAirport } from "@/lib/constants";

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
  const airport = (airportParam && isValidAirport(airportParam) ? airportParam : 'OSL');

  // Validate direction
  const direction: 'A' | 'D' = (directionParam === 'A' || directionParam === 'D') ? directionParam : 'D';

  // Redirect if invalid parameters were provided
  if (airportParam && !isValidAirport(airportParam)) {
    redirect(`/?airport=OSL&direction=${direction}`);
  }
  if (directionParam && directionParam !== 'A' && directionParam !== 'D') {
    redirect(`/?airport=${airport}&direction=D`);
  }

  const hoursBack = 1;
  const hoursForward = 7;

  const [{ flights, lastUpdate }, airlineNames, airportNames] = await Promise.all([
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
        lastUpdated={lastUpdate}
      />
    </main>
  );
}
