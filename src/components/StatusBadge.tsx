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
        colorClass = 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
        label = 'Delayed';
    } else if (code === 'A') {
        colorClass = 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
        label = 'Landed';
    } else if (code === 'D') {
        colorClass = 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
        label = 'Departed';
    } else if (code === 'E') {
        colorClass = 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
        label = 'New Time';
    } else if (code === 'C') {
        colorClass = 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
        label = 'Cancelled';
    } else {
        label = 'On Time';
        colorClass = 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300';
    }

    if (time) {
        const date = new Date(time);
        const timeStr = date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
        label = `${label} ${timeStr}`;
    }

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}`}>
            {label}
        </span>
    );
}
