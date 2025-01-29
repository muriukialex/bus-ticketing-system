const formatDate = (isoString: string) => {
    const date = new Date(isoString);

    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'long' });
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';

    // Convert to 12-hour format
    hours = hours % 12 || 12;

    // Function to add ordinal suffix (st, nd, rd, th)
    const getOrdinal = (n: number) => {
        if (n > 3 && n < 21) return 'th';
        switch (n % 10) {
            case 1:
                return 'st';
            case 2:
                return 'nd';
            case 3:
                return 'rd';
            default:
                return 'th';
        }
    };

    return `${day}${getOrdinal(day)} ${month} ${hours}:${minutes} ${ampm}`;
};

export default formatDate;
