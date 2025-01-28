import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

export default function AppBackButton({ goBack }: { goBack: () => void }) {
    return (
        <TouchableOpacity onPress={goBack} style={styles.container}>
            <Image
                style={styles.image}
                source={require('../../assets/images/back.png')}
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 10 + getStatusBarHeight(),
        left: 10,
    },
    image: {
        width: 24,
        height: 24,
    },
});
