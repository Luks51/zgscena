import { Link, Stack } from "expo-router";
import { View, TouchableOpacity, Image, Animated, Easing, Dimensions } from "react-native";
import React, { useState, useRef } from "react";
import globalStyles from "../../style";
import styles from "./onboard.style";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
    const colorScheme = useColorScheme();
    const [currentStep, setCurrentStep] = useState(0);
    const translateX = useRef(new Animated.Value(0)).current; // For animation

    const steps = [
        {
            title: "Otkrij bogatstvo Zagreba!",
            description: "Izložbe, koncerti, kazališta, festivali – sve na dohvat ruke!",
            image: require("@/assets/images/onboarding/onboard1.png"),
        },
        {
            title: "Personaliziraj svoje iskustvo!",
            description: "Odaberi svoje interese i primaj obavijesti o događajima koji su stvoreni za tebe.",
            image: require("@/assets/images/onboarding/onboard2.png"),
        },
    ];

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            Animated.timing(translateX, {
                toValue: -width, // Move to the width of the screen
                duration: 500,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true,
            }).start(() => setCurrentStep(currentStep + 1));
        }
    };

    const handleSkip = () => {
        Animated.timing(translateX, {
            toValue: -width * (steps.length - 1),
            duration: 500,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
        }).start(() => setCurrentStep(steps.length - 1));
    };

    return (
        <>
            {/* Top Content */}
            <SafeAreaView style={[globalStyles.container, { marginHorizontal: 0, marginBottom: -50 , marginVertical: 0}]}>
                <Stack.Screen
                    options={{
                        headerShown: false,
                    }}
                />
                <View style={{ flex: 1, overflow: "hidden" }}>
                    {/* Image Section */}
                    <Animated.View
                        style={{
                            flexDirection: "row",
                            transform: [{ translateX }],
                            width: width * steps.length, // Total width for all images
                        }}
                    >
                        {steps.map((step, index) => (
                            <Image
                                key={index}
                                source={step.image}
                                style={{
                                    width,
                                    // height: 300,
                                    resizeMode: "contain",
                                }}
                            />
                        ))}
                    </Animated.View>
                </View>
            </SafeAreaView>

            {/* Steps and Navigation */}
            <SafeAreaView
                style={[
                    styles.headerWrapper,
                    { backgroundColor: Colors[colorScheme ?? "light"].tint },

                ]}
            >
                <ThemedText
                    type={"title"}
                    style={[styles.title, { color: Colors[colorScheme ?? "light"].background }]}
                >
                    {steps[currentStep].title}
                </ThemedText>
                <ThemedText
                    style={[
                        styles.description,
                        { color: Colors[colorScheme ?? "light"].secondaryBackground },
                    ]}
                >
                    {steps[currentStep].description}
                </ThemedText>

                {/* Dots */}
                <View style={[styles.dotWrapper]}>
                    {steps.map((_, index) => (
                        <View
                            key={index}
                            style={[
                                styles.dot,
                                currentStep === index ? styles.activeDot : styles.inactiveDot,
                            ]}
                        />
                    ))}
                </View>

                {/* Navigation Buttons */}
                <View style={[styles.navigationWrapper]}>
                    <Link href={"/(tabs)/home"}>
                        <ThemedText style={styles.navigationButton}>Preskoči</ThemedText>
                    </Link>
                    {currentStep === steps.length - 1 ? (
                        <Link href={"/(tabs)/home"}>
                            <ThemedText style={styles.navigationButton}>Dalje</ThemedText>
                        </Link>
                    ) : (
                        <TouchableOpacity onPress={handleNext}>
                            <ThemedText style={styles.navigationButton}>Dalje</ThemedText>
                        </TouchableOpacity>
                    )}
                </View>
            </SafeAreaView>
        </>
    );
}
