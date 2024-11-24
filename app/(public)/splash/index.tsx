import { View, Animated, Easing } from "react-native";
import React, { useEffect, useRef } from "react";
import {Stack, useRouter} from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function SplashScreen() {
    const colorScheme = useColorScheme();
    const fadeAnim = useRef(new Animated.Value(1)).current; // For fade animation
    const router = useRouter();

    useEffect(() => {
        // Start the fade-out animation
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 1000, // Fade-out duration (1 second)
            delay: 2000, // Keep visible for 2 seconds
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
        }).start();

        // Navigate to the onboarding page after 3 seconds
        const timer = setTimeout(() => {
            router.replace("/onboard"); // Replace to avoid going back to the splash screen
        }, 3000);

        return () => clearTimeout(timer); // Clear timeout if the component unmounts
    }, [router, fadeAnim]);

    return (
        <Animated.View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: Colors[colorScheme ?? "light"].background,
                opacity: fadeAnim, // Bind opacity to the fade animation
                marginTop:1
            }}
        >
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
            />
            <ThemedText
                type={"title"}
                style={{
                    fontSize: 36,
                    color: Colors[colorScheme ?? "light"].primary,
                    textAlign: "center",
                }}
            >
                ZG Scena
            </ThemedText>
        </Animated.View>
    );
}
