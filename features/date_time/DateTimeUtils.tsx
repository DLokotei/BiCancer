export function formatDate(value: Date): string {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    const formattedDate: string = value.toLocaleDateString(undefined, options);
    return formattedDate
}