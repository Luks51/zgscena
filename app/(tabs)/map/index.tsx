import { Stack } from "expo-router";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import globalStyles from "@/app/style";

const ZAGREB_COORDINATES = {
  latitude: 45.778117,
  longitude: 15.975612,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const GOOGLE_GEOCODE_API_KEY = "AIzaSyB61C_5DIXDGtSJvZBKYzwGKk3cvK2h-8o"; // Replace with your actual Google API key.

export default function MapScreen() {
  const [events, setEvents] = useState([]);
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  }>({
    latitude: 0,
    longitude: 0,
  }); // Store user's current location
  const [loading, setLoading] = useState(true);

  const getRandomEmoji = () => {
    const emojis = ["🏛️", "📚", "🎭", "🏞️", "🎡", "🎪", "🎤"];
    return emojis[Math.floor(Math.random() * emojis.length)];
  };

  const geocodeLocation = async (location: any) => {
    const { street, city } = location;
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${street},+${city}&key=${GOOGLE_GEOCODE_API_KEY}`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.status === "OK" && data.results.length > 0) {
        return {
          latitude: data.results[0].geometry.location.lat,
          longitude: data.results[0].geometry.location.lng,
        };
      } else {
        throw new Error("No results found");
      }
    } catch (error) {
      console.error("Error geocoding location:", error);
      return null;
    }
  };

  const getCurrentLocation = () => {
    setUserLocation({
      latitude: 45.778117,
      longitude: 15.975612,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const token =
        "pats9KvXvBmivlseG.4a3d9b8d286612bfab38436144cfda8ce68ac9d5603a7a7b43a3c0247802c538";
      const apiUrl =
        "https://api.airtable.com/v0/appE6L6fQPeZ6s8Gt/tblZ6EUAeNxYXP574";

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

        const result = await response.json();

        const eventsWithCoordinates = await Promise.all(
          result.records.map(async (event) => {
            let { latitude, longitude } = event.fields;

            if (event.fields.lokacija && (!latitude || !longitude)) {
              const coordinates = await geocodeLocation({
                street: event.fields.lokacija.split(",")[1],
                city: "Zagreb",
              });
              latitude = coordinates.latitude;
              longitude = coordinates.longitude;
            }

            return {
              ...event,
              fields: {
                ...event.fields,
                latitude,
                longitude,
              },
            };
          })
        );

        setEvents(eventsWithCoordinates);
      } catch (err) {
        console.log("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleShowDirections = () => {
    console.log("Show Directions");
  };

  return (
    <View style={[styles.container]}>
      <Stack.Screen options={{ headerShown: false }} />
      {/* Map */}
      <MapView
        style={[StyleSheet.absoluteFill, { zIndex: 20 }]}
        initialRegion={ZAGREB_COORDINATES}
        showsUserLocation={true}
      >
        {events.map((event, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: event.fields.latitude,
              longitude: event.fields.longitude,
            }}
            title={event.fields.name}
            description={event.fields.description}
          >
            <Text>{getRandomEmoji()}</Text>
          </Marker>
        ))}
      </MapView>
      <SafeAreaView style={{ zIndex: 30 }}>
        <View style={[{ flex: 1, zIndex: 30 }, globalStyles.mt1]}>
          {/* Header */}
          <View style={styles.headerWrapper}>
            <View style={styles.header}>
              <Ionicons
                name="search"
                size={20}
                color="#666"
                style={styles.searchIcon}
              />
              <TextInput
                placeholder="Pronađi događaj"
                style={styles.searchInput}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
      <View
        style={[
          { position: "absolute", bottom: 0, right: 0 },
          { zIndex: 30 },
          globalStyles.me2,
          globalStyles.mb2,
        ]}
      >
        <TouchableOpacity
          style={[
            styles.currentLocationButton,
            styles.floatingButton,
            { zIndex: 26 },
            globalStyles.mb2,
          ]}
          onPress={getCurrentLocation}
        >
          <Ionicons name="locate" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.directionsButton,
            styles.floatingButton,
            { zIndex: 26 },
          ]}
          onPress={handleShowDirections}
        >
          <Ionicons name="navigate" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      {/* Floating Buttons */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  map: {
    flex: 1,
  },
  headerWrapper: {
    top: 0,
    left: 0,
    right: 0,
    alignItems: "center", // Center the header
    position: "absolute",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    width: "90%", // Adjust width
    elevation: 4, // Add shadow for better visibility
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  floatingButton: {
    backgroundColor: Colors.light.tint,
    borderRadius: 10,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
