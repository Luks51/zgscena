import { router, Stack } from "expo-router";
import {
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import globalStyles from "../../style";
import styles from "./events.style";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";

import EventCardComponent from "./components/eventcard";
export default function EventsScreen() {
  const colorScheme = useColorScheme();

  const [categories, setCategories] = useState<
    {
      name: string;
      icon: string;
    }[]
  >([
    {
      name: "Predstava",
      icon: "tehater.comedy",
    },
    {
      name: "Kino",
      icon: "movie",
    },
    {
      name: "Glazba",
      icon: "music.note",
    },
    {
      name: "Gastro",
      icon: "fastfood",
    },
    {
      name: "Sport",
      icon: "sports.soccer",
    },
  ]);

  const [selectedCategorie, setSelectedCategorie] = useState<{
    name: string;
    icon: string;
  }>(categories[0]);

  const [events, setEvents] = useState<any[]>([]);
  const [skeletonEvents, setSkeletonEvents] = useState<number[]>([1, 2, 3]);

  useEffect(() => {
    const fetchData = async () => {
      const token =
        "pats9KvXvBmivlseG.4a3d9b8d286612bfab38436144cfda8ce68ac9d5603a7a7b43a3c0247802c538"; // Replace with your token logic
      const apiUrl =
        "https://api.airtable.com/v0/appE6L6fQPeZ6s8Gt/tblZ6EUAeNxYXP574"; // Replace with your API endpoint

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
        setEvents(result.records);
      } catch (err) {
        console.log("error!");
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <SafeAreaView style={[globalStyles.container]}>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
        />
        <ScrollView
          overScrollMode="never"
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical={true}
        >
          <View>
            <View>
              <ThemedText
                style={[
                  globalStyles.px2,
                  globalStyles.pt2,
                  globalStyles.textCenter,
                  globalStyles.mb2,
                  { color: Colors[colorScheme ?? "light"].tint },
                ]}
                type="subtitle"
              >
                Svi događaji
              </ThemedText>
              <ScrollView
                overScrollMode="never"
                alwaysBounceVertical={true}
                showsVerticalScrollIndicator={false}
              >
                <View
                  style={[
                    {
                      display: "flex",
                    },
                  ]}
                >
                  {events.length ? (
                    <View>
                      {events.map((event) => {
                        return (
                          <View
                            style={{ padding: 6, marginBottom: 16 }}
                            key={event.id}
                          >
                            <View
                              style={[
                                globalStyles.boxShadow,
                                styles.eventBtn,
                                globalStyles.p2,
                                {
                                  backgroundColor:
                                    Colors[colorScheme ?? "light"].background,
                                },
                              ]}
                            >
                              <TouchableOpacity
                                onPress={() =>
                                  router.push(`/(public)/event/${event.id}`)
                                }
                              >
                                <EventCardComponent eventValue={event} />
                              </TouchableOpacity>
                            </View>
                          </View>
                        );
                      })}
                    </View>
                  ) : (
                    <View
                      style={[
                        globalStyles.dFlex,
                        globalStyles.justifyContentCenter,
                        globalStyles.mt2,
                      ]}
                    >
                      {skeletonEvents.map((event) => {
                        return (
                          <View style={[styles.eventSkeletonCard]} key={event}>
                            <View
                              style={[
                                styles.eventSkeletonCardInner,
                                globalStyles.dFlex,
                                globalStyles.alignItemsCenter,
                                globalStyles.justifyContentCenter,
                              ]}
                            >
                              <ActivityIndicator
                                size="large"
                                color="gray"
                              ></ActivityIndicator>
                            </View>
                            <View style={[styles.eventSkeletonCardText]}></View>
                            <View
                              style={[styles.eventSkeletonCardTextSecond]}
                            ></View>
                          </View>
                        );
                      })}
                    </View>
                  )}
                </View>
              </ScrollView>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
