"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Flight, NameMap } from '@/lib/avinor';
import { FlightTable } from './FlightTable';
import { VALID_AIRPORTS } from '@/lib/constants';

interface FlightBoardProps {
    flights: Flight[];
    direction: 'A' | 'D';
    airport: string;
    airlineNames: NameMap;
    airportNames: NameMap;
}

export function FlightBoard({ flights, direction, airport, airlineNames, airportNames }: FlightBoardProps) {
    const router = useRouter();

    useEffect(() => {
        const interval = setInterval(() => {
            router.refresh();
        }, 180000); // Refresh every 3 minutes (180 seconds) per API spec

        return () => clearInterval(interval);
    }, [router]);

    return (
        <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                        Flight Board
                    </h1>
                    <p className="mt-1 text-zinc-500 dark:text-zinc-400">
                        Live flight information for {airportNames[airport] || airport}
                    </p>
                </div>

                <div className="relative">
                    <select
                        value={airport}
                        onChange={(e) => router.push(`/?airport=${e.target.value}&direction=${direction}`)}
                        className="block w-full rounded-lg border-0 py-2 pl-3 pr-10 text-zinc-900 bg-white ring-1 ring-inset ring-zinc-300 focus:ring-2 focus:ring-blue-600 dark:bg-zinc-800 dark:text-zinc-100 dark:ring-zinc-700 sm:text-sm sm:leading-6"
                    >
                        {/* Major cities first */}
                        {['OSL', 'BGO', 'TRD', 'SVG', 'TOS'].map((code) => (
                            <option key={code} value={code} style={{ fontWeight: 'bold' }}>
                                {airportNames[code] || code} ({code})
                            </option>
                        ))}
                        <option disabled>──────────</option>
                        {/* All other airports */}
                        {VALID_AIRPORTS.filter(code => !['OSL', 'BGO', 'TRD', 'SVG', 'TOS'].includes(code)).map((code) => (
                            <option key={code} value={code}>
                                {airportNames[code] || code} ({code})
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="mb-6">
                <div className="border-b border-zinc-200 dark:border-zinc-800">
                    <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                        <Link
                            href={`/?airport=${airport}&direction=D`}
                            className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ${direction === 'D'
                                ? 'border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                                : 'border-transparent text-zinc-500 hover:border-zinc-300 hover:text-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:text-zinc-300'
                                }`}
                        >
                            Departures
                        </Link>
                        <Link
                            href={`/?airport=${airport}&direction=A`}
                            className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ${direction === 'A'
                                ? 'border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                                : 'border-transparent text-zinc-500 hover:border-zinc-300 hover:text-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:text-zinc-300'
                                }`}
                        >
                            Arrivals
                        </Link>
                    </nav>
                </div>
            </div>

            <FlightTable
                flights={flights}
                direction={direction}
                airlineNames={airlineNames}
                airportNames={airportNames}
            />

            <div className="mt-8 text-center text-xs text-zinc-400 dark:text-zinc-500">
                Data provided by Avinor. Updated every 3 minutes.
            </div>
        </div>
    );
}
