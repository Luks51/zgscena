import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Alert,
  Platform,
  Linking,
} from "react-native";
import React, { useEffect, useState } from "react";
import globalStyles from "../../style";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./event.style";
import { IconSymbol } from "@/components/ui/IconSymbol";
import {
  Stack,
  useLocalSearchParams,
  useNavigation,
  useRouter,
} from "expo-router";
import * as Calendar from "expo-calendar";

export default function Event() {
  const { id } = useLocalSearchParams();

  const colorScheme = useColorScheme();
  const router = useRouter();
  const navigation = useNavigation();
  const [event, setEvent] = useState<any>();
  const placeholderImage = require("@/assets/images/placeholder-image.png");
  const startRating = Array.from({ length: 5 }, () =>
    Math.random() < 0.5 ? 1 : 0
  ).sort((a, b) => b - a);
  useEffect(() => {
    const fetchData = async () => {
      const token =
        "pats9KvXvBmivlseG.4a3d9b8d286612bfab38436144cfda8ce68ac9d5603a7a7b43a3c0247802c538"; // Replace with your token logic
      const apiUrl =
        "https://api.airtable.com/v0/appE6L6fQPeZ6s8Gt/tblZ6EUAeNxYXP574/" + id; // Replace with your API endpoint

      console.log(id);

      try {
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: any = await response.json();
        setEvent(result);
        console.log(result);
      } catch (err) {
        console.log("error!");
      }
    };
    fetchData();
  }, []);

  const getEventAges = (groupIds = []) => {
    if (!Array.isArray(groupIds) || groupIds.length === 0) {
      return ["Nepoznato"];
    }

    // Map IDs to age group descriptions
    return groupIds.map((groupId) => {
      switch (groupId) {
        case "recRV3I9wYB0ttyQ5":
          return "djeca (0-15)";
        case "reccIWGYwQV1HLelG":
          return "odrasli (30+)";
        case "recyNhhE1ZGOiKfSU":
          return "mladi (16-29)";
        default:
          return "Nepoznato";
      }
    });
  };

  const handleOpenMaps = () => {
    if (!event?.fields?.lokacija) {
      Alert.alert("Error", "Location not provided.");
      return;
    }

    const encodedLocation = encodeURIComponent(event.fields.lokacija);
    const url = Platform.select({
      ios: `maps://?q=${encodedLocation}`, // Apple Maps
      android: `geo:0,0?q=${encodedLocation}`, // Google Maps
    });

    if (url) {
      Linking.openURL(url).catch((err) =>
        Alert.alert("Error", "Unable to open maps.")
      );
    }
  };

  const handleAddToCalendar = async () => {
    try {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Calendar permissions are required.");
        return;
      }

      const calendars = await Calendar.getCalendarsAsync();
      const defaultCalendar =
        calendars.find((cal) => cal.source?.name === "Default") || calendars[0];

      const calendarId =
        defaultCalendar?.id ||
        (await Calendar.createCalendarAsync({
          title: "Events Calendar",
          color: "blue",
          entityType: Calendar.EntityTypes.EVENT,
          sourceId: defaultCalendar?.source.id,
          source: defaultCalendar?.source,
          accessLevel: Calendar.CalendarAccessLevel.OWNER,
        }));

      const startDate = new Date(event?.fields?.["datum i vrijeme početka"]);
      const endDate = new Date(startDate);
      endDate.setHours(startDate.getHours() + 2);

      await Calendar.createEventAsync(calendarId, {
        title: event?.fields?.["skraćeni naziv"] ?? "Event",
        location: event?.fields?.lokacija ?? "Unknown location",
        startDate,
        endDate,
        timeZone: "GMT+1",
        notes: event?.fields?.opis ?? "",
      });

      Alert.alert("Success", "Event added to your calendar.");
    } catch (error) {
      console.log("Error adding event to calendar:", error);
      Alert.alert("Error", "Failed to add the event to your calendar.");
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <SafeAreaView style={styles.container}>
        <ScrollView
          overScrollMode={"never"}
          showsVerticalScrollIndicator={false}
        >
          <View style={[{ display: "flex", flexDirection: "row", gap: 5 }]}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <IconSymbol
                name="arrow.left"
                color={Colors[colorScheme ?? "light"].text}
              />
            </TouchableOpacity>
            <ThemedText type={"defaultSemiBold"}>Detalji događanja</ThemedText>
          </View>

          {/* Header Image */}
          <Image
            source={
              event?.fields?.slika?.[0]?.thumbnails?.large?.url
                ? { uri: event.fields.slika[0].thumbnails.large.url }
                : placeholderImage
            }
            style={[styles.image, { marginTop: 10 }]}
            resizeMode="cover"
            height={styles.image.height / 2}
            onError={(e) => {
              console.warn("Image loading error:", e.nativeEvent.error);
            }}
          />

          {/* Title */}
          <ThemedText style={[styles.title, { textAlign: "left" }]}>
            {event?.fields?.["skraćeni naziv"] ?? event?.fields?.["puni naziv"]}
          </ThemedText>

          {/* Details Section */}
          <View style={styles.detailsContainer}>
            {/* Icon with text (for Adults) */}
            <View style={styles.iconRow}>
              <View
                style={[
                  styles.iconBox,
                  { justifyContent: "center", alignItems: "center" },
                ]}
              >
                <IconSymbol name="people" color={Colors.light.tint} />
              </View>
              <ThemedText style={styles.detailText}>
                {getEventAges(event?.fields?.["ciljane dobne skupine"])}
              </ThemedText>
            </View>

            {/* Icon with text (Date and Time) */}
            <View style={styles.iconRow}>
              <View
                style={[
                  styles.iconBox,
                  { justifyContent: "center", alignItems: "center" },
                ]}
              >
                <IconSymbol name="calendar.month" color={Colors.light.tint} />
              </View>
              <ThemedText style={styles.detailText}>
                {`${new Date(
                  event?.fields?.["datum i vrijeme početka"]
                ).getDate()}.${
                  new Date(
                    event?.fields?.["datum i vrijeme početka"]
                  ).getMonth() + 1
                }.${new Date(
                  event?.fields?.["datum i vrijeme početka"]
                ).getFullYear()}.`}
              </ThemedText>
            </View>

            {/* Icon with text (Location) */}
            <View style={styles.iconRow}>
              <View
                style={[
                  styles.iconBox,
                  { justifyContent: "center", alignItems: "center" },
                ]}
              >
                <IconSymbol name="location.pin" color={Colors.light.tint} />
              </View>
              <View
                style={[
                  {
                    display: "flex",
                    flexDirection: "column",
                    alignItems: event?.fields?.lokacija
                      ? "flex-start"
                      : "center",
                  },
                ]}
              >
                <ThemedText style={styles.detailText}>
                  {event?.fields?.lokacija?.split(",")[0] ??
                    "Lokacija nije navedena"}
                </ThemedText>
                {event?.fields?.lokacija && (
                  <ThemedText style={[styles.detailText, { fontSize: 12 }]}>
                    {event?.fields?.lokacija?.split(",")[1] ?? ""}
                  </ThemedText>
                )}
              </View>
            </View>

            {/* Icon with text (Price) */}

            <View style={styles.iconRow}>
              <View
                style={[
                  styles.iconBox,
                  { justifyContent: "center", alignItems: "center" },
                ]}
              >
                <IconSymbol name="euro" color={Colors.light.tint} />
              </View>
              <ThemedText style={styles.detailText}>
                {!isNaN(parseFloat(event?.fields?.cijena))
                  ? `${parseFloat(event?.fields?.cijena).toFixed(2)} EUR`
                  : "Nepoznato"}
              </ThemedText>
            </View>
            <View style={styles.iconRow}>
              <View
                style={[
                  styles.iconBox,
                  { justifyContent: "center", alignItems: "center" },
                ]}
              >
                <IconSymbol name="review" color={Colors.light.tint} />
              </View>
              <ThemedText style={styles.detailText}>
                {startRating.map((isFilled, index) => (
                  <IconSymbol
                    key={index}
                    name={isFilled ? "star.fill" : "star.empty"}
                    color={Colors.light.tint}
                  />
                ))}
              </ThemedText>
            </View>
          </View>

          {/* Description */}
          <ThemedText type="subtitle" style={[globalStyles.mb1]}>
            Opis
          </ThemedText>
          <ThemedText style={styles.description}>
            {event?.fields?.opis}
          </ThemedText>

          {/* Footer Buttons */}
          <View
            style={[globalStyles.dFlex, globalStyles.justifyContentBetween]}
          >
            <View style={[globalStyles.dFlex, globalStyles.me1]}>
              <TouchableOpacity
                style={[styles.footerButton2, globalStyles.me1]}
              >
                <IconSymbol
                  name="bookmark"
                  color={Colors.light.tint}
                  style={[{ padding: 0 }]}
                ></IconSymbol>
              </TouchableOpacity>
              <TouchableOpacity style={styles.footerButton2}>
                <IconSymbol
                  name="review"
                  color={Colors.light.tint}
                  style={[{ padding: 0 }]}
                ></IconSymbol>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={[styles.footerButton, { flex: 1 }]}>
              <View
                style={[globalStyles.dFlex, globalStyles.justifyContentCenter]}
              >
                <ThemedText style={[styles.footerButtonText]}>
                  KUPI ULAZNICU
                </ThemedText>
                <IconSymbol
                  name={"chevron.right"}
                  color={"white"}
                  style={{ marginLeft: 5 }}
                />
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
