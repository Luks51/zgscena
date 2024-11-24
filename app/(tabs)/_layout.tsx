import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol, IconSymbolFontAwesome } from "@/components/ui/IconSymbol";
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
        name="events"
        options={{
          title: "Događaji",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="event.note" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: "Karta",
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
            <IconSymbolFontAwesome size={28} name="user" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profil",
          tabBarIcon: ({ color }) => (
            <IconSymbolFontAwesome size={28} name="user" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
