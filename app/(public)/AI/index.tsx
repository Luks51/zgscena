import { View, TouchableOpacity, Image, TextInput, Animated } from "react-native";
import React, { useState } from "react";
import globalStyles from "../../style";
import styles from "./AI.style";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";
import {Stack, useNavigation} from "expo-router";

export default function Notifications() {
    const colorScheme = useColorScheme();
    const imageSource1 = require("@/assets/images/notifications/image1.jpeg");
    const imageSource2 = require("@/assets/images/notifications/image2.jpeg");
    const imageSource3 = require("@/assets/images/notifications/image3.png");
    const notifcationMessage = "Ne propustite priliku za sudjelovanje u najnovijim aktivnostima!";
    const notifcationMessage2 = "Novi događaj je dostupan u vašoj blizini!";
    const navigation = useNavigation();

    const [bubbleExpanded, setBubbleExpanded] = useState(false);
    const [expandAnim] = useState(new Animated.Value(1));

    const imageSource = imageSource3; // Just one image for this example

    type NotifProps = {
        imageSrc: any;
        notificationMsg: string;
    };

    const Notif = (props: NotifProps) => (
        <View style={styles.notificationCardContainer}>
            <Image style={styles.notificationCardImage} source={props.imageSrc} />
            <ThemedText style={styles.notificationText} numberOfLines={3}>
                {props.notificationMsg}
            </ThemedText>
        </View>
    );

    const Header = () => (
        <View style={{ display: "flex", flexDirection: "row", gap: 5, marginBottom: 10 }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <IconSymbol name="arrow.left" color={Colors[colorScheme ?? "light"].text} />
            </TouchableOpacity>
            <ThemedText type={"defaultSemiBold"}>Mira</ThemedText>
        </View>
    );

    const NotificationsList = () => (
        <View>
            <Notif imageSrc={imageSource1} notificationMsg={notifcationMessage} />
            <Notif imageSrc={imageSource2} notificationMsg={notifcationMessage2} />
        </View>
    );

    const [visible, setVisible] = useState("flex");

    // Animation to expand the bubble
    const handleBubbleClick = () => {
        Animated.spring(expandAnim, {
            toValue: bubbleExpanded ? 1 : 1.5, // Change size when clicked
            friction: 3,
            tension: 40,
            useNativeDriver: true,
        }).start();
        setBubbleExpanded(!bubbleExpanded);
        setVisible("none");
    };

    return (
        <SafeAreaView style={[globalStyles.container, { marginHorizontal: 0, marginBottom: 0 }]}>
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
            />
            <View style={{ marginHorizontal: 20 }}>
                <Header />
            </View>

            <View style={styles.notificationCardContainer}>
                <Image style={styles.notificationCardImage} source={imageSource} />
                <ThemedText style={styles.notificationText} numberOfLines={3}>
                    Pozdrav! Kako mogu pomoći?
                </ThemedText>
            </View>

            <View style={[styles.notificationCardContainer,]}>
                <ThemedText style={[styles.notificationText,  {borderWidth: 1}]} numberOfLines={3}>
                    Preporuči mi događaj!
                </ThemedText>
                <Image style={[styles.notificationCardImage, {borderWidth: 1, justifyContent:'space-between'}]} source={imageSource} />
            </View>

            {/* Floating Bubble with Animation */}
            <TouchableOpacity onPress={handleBubbleClick} style={{ position: "absolute", bottom: 100, left: "50%", transform: [{ translateX: -90 }], display: visible} }>
                <Animated.View
                    style={[
                        styles.bubble,
                        { transform: [{ scale: expandAnim }] }, // Applying scale animation
                    ]}
                >
                    <ThemedText style={{ color: Colors[colorScheme ?? "light"].background }}>
                        Preporući mi događaj
                    </ThemedText>
                </Animated.View>
            </TouchableOpacity>

            {/* Textbox at the very bottom */}
            <View style={{ position: "absolute", bottom: 20, left: 20, right: 20 }}>
                <TextInput
                    style={[styles.chatbox, { backgroundColor: Colors[colorScheme ?? "light"].background, borderColor: Colors[colorScheme ?? "light"].accent, color: Colors[colorScheme ?? "light"].text }]}
                    placeholder="Trenutno nedostupno..."
                    editable={false} // To make it non-editable
                />
            </View>
        </SafeAreaView>
    );
}
