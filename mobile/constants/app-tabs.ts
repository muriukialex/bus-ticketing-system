import { colors } from './colors';

interface AppTabsProps {
    name: string;
    options: {
        title: string;
        tabBarIconName: any;
        iconColor: string;
    };
}

const AppTabs: AppTabsProps[] = [
    // Home
    {
        name: 'index',
        options: {
            title: 'Home',
            tabBarIconName: 'home',
            iconColor: colors.yellow,
        },
    },
    // Bookings
    {
        name: 'bookings',
        options: {
            title: 'Bookings',
            tabBarIconName: 'bed-empty',
            iconColor: colors.yellow,
        },
    },
];

export default AppTabs;
