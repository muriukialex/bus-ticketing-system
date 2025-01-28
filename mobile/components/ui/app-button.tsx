import { colors } from '@/constants/colors';
import React from 'react';
import { StyleSheet } from 'react-native';
import { ButtonProps, Button as PaperButton } from 'react-native-paper';

interface AppButtonProps extends ButtonProps {}

export default function AppButton({
    mode,
    style,
    loading,
    ...props
}: AppButtonProps) {
    return (
        <PaperButton
            style={[
                styles.button,
                loading && {
                    backgroundColor: colors.grey,
                },
                style,
            ]}
            labelStyle={styles.text}
            mode={mode}
            loading={loading}
            disabled={loading}
            {...props}
        />
    );
}

const styles = StyleSheet.create({
    button: {
        width: '100%',
        marginVertical: 10,
        paddingVertical: 2,
    },
    text: {
        fontWeight: 'bold',
        fontSize: 15,
        lineHeight: 26,
    },
});
