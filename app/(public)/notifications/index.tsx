import { Link, Stack, useNavigation } from "expo-router";
import { View, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import globalStyles from "../../style";
import styles from "./notifications.style";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Notifications() {
  const colorScheme = useColorScheme();
  const imageSource1 = require("@/assets/images/notifications/image1.jpeg");
  const imageSource2 = require("@/assets/images/notifications/image2.jpeg");
  const imageSource3 = require("@/assets/images/notifications/image3.png");
  const notifcationMessage =
    "Ne propustite priliku za sudjelovanje u najnovijim aktivnostima!";
  const notifcationMessage2 = "Novi događaj je dostupan u vašoj blizini!";
  const navigation = useNavigation();

  type NotifProps = {
    imageSrc: any;
    notificationMsg: string;
  };

  const Notif = (props: NotifProps) => {
    return (
      <View style={[styles.notificationCardContainer]}>
        <Image
          style={[styles.notificationCardImage]}
          source={props.imageSrc}
        ></Image>
        <ThemedText style={[styles.notificationText]} numberOfLines={3}>
          {props.notificationMsg}
        </ThemedText>
      </View>
    );
  };

  function Header() {
    return (
      <View
        style={[
          { display: "flex", flexDirection: "row", gap: 5, marginBottom: 10 },
        ]}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <IconSymbol
            name="arrow.left"
            color={Colors[colorScheme ?? "light"].text}
          />
        </TouchableOpacity>
        <ThemedText type={"defaultSemiBold"}>Obavijesti</ThemedText>
      </View>
    );
  }

  function NotificationsList() {
    return (
      <View>
        <Notif imageSrc={imageSource1} notificationMsg={notifcationMessage} />
        <Notif imageSrc={imageSource2} notificationMsg={notifcationMessage2} />
      </View>
    );
  }

  return (
    <SafeAreaView
      style={[globalStyles.container, { marginHorizontal: 0, marginBottom: 0 }]}
    >
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <View style={[{ marginHorizontal: 20 }]}>
        <Header />
      </View>

      {/* New Notification with Croatian Text */}
      <View style={styles.notificationCardContainer}>
        <Image
          style={[styles.notificationCardImage]}
          source={imageSource3}
        ></Image>
        <ThemedText style={[styles.notificationText]} numberOfLines={3}>
          Pozivamo vas na događaj temeljen na vašim nedavnim pretraživanjima!
        </ThemedText>
      </View>

      <NotificationsList />
    </SafeAreaView>
  );
}
