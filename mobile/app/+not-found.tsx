import { Stack } from 'expo-router';
import React from 'react';
import { Text } from 'react-native-paper';

export default function NotFoundScreen() {
    return (
        <>
            <Stack.Screen options={{ title: 'Oops!' }} />
            <Text>Not found</Text>
        </>
    );
}
