// utils/timeUtils.js
export function formatTimestamp(timestamp: string) {
    if (!timestamp) return '';

    // Remove microseconds if present (last 3 digits after dot)
    const cleanTimestamp = timestamp.split('.')[0];

    // Create a Date object from the string
    const date = new Date(cleanTimestamp.replace(' ', 'T') + 'Z');
    // 'Z' to treat it as UTC


    // Format time as HH:mm:ss
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const seconds = date.getUTCSeconds().toString().padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
}
