import AppStateContextProvider from '@/context/app-state.context';
import { SnackbarProvider } from '@/context/snackbar.context';
import { theme } from '@/utils/theme';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { PaperProvider } from 'react-native-paper';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded] = useFonts({
        Nunito: require('../assets/fonts/Nunito-Regular.ttf'),
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <PaperProvider theme={theme}>
            <SafeAreaProvider>
                <ThemeProvider value={DefaultTheme}>
                    <SnackbarProvider>
                        <AppStateContextProvider>
                            <Stack>
                                <Stack.Screen
                                    name="(tabs)"
                                    options={{ headerShown: false }}
                                />
                                <Stack.Screen
                                    name="(home)"
                                    options={{ headerShown: false }}
                                />
                                <Stack.Screen
                                    name="sign-in/index"
                                    options={{ headerShown: false }}
                                />
                                <Stack.Screen
                                    name="sign-up/index"
                                    options={{ headerShown: false }}
                                />
                                <Stack.Screen name="+not-found" />
                            </Stack>
                            <StatusBar style="auto" />
                        </AppStateContextProvider>
                    </SnackbarProvider>
                </ThemeProvider>
            </SafeAreaProvider>
        </PaperProvider>
    );
}
