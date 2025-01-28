import { UserDetails } from '@/interfaces/user-details.interface';
import React, { createContext, useState } from 'react';

export const AppStateContext = createContext<{
    userToken: string;
    setUserToken: React.Dispatch<React.SetStateAction<string>>;
    userDetails: UserDetails | null;
    setUserDetails: React.Dispatch<React.SetStateAction<UserDetails | null>>;
}>({
    userToken: '',
    setUserToken: () => true,
    userDetails: null,
    setUserDetails: () => true,
});

const AppStateContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [userToken, setUserToken] = useState<string>('');
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

    const contextValues = {
        userToken,
        setUserToken,
        userDetails,
        setUserDetails,
    };

    return (
        <AppStateContext.Provider value={contextValues}>
            {children}
        </AppStateContext.Provider>
    );
};

export default AppStateContextProvider;
