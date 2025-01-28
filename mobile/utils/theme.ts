import { colors } from '@/constants/colors';
import { MD2LightTheme } from 'react-native-paper';

export const theme = {
    ...MD2LightTheme,
    roundness: 5,
    colors: {
        ...MD2LightTheme.colors,
        primary: colors.yellow,
        accent: colors.yellow,
        background: colors.white,
        surface: colors.white,
        disabled: colors.grey,
        text: colors.black,
        secondary: colors.grey,
        error: colors.red,
        placeholder: colors.grey,
        backdrop: colors.white,
        notification: colors.red,
    },
};
