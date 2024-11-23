import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import React from "react";
import globalStyles from "../../style";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./event.style";
import {IconSymbol} from "@/components/ui/IconSymbol";
import {Stack, useNavigation, useRouter} from "expo-router";

export default function Event() {
    const colorScheme = useColorScheme();
    const image = require("@/assets/images/placeholder-image.png");
    const router = useRouter();
    const navigation = useNavigation();

    return (
        <>
            <View>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 10 }}>
                    <IconSymbol name="arrow.right" color={Colors[colorScheme ?? "light"].text} />
                </TouchableOpacity>
            </View>
        <SafeAreaView style={styles.container}
        >
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
            />

            {/* Header Image */}
            <Image source={image} style={styles.image} resizeMode="contain" />

            {/* Title */}
            <ThemedText style={[styles.title, { textAlign: "left" }]}>
                MAESTRO I ORKESTAR
                {"\n"}IVAN JOSIP SKENDER, dirigent{"\n"}BORKO PERIĆ, pripovjedač
            </ThemedText>

            {/* Details Section */}
            <View style={styles.detailsContainer}>
                {/* Icon with text (for Adults) */}
                <View style={styles.iconRow}>
                    <View style={[styles.iconBox, { justifyContent: "center", alignItems: "center" }]}>
                        <IconSymbol name="people" color={Colors.light.tint} />
                    </View>
                    <ThemedText style={styles.detailText}>za odrasle</ThemedText>
                </View>

                {/* Icon with text (Date and Time) */}
                <View style={styles.iconRow}>
                    <View style={styles.iconRow}>
                        <View style={[styles.iconBox, { justifyContent: "center", alignItems: "center" }]}>
                            <IconSymbol name="calendar.month" color={Colors.light.tint} />
                        </View>
                        <ThemedText style={styles.detailText}>
                            13. prosinca 2024.{"\n"}Petak, 19:30
                        </ThemedText>
                    </View>
                </View>

                {/* Icon with text (Location) */}
                <View style={styles.iconRow}>
                    {/*<View style={styles.placeholderIcon}></View>*/}
                    {/*<ThemedText style={styles.detailText}>*/}
                    {/*    Zagrebačka filharmonija{"\n"}Trnjanska cesta 3*/}
                    {/*</ThemedText>*/}

                    <View style={styles.iconRow}>
                        <View style={[styles.iconBox, { justifyContent: "center", alignItems: "center" }]}>
                            <IconSymbol name="location.pin" color={Colors.light.tint} />
                        </View>
                        <ThemedText style={styles.detailText}>
                            Zagrebačka filharmonija{"\n"}Trnjanska cesta 3
                        </ThemedText>
                    </View>
                </View>

                {/* Icon with text (Price) */}
                <View style={styles.iconRow}>
                    {/*<View style={styles.placeholderIcon}></View>*/}
                    {/*<ThemedText style={styles.detailText}>BESPLATNO</ThemedText>*/}

                    <View style={styles.iconRow}>
                        <View style={[styles.iconBox, { justifyContent: "center", alignItems: "center" }]}>
                            <IconSymbol name="euro" color={Colors.light.tint} />
                        </View>
                        <ThemedText style={styles.detailText}>
                            BESPLATNO
                        </ThemedText>
                    </View>
                </View>
            </View>

            {/* Description */}
            <ThemedText style={styles.description}>
                Savršen početak ciklusa koncerata FEELharmonija na kojem će se na
                zanimljiv i atraktivan način predstaviti sve dionice orkestra te maestro
                koji tim orkestrom ravna. Kroz ovo predstavljanje najbolje će nas
                provesti ljubitelj klasične glazbe Borko Perić.
            </ThemedText>

            {/* Footer Buttons */}
            <View style={styles.footerContainer}>
                <TouchableOpacity style={styles.footerButton2}>
                    <IconSymbol name="bookmark" color={Colors.light.tint} style={[{padding:0}]}></IconSymbol>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerButton2}>
                    <IconSymbol name="review" color={Colors.light.tint} style={[{padding:0}]}></IconSymbol>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerButton}>
                    <ThemedText style={styles.footerButtonText}>KUPI ULAZNICU</ThemedText>
                    <IconSymbol name={"arrow.right"} color={"white"} style={{ marginLeft: 5, alignSelf: "center" }} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
        </>
    );
}

