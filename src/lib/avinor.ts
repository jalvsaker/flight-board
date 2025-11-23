import { XMLParser } from 'fast-xml-parser';

export interface Flight {
    uniqueID: string;
    airline: string;
    flight_id: string;
    dom_int: string;
    schedule_time: string;
    arr_dep: 'A' | 'D';
    airport: string; // Destination for D, Origin for A
    via_airport?: string;
    check_in?: string;
    gate?: string;
    belt?: string;
    status?: {
        '@_code': string;
        '@_time'?: string;
    };
    delayed?: 'Y';
}

export interface AirportData {
    airport: {
        '@_name': string;
        flights: {
            '@_lastUpdate': string;
            flight: Flight[];
        };
    };
}

const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '@_',
});

export async function fetchFlights(airportCode: string = 'OSL', direction?: 'A' | 'D', hoursBack: number = 2, hoursForward: number = 4): Promise<{ flights: Flight[], lastUpdate: string }> {
    const params = new URLSearchParams({
        airport: airportCode,
        TimeFrom: hoursBack.toString(),
        TimeTo: hoursForward.toString(),
    });

    if (direction) {
        params.append('direction', direction);
    }

    const response = await fetch(`https://asrv.avinor.no/XmlFeed/v1.0?${params.toString()}`, {
        next: { revalidate: 180 }, // Cache for 3 minutes (180 seconds) per API spec
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch flights: ${response.statusText}`);
    }

    const xmlText = await response.text();
    const data = parser.parse(xmlText) as AirportData;

    if (!data.airport?.flights?.flight) {
        return { flights: [], lastUpdate: new Date().toISOString() };
    }

    const lastUpdate = data.airport.flights['@_lastUpdate'] || new Date().toISOString();

    // Ensure it's always an array (single flight might be parsed as object)
    const flights = Array.isArray(data.airport.flights.flight)
        ? data.airport.flights.flight
        : [data.airport.flights.flight];

    return { flights, lastUpdate };
}

export interface NameMap {
    [code: string]: string;
}

interface NameData {
    airlineNames?: {
        airlineName: { '@_code': string; '@_name': string }[];
    };
    airportNames?: {
        airportName: { '@_code': string; '@_name': string }[];
    };
}

async function fetchNames(endpoint: string, type: 'airline' | 'airport'): Promise<NameMap> {
    const response = await fetch(`https://asrv.avinor.no/${endpoint}/v1.0`, {
        next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
        console.warn(`Failed to fetch ${type} names`);
        return {};
    }

    const xmlText = await response.text();
    const data = parser.parse(xmlText) as NameData;
    const map: NameMap = {};

    const items = type === 'airline'
        ? data.airlineNames?.airlineName
        : data.airportNames?.airportName;

    if (items) {
        const itemList = Array.isArray(items) ? items : [items];
        itemList.forEach((item) => {
            map[item['@_code']] = item['@_name'];
        });
    }

    return map;
}

export async function fetchAirlineNames(): Promise<NameMap> {
    return fetchNames('airlineNames', 'airline');
}

export async function fetchAirportNames(): Promise<NameMap> {
    return fetchNames('airportNames', 'airport');
}
