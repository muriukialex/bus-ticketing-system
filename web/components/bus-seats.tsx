export const AvailableSeat = ({
    seat,
    handleSeatSelection,
    booked,
}: {
    seat: string;
    handleSeatSelection: (seat: string) => void;
    booked: boolean;
}) => {
    return (
        <div
            onClick={() => handleSeatSelection(seat)}
            className={`mr-2 mb-2 h-[30px] w-[30px] rounded border border-[#ccc7c7] cursor-pointer 
                flex items-center justify-center text-sm font-bold transition 
                ${
                    booked
                        ? 'bg-indigo-600 text-white cursor-not-allowed'
                        : 'bg-white hover:bg-gray-200'
                }`}></div>
    );
};

export const OccupiedSeat = () => {
    return (
        <div className="mr-2 mb-2 h-[30px] w-[30px] bg-gray-500 rounded border border-[#ccc7c7] cursor-pointer"></div>
    );
};
