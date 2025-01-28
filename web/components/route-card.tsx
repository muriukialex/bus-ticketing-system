import Link from 'next/link';
import { FaBusAlt } from 'react-icons/fa';

interface RouteCardProps {
    origin: string;
    destination: string;
    distance: string;
}

const RouteCard = ({ origin, destination, distance }: RouteCardProps) => {
    return (
        <Link
            href={{
                pathname: '/book-bus',
                query: { origin, destination },
            }}
            className="max-w-sm rounded overflow-hidden shadow-lg my-8 cursor-pointer">
            <div className="flex items-center justify-between transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110">
                <div className="py-4">
                    <div className="font-bold text-xl mb-2">
                        {origin} to {destination}
                    </div>
                    <p className="text-gray-700 text-base">
                        Total distance: {distance} kms
                    </p>
                </div>
                <div>
                    <FaBusAlt />
                </div>
            </div>
        </Link>
    );
};

export default RouteCard;
