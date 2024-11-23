import { Stack } from "expo-router";
import { View, TextInput, TouchableOpacity, SafeAreaView, StyleSheet, Text } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';

const ZAGREB_COORDINATES = {
    latitude: 45.778117,
    longitude: 15.975612,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
};

const GOOGLE_GEOCODE_API_KEY = "AIzaSyB61C_5DIXDGtSJvZBKYzwGKk3cvK2h-8o"; // Replace with your actual Google API key.

export default function MapScreen() {
    const [events, setEvents] = useState([]);
    const [userLocation, setUserLocation] = useState(null); // Store user's current location
    const [loading, setLoading] = useState(true);

    const getRandomEmoji = () => {
        const emojis = ['🏛️', '📚', '🎭', '🏞️', '🎡', '🎪', '🎤'];
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
            const token = "pats9KvXvBmivlseG.4a3d9b8d286612bfab38436144cfda8ce68ac9d5603a7a7b43a3c0247802c538";
            const apiUrl = "https://api.airtable.com/v0/appE6L6fQPeZ6s8Gt/tblZ6EUAeNxYXP574";

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
                            const coordinates = await geocodeLocation({ street: event.fields.lokacija.split(",")[1], city: "Zagreb" });
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
        }

        fetchData();
        getCurrentLocation(); // Get current location when component mounts
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />

            {/* Search Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton}>
                    <Ionicons name="chevron-back" size={24} color="#000" />
                </TouchableOpacity>
                <View style={styles.searchContainer}>
                    <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
                    <TextInput
                        placeholder="Pronađi događaj"
                        style={styles.searchInput}
                    />
                </View>
            </View>

            {/* Map */}
            {loading ? (
                <Text>Loading...</Text>
            ) : (
                <MapView
                    style={styles.map}
                    initialRegion={ZAGREB_COORDINATES}
                    showsUserLocation={true} // Automatically shows the user's current location (blue dot)
                    followsUserLocation={true} // Follow user movement
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
                            <Text>{getRandomEmoji()}</Text> {/* Display random emoji */}
                        </Marker>
                    ))}

                    {/* User's current location as a blue dot */}
                    {userLocation && (
                        <Marker
                            coordinate={{
                                latitude: userLocation.latitude,
                                longitude: userLocation.longitude,
                            }}
                            title="Your Location"
                        >
                            <Text>📍</Text>
                        </Marker>
                    )}
                </MapView>
            )}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 8,
        paddingBottom: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    backButton: {
        padding: 8,
    },
    searchContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        marginLeft: 8,
        paddingHorizontal: 12,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        padding: 8,
        fontSize: 16,
    },
    map: {
        flex: 1,
    },
});
