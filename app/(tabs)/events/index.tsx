import { router, Stack } from "expo-router";
import {
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Text,
  TextInput,
} from "react-native";
import globalStyles from "../../style";
import styles from "./events.style";
import { IconSymbol, IconSymbolFontAwesome } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";

import EventCardComponent from "./components/eventcard";
export default function EventsScreen() {
  const colorScheme = useColorScheme();

  const [showFilters, setShowFilters] = useState<boolean>(false);

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
  const [skeletonEvents, setSkeletonEvents] = useState<number[]>([
    1, 2, 3, 4, 5, 6,
  ]);

  const [keyword, setKeyword] = useState<string>("");

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
      <SafeAreaView style={[globalStyles.container, { position: "relative" }]}>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
        />
        <View>
          <View>
            <View
              style={[
                globalStyles.dFlex,
                globalStyles.alignItemsCenter,
                globalStyles.justifyContentBetween,
              ]}
            >
              <View>
                <ThemedText
                  style={[globalStyles.pt2, globalStyles.mb2]}
                  type="subtitle"
                >
                  Svi događaji
                </ThemedText>
              </View>
              <View
                style={[
                  globalStyles.dFlex,
                  globalStyles.alignItemsCenter,
                  globalStyles.justifyContentCenter,
                ]}
              >
                <TouchableOpacity>
                  <IconSymbolFontAwesome
                    size={28}
                    name="sort"
                    color={Colors[colorScheme ?? "light"].tint}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[globalStyles.ms2]}
                  onPress={() => setShowFilters(true)}
                >
                  <IconSymbol
                    size={28}
                    name="filter.list"
                    color={Colors[colorScheme ?? "light"].tint}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={[globalStyles.mb1]}>
            <View style={[globalStyles.dFlex, globalStyles.alignItemsCenter]}>
              <View>
                <IconSymbol
                  size={28}
                  name="search"
                  color={Colors[colorScheme ?? "light"].tint}
                />
              </View>
              <View>
                <Text
                  style={[
                    {
                      color: Colors[colorScheme ?? "light"].tintSecondary,
                      fontSize: 30,
                      fontWeight: 100,
                      lineHeight: 30,
                      marginStart: 5,
                    },
                  ]}
                >
                  |
                </Text>
              </View>
              <View>
                <TextInput
                  onChangeText={(text) => setKeyword(text)}
                  placeholder="Pretraži"
                  style={[{ width: 80 }]}
                ></TextInput>
              </View>
            </View>
          </View>
          <ScrollView
            overScrollMode="never"
            showsVerticalScrollIndicator={false}
            alwaysBounceVertical={true}
          >
            <View style={[{ display: "flex" }]}>
              {events.length ? (
                <View>
                  {events.map((event) => {
                    if (event?.fields["skraćeni naziv"].includes(keyword)) {
                      return (
                        <View
                          style={{ padding: 6, marginBottom: 16 }}
                          key={event.id}
                        >
                          <View
                            style={[
                              globalStyles.boxShadow,
                              styles.eventBtn,
                              globalStyles.p1,
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
                    }
                  })}
                </View>
              ) : (
                <View style={[{ display: "flex" }]}>
                  {skeletonEvents.map((event) => {
                    return (
                      <View
                        style={[styles.eventSkeletonCard, { marginBottom: 16 }]}
                        key={event}
                      >
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
                        <View style={[styles.eventSkeletonCardRight]}>
                          <View style={[styles.eventSkeletonCardText]}></View>
                          <View
                            style={[styles.eventSkeletonCardTextSecond]}
                          ></View>
                        </View>
                      </View>
                    );
                  })}
                </View>
              )}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
      {showFilters && (
        <View style={styles.filterScreen}>
          <FilterScreen setShowFilters={setShowFilters} />
        </View>
      )}
    </>
  );
}

function FilterScreen({ setShowFilters }) {
  const colorScheme = useColorScheme();

  return (
    <>
      <SafeAreaView
        style={[styles.filterContainer, { backgroundColor: "white" }]}
      >
        <Stack.Screen
          options={{
            headerShown: false,
          }}
        />
        <View style={globalStyles.container}>
          <View
            style={[
              {
                backgroundColor: "gray",
                width: 40,
                height: 10,
                borderRadius: 10,
                marginHorizontal: "auto",
              },
            ]}
          ></View>
          <View
            style={[
              globalStyles.dFlex,
              globalStyles.alignItemsCenter,
              globalStyles.justifyContentBetween,
              globalStyles.mb2,
            ]}
          >
            <ThemedText type="subtitle">Filteri</ThemedText>
            <TouchableOpacity
              style={[globalStyles.p1]}
              onPress={() => setShowFilters(false)}
            >
              <IconSymbolFontAwesome
                size={20}
                name="close"
                color={Colors[colorScheme ?? "light"].text}
              />
            </TouchableOpacity>
          </View>

          <ScrollView>
            <View>
              <View
                style={[globalStyles.dFlex, globalStyles.justifyContentBetween]}
              >
                <View>
                  <TouchableOpacity
                    style={[
                      {
                        backgroundColor: Colors[colorScheme ?? "light"].tint,
                        padding: 20,
                        borderRadius: 50,
                      },
                    ]}
                  >
                    <IconSymbol
                      size={28}
                      name="music.note"
                      color={Colors[colorScheme ?? "light"].background}
                    />
                  </TouchableOpacity>
                  <ThemedText style={[globalStyles.textCenter]}>
                    Glazba
                  </ThemedText>
                </View>
                <View>
                  <TouchableOpacity
                    style={[
                      {
                        backgroundColor:
                          Colors[colorScheme ?? "light"].background,
                        padding: 20,
                        borderRadius: 50,
                      },
                    ]}
                  >
                    <IconSymbol
                      size={28}
                      name="tehater.comedy"
                      color={Colors[colorScheme ?? "light"].tint}
                    />
                  </TouchableOpacity>
                  <ThemedText style={[globalStyles.textCenter]}>
                    Kazališta
                  </ThemedText>
                </View>
                <View>
                  <TouchableOpacity
                    style={[
                      {
                        backgroundColor: Colors[colorScheme ?? "light"].tint,
                        padding: 20,
                        borderRadius: 50,
                      },
                    ]}
                  >
                    <IconSymbol
                      size={28}
                      name="movie"
                      color={Colors[colorScheme ?? "light"].background}
                    />
                  </TouchableOpacity>
                  <ThemedText style={[globalStyles.textCenter]}>
                    Film
                  </ThemedText>
                </View>
                <View>
                  <TouchableOpacity
                    style={[
                      {
                        backgroundColor:
                          Colors[colorScheme ?? "light"].background,
                        padding: 20,
                        borderRadius: 50,
                      },
                    ]}
                  >
                    <IconSymbol
                      size={28}
                      name="fastfood"
                      color={Colors[colorScheme ?? "light"].tint}
                    />
                  </TouchableOpacity>
                  <ThemedText style={[globalStyles.textCenter]}>
                    Gastro
                  </ThemedText>
                </View>
              </View>
              <View style={[globalStyles.mt2]}>
                <ThemedText type="defaultSemiBold">Datum i vrijeme</ThemedText>
                <View
                  style={[
                    globalStyles.mt1,
                    globalStyles.dFlex,
                    globalStyles.alignItemsCenter,
                  ]}
                >
                  <View
                    style={[
                      globalStyles.px2,
                      globalStyles.py1,
                      {
                        borderWidth: 1,
                        borderColor: "rgba(0,0,0,0.3)",
                        borderRadius: 10,
                      },
                    ]}
                  >
                    <ThemedText style={[{ color: "rgba(0,0,0,0.3)" }]}>
                      Danas
                    </ThemedText>
                  </View>
                  <View
                    style={[
                      globalStyles.px2,
                      globalStyles.mx1,
                      globalStyles.py1,
                      {
                        backgroundColor: Colors[colorScheme ?? "light"].tint,
                        borderRadius: 10,
                      },
                    ]}
                  >
                    <ThemedText style={[{ color: "white" }]}>Sutra</ThemedText>
                  </View>
                  <View
                    style={[
                      globalStyles.px2,
                      globalStyles.py1,
                      {
                        borderWidth: 1,
                        borderColor: "rgba(0,0,0,0.3)",
                        borderRadius: 10,
                      },
                    ]}
                  >
                    <ThemedText style={[{ color: "rgba(0,0,0,0.3)" }]}>
                      Sljedeći tjedan
                    </ThemedText>
                  </View>
                </View>
                <View
                  style={[
                    globalStyles.mt1,
                    globalStyles.px2,
                    globalStyles.py1,
                    {
                      borderWidth: 1,
                      borderColor: "rgba(0,0,0,0.3)",
                      borderRadius: 10,
                    },
                    globalStyles.dFlex,
                    globalStyles.alignItemsCenter,
                    globalStyles.justifyContentCenter,
                  ]}
                >
                  <IconSymbol
                    size={16}
                    name="calendar.today"
                    color={Colors[colorScheme ?? "light"].tint}
                  />
                  <ThemedText
                    style={[{ color: "rgba(0,0,0,0.3)" }, globalStyles.px1]}
                  >
                    Odabir datuma
                  </ThemedText>
                  <IconSymbol
                    size={16}
                    name="arrow.right"
                    color={Colors[colorScheme ?? "light"].tint}
                  />
                </View>
              </View>
              <View style={[globalStyles.mt2]}>
                <ThemedText type="defaultSemiBold">Lokacija</ThemedText>

                <View
                  style={[
                    globalStyles.mt1,
                    globalStyles.px2,
                    globalStyles.py1,
                    {
                      borderWidth: 1,
                      borderColor: "rgba(0,0,0,0.3)",
                      borderRadius: 10,
                    },
                    globalStyles.dFlex,
                    globalStyles.alignItemsCenter,
                    globalStyles.justifyContentCenter,
                  ]}
                >
                  <IconSymbol
                    size={16}
                    name="location.pin"
                    color={Colors[colorScheme ?? "light"].tint}
                  />
                  <ThemedText
                    style={[{ color: "rgba(0,0,0,0.3)" }, globalStyles.px1]}
                  >
                    Novi Zagreb - istok
                  </ThemedText>
                  <IconSymbol
                    size={16}
                    name="arrow.right"
                    color={Colors[colorScheme ?? "light"].tint}
                  />
                </View>
              </View>
              <View style={[globalStyles.mt2]}>
                <ThemedText type="defaultSemiBold">Dob</ThemedText>
                <View
                  style={[
                    globalStyles.mt1,
                    globalStyles.dFlex,
                    globalStyles.alignItemsCenter,
                  ]}
                >
                  <View
                    style={[
                      globalStyles.px2,
                      globalStyles.py1,
                      {
                        borderWidth: 1,
                        borderColor: "rgba(0,0,0,0.3)",
                        borderRadius: 10,
                      },
                    ]}
                  >
                    <ThemedText style={[{ color: "rgba(0,0,0,0.3)" }]}>
                      0-15
                    </ThemedText>
                  </View>
                  <View
                    style={[
                      globalStyles.mx1,
                      globalStyles.px2,
                      globalStyles.py1,
                      {
                        backgroundColor: Colors[colorScheme ?? "light"].tint,
                        borderRadius: 10,
                      },
                    ]}
                  >
                    <ThemedText style={[{ color: "white" }]}>16-29</ThemedText>
                  </View>
                  <View
                    style={[
                      globalStyles.px2,
                      globalStyles.py1,
                      {
                        borderWidth: 1,
                        borderColor: "rgba(0,0,0,0.3)",
                        borderRadius: 10,
                      },
                    ]}
                  >
                    <ThemedText style={[{ color: "rgba(0,0,0,0.3)" }]}>
                      30+
                    </ThemedText>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
}
