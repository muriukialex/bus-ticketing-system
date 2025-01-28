'use client';

import { getUserDetails } from '@/api';
import { UserDetails } from '@/interfaces/user-details.interface';
import links from '@/utils/links';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from 'react';
import toast from 'react-hot-toast';

interface DecodedUserInfo {
    sub: string;
    exp: number;
}

interface AuthContextProps {
    isAuthenticated: boolean;
    userData: UserDetails | null;
    loading: boolean;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userData, setUserData] = useState<UserDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const { push } = useRouter();

    const pushToLogin = useCallback(() => {
        push(links.sign_in);
    }, [push]);

    useEffect(() => {
        const authenticateUser = async () => {
            try {
                // Get token from cookies
                const userToken = Cookies.get('X-AUTH-TOKEN');
                console.log('userToken', userToken);
                if (!userToken) {
                    pushToLogin();
                    setLoading(false);
                    return;
                }

                const decodedUserToken: DecodedUserInfo = jwtDecode(userToken);
                const response = await getUserDetails(decodedUserToken.sub);
                const userData = response.data;

                setIsAuthenticated(true);
                setUserData(userData);
                push(links.home);
            } catch {
                toast.error('Unauthorized');
                pushToLogin();
            } finally {
                setLoading(false);
            }
        };

        authenticateUser();
    }, [push, pushToLogin]);

    const logout = () => {
        Cookies.remove('X-AUTH-TOKEN');
        setIsAuthenticated(false);
        setUserData(null);
        pushToLogin();
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                userData,
                loading,
                logout,
            }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
