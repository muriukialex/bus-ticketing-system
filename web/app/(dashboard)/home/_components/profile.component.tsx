import { Button } from '@/components';
import { UserDetails } from '@/interfaces/user-details.interface';
import Image from 'next/image';

interface ProfileProps {
    userData: UserDetails | null;
    logout: () => void;
}

const Profile = ({ userData, logout }: ProfileProps) => {
    return (
        <div>
            <li className="flex justify-between gap-x-6 py-5">
                <div className="flex min-w-0 gap-x-4">
                    <Image
                        width={80}
                        height={80}
                        className="size-12 flex-none rounded-full bg-gray-50"
                        src="/images/avatar.jpg"
                        alt=""
                    />
                    <div className="min-w-0 flex-auto">
                        <p className="text-sm/6 font-semibold text-gray-900">
                            {userData?.firstName} {userData?.lastName}
                        </p>
                        <p className="text-xs/5 text-gray-500">
                            {userData?.email}
                        </p>
                    </div>
                </div>
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                    <Button type="button" onClick={() => logout()}>
                        Log out
                    </Button>
                </div>
            </li>
        </div>
    );
};

export default Profile;
