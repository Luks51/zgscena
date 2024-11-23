import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          title: "Istraži",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="explore" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: "Mapa",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="location.pin" color={color} />
          ),
        }}
      />
        <Tabs.Screen
            name="calender"
            options={{
                title: "Profil",
                tabBarIcon: ({ color }) => (
                    <IconSymbol size={28} name="people" color={color} />
                ),
            }}
        />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profil",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="people" color={color} />
          ),
        }}
      />

    </Tabs>
  );
}
