import React from 'react';

interface StatusBadgeProps {
    code?: string;
    time?: string;
    delayed?: boolean;
}

export function StatusBadge({ code, time, delayed }: StatusBadgeProps) {
    let label = '';
    let colorClass = 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';

    if (delayed) {
        colorClass = 'bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/10 dark:bg-red-400/10 dark:text-red-400 dark:ring-red-400/20';
        label = 'Delayed';
    } else if (code === 'A') {
        colorClass = 'bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20 dark:bg-green-500/10 dark:text-green-400 dark:ring-green-500/20';
        label = 'Landed';
    } else if (code === 'D') {
        colorClass = 'bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-700/10 dark:bg-blue-400/10 dark:text-blue-400 dark:ring-blue-400/30';
        label = 'Departed';
    } else if (code === 'E') {
        colorClass = 'bg-yellow-50 text-yellow-800 ring-1 ring-inset ring-yellow-600/20 dark:bg-yellow-400/10 dark:text-yellow-500 dark:ring-yellow-400/20';
        label = 'New Time';
    } else if (code === 'C') {
        colorClass = 'bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/10 dark:bg-red-400/10 dark:text-red-400 dark:ring-red-400/20';
        label = 'Cancelled';
    } else {
        label = 'On Time';
        colorClass = 'bg-zinc-50 text-zinc-700 ring-1 ring-inset ring-zinc-600/10 dark:bg-zinc-400/10 dark:text-zinc-400 dark:ring-zinc-400/20';
    }

    if (time) {
        const date = new Date(time);
        const timeStr = date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Oslo' });
        label = `${label} ${timeStr}`;
    }

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}`}>
            {label}
        </span>
    );
}
