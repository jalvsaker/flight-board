import React from 'react';
import { Flight, NameMap } from '@/lib/avinor';
import { StatusBadge } from './StatusBadge';

interface FlightTableProps {
    flights: Flight[];
    direction: 'A' | 'D';
    airlineNames: NameMap;
    airportNames: NameMap;
}

export function FlightTable({ flights, direction, airlineNames, airportNames }: FlightTableProps) {
    if (flights.length === 0) {
        return (
            <div className="text-center py-12 text-zinc-500 dark:text-zinc-400">
                No flights found.
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-zinc-600 dark:text-zinc-400">
                    <thead className="bg-zinc-50 text-xs uppercase text-zinc-500 dark:bg-zinc-800/50 dark:text-zinc-400">
                        <tr>
                            <th className="px-6 py-4 font-medium">Time</th>
                            <th className="px-6 py-4 font-medium">Flight</th>
                            <th className="px-6 py-4 font-medium">Airline</th>
                            <th className="px-6 py-4 font-medium">
                                {direction === 'D' ? 'Destination' : 'Origin'}
                            </th>
                            <th className="px-6 py-4 font-medium">
                                {direction === 'D' ? 'Gate' : 'Belt'}
                            </th>
                            <th className="px-6 py-4 font-medium">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                        {flights.map((flight) => {
                            const scheduleTime = new Date(flight.schedule_time);
                            const timeStr = scheduleTime.toLocaleTimeString('en-GB', {
                                hour: '2-digit',
                                minute: '2-digit',
                                timeZone: 'Europe/Oslo',
                            });

                            const airlineName = airlineNames[flight.airline] || flight.airline;
                            const airportName = airportNames[flight.airport] || flight.airport;

                            const uniqueKey = flight.uniqueID || `${flight.flight_id}-${flight.schedule_time}`;

                            return (
                                <tr
                                    key={uniqueKey}
                                    className="group hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
                                >
                                    <td className="px-6 py-4 font-medium text-zinc-900 dark:text-zinc-100 whitespace-nowrap tabular-nums">
                                        {timeStr}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="font-medium text-zinc-900 dark:text-zinc-100">
                                            {flight.flight_id}
                                        </div>
                                        {flight.dom_int === 'D' && (
                                            <span className="text-[10px] text-zinc-400 uppercase tracking-wider">Domestic</span>
                                        )}
                                        {flight.dom_int === 'S' && (
                                            <span className="text-[10px] text-zinc-400 uppercase tracking-wider">Schengen</span>
                                        )}
                                        {flight.dom_int === 'I' && (
                                            <span className="text-[10px] text-zinc-400 uppercase tracking-wider">Non-Schengen</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">{airlineName}</td>
                                    <td className="px-6 py-4 font-medium text-zinc-900 dark:text-zinc-100 whitespace-nowrap">
                                        {airportName}
                                        {flight.via_airport && (
                                            <span className="ml-1 text-xs text-zinc-400 font-normal">
                                                via {flight.via_airport}
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {direction === 'D' ? (
                                            flight.gate ? (
                                                <span className="font-mono text-zinc-900 dark:text-zinc-100">{flight.gate}</span>
                                            ) : (
                                                <span className="text-zinc-400">-</span>
                                            )
                                        ) : (
                                            flight.belt ? (
                                                <span className="font-mono text-zinc-900 dark:text-zinc-100">Belt {flight.belt}</span>
                                            ) : (
                                                <span className="text-zinc-400">-</span>
                                            )
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <StatusBadge
                                            code={flight.status?.['@_code']}
                                            time={flight.status?.['@_time']}
                                            delayed={flight.delayed === 'Y'}
                                        />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
