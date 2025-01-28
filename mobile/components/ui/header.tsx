import { theme } from '@/utils/theme';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

export default function Header(props: any) {
    return (
        <View style={styles.textCenter}>
            <Text style={styles.header} {...props} />
        </View>
    );
}

const styles = StyleSheet.create({
    textCenter: {
        display: 'flex',
        justifyContent: 'center',
    },
    header: {
        fontSize: 21,
        color: theme.colors.primary,
        fontWeight: 'bold',
        paddingVertical: 12,
    },
});
