import {View, Text, TouchableOpacity, StyleSheet, Image} from "react-native";
import { IconSymbol } from "@/components/ui/IconSymbol"; // Assuming IconSymbol is your icon component
import { LinearGradient } from "expo-linear-gradient"; // Import LinearGradient from expo-linear-gradient
import React, { useState } from "react";
import {Stack} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";
import {Colors} from "@/constants/Colors";
import {ThemedText} from "@/components/ThemedText";

export default function ProfileScreen() {
    const userName = "Mihael";
    const colorScheme = "light"; // Replace with your color scheme hook if necessary
    const editProfile = "Uredi Profil";
    const ProfileTitle = "Profil";

    const [categories, setCategories] = useState([
        {
            name: "Predstava",
            gradientFrom: "#7f00ff",
            gradientTo: "#ff0080",
        },
        {
            name: "Kino",
            gradientFrom: "#00bfff",
            gradientTo: "#1e90ff",
        },
        {
            name: "Glazba",
            gradientFrom: "#00ff00",
            gradientTo: "#32cd32",
        },
        {
            name: "Gastro",
            gradientFrom: "#ff6347",
            gradientTo: "#ff4500",
        },
        {
            name: "Sport",
            gradientFrom: "#ff1493",
            gradientTo: "#ff6347",
        },
    ]);

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
            />

            {/* Header */}
            <View style={styles.header}>
                <ThemedText type={"defaultSemiBold"}>
                    Profil
                </ThemedText>
                <View style={styles.headerIcons}>
                    <IconSymbol name="settings" color="#333" />
                    <IconSymbol name="question" color="#333" />
                </View>
            </View>

            {/* Profile Intro */}
            <View style={styles.profileIntro}>
                <Image
                    source={require("@/assets/images/notifimage.png")}
                    style={{ width: 120, height: 120, borderRadius: 100000 }}
                />
                <Text style={styles.userName}>{userName}</Text>
                <TouchableOpacity style={styles.editProfileButton}>
                    <IconSymbol name="edit" size={15} color="#016EB2" />
                    <Text style={styles.editProfileText}>{editProfile}</Text>
                </TouchableOpacity>
            </View>

            {/* Interests */}
            <View style={[styles.interests, { backgroundColor: '#e0e0e0' }]}>
                <View style={[{flexDirection: "row", alignItems: 'center', justifyContent:"space-between"}]}>
                    <Text style={styles.interestsText}>Interesi</Text>
                    {/* PROMIJENI Button */}
                    <TouchableOpacity style={styles.changeButton}>
                        <IconSymbol name="edit" size={15} color="#171766" />
                        <Text style={styles.changeButtonText}>PROMIJENI</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.categoriesContainer}>
                    {categories.map((category, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.categoryButtonWrapper}
                        >
                            <LinearGradient
                                colors={[category.gradientFrom, category.gradientTo]}
                                style={[
                                    styles.categoryButton,
                                    {
                                        shadowColor: "#000",
                                        shadowOffset: { width: 0, height: 4 },
                                        shadowOpacity: 0.7,
                                        shadowRadius: 8,
                                        elevation: 8, // For Android shadow effect
                                    },
                                ]}
                            >
                                <Text style={styles.categoryText}>{category.name}</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>


        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        paddingHorizontal: 20,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingBottom: 20,
    },
    headerText: {
        fontSize: 24,
        fontWeight: "bold",
    },
    headerIcons: {
        flexDirection: "row",
        alignItems: "center",
    },
    profileIntro: {
        alignItems: "center",
        marginBottom: 20,
    },
    userName: {
        fontSize: 22,
        fontWeight: "600",
        marginVertical: 10,
    },
    editProfileButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        padding: 10,
        borderRadius: 8,
        borderWidth: 1,
    },
    editProfileText: {
        marginLeft: 10,
        fontSize: 14,
        color: "#016EB2",
    },
    interests: {
        marginTop: 20,
        padding: 10,
        borderRadius: 10,
    },
    interestsText: {
        fontSize: 18,
        // paddingTop: 10,
    },
    categoriesContainer: {
        gap: 5,
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 10,
    },
    categoryButtonWrapper: {
        paddingHorizontal: 5,
        paddingVertical: 5,
        borderRadius: 50,
        overflow: "hidden",
    },
    categoryButton: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 5,
        borderRadius: 10,
    },
    categoryText: {
        fontSize: 14,
        color: "#fff",
    },
    changeButton: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 2,
        paddingHorizontal: 5,
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: "#f5f5f5",

    },
    changeButtonText: {
        marginLeft: 10,
        color: "#171766",
        fontSize: 10,
        fontWeight: "600",
    },
});
