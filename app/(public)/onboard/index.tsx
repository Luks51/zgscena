import { Stack } from "expo-router";
import { View, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import globalStyles from "../../style";
import styles from "./onboard.style";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
    const colorScheme = useColorScheme();

    const [currentStep, setCurrentStep] = useState(0);

    const steps = [
        {
            title: "Istražite događaje blizu Vas",
            description: "Različite kategorije događaja i filtriranje po interesima",
            image: require("@/assets/images/onboarding/content.png"),
        },
        {
            title: "Pronađite događaje za cijelu obitelj",
            description: "Jednostavno pretraživanje događaja za različite dobne skupine",
            image: require("@/assets/images/onboarding/content.png"),

        },
        {
            title: "Uključite se u lokalnu zajednicu",
            description: "Saznajte o događajima organiziranim u vašoj četvrti",
            image: require("@/assets/images/onboarding/content.png"),

        },
    ];

    const handleNext = () => {
        if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
    };

    const handleSkip = () => {
        setCurrentStep(steps.length - 1);
    };

    return (
        <>
            {/* Top Content */}
            <SafeAreaView style={[globalStyles.container, { marginHorizontal: 0, marginBottom: 0 }]}>
                <Stack.Screen
                    options={{
                        headerShown: false,
                    }}
                />
                <View style={{ flex: 1, justifyContent: "space-between" }}>
                    {/* Image Section */}
                    <View style={[styles.imageWrapper]}>
                        <Image
                            source={steps[currentStep].image}
                            style={styles.image}
                            resizeMode={"contain"}
                        />
                    </View>
                </View>
            </SafeAreaView>

            <SafeAreaView style={[styles.headerWrapper, { backgroundColor: Colors[colorScheme ?? "light"].tint, marginTop: 0 }]}>
                <ThemedText type={"title"} style={[styles.title, { color: Colors[colorScheme ?? "light"].background }]}>
                    {steps[currentStep].title}
                </ThemedText>
                <ThemedText
                    style={[styles.description, { color: Colors[colorScheme ?? "light"].secondaryBackground }]}
                >
                    {steps[currentStep].description}
                </ThemedText>

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

                <View style={[styles.navigationWrapper]}>
                    <TouchableOpacity onPress={handleSkip}>
                        <ThemedText style={styles.navigationButton}>Preskoči</ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleNext}>
                        <ThemedText style={styles.navigationButton}>Dalje</ThemedText>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </>
    );
}
