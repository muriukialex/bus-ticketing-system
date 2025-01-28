import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import AppTabs from '@/constants/app-tabs';
import { colors } from '@/constants/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarInactiveTintColor: colors.grey,
                tabBarActiveTintColor: colors.yellow,
                headerShown: false,
                tabBarStyle: Platform.select({
                    ios: {
                        // Use a transparent background on iOS to show the blur effect
                        position: 'absolute',
                    },
                    default: {},
                }),
            }}>
            {AppTabs.map(tab => (
                <Tabs.Screen
                    name={tab.name}
                    key={tab.name}
                    options={{
                        title: tab.options.title,
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons
                                name={tab.options.tabBarIconName}
                                size={28}
                                color={color}
                            />
                        ),
                    }}
                />
            ))}
        </Tabs>
    );
}
