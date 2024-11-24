import { router, Stack } from "expo-router";
import {
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import globalStyles from "../../style";
import styles from "./home.style";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";

import EventCardComponent from "./components/eventcard";
import { LinearGradient } from "expo-linear-gradient";
export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const { width } = Dimensions.get("window");

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
      <LinearGradient
        colors={[Colors[colorScheme ?? "light"].tint, "#4da5db"]}
        style={[styles.headerWrapper, globalStyles.px2]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <View>
          <SafeAreaView style={[globalStyles.pb2]}>
            <Stack.Screen
              options={{
                headerShown: false,
              }}
            />
            <View
              style={[
                globalStyles.dFlex,
                globalStyles.justifyContentBetween,
                globalStyles.alignItemsCenter,
                globalStyles.mb3,
              ]}
            >
              <View
                style={[
                  styles.bellIcon,
                  {
                    backgroundColor:
                      Colors[colorScheme ?? "light"].tintSecondary,
                  },
                ]}
              >
                <IconSymbol
                  size={28}
                  name="notifications.none"
                  color={Colors[colorScheme ?? "light"].background}
                />
                <View style={[styles.bellPoint]}></View>
              </View>
              <View>
                <ThemedText
                  style={[
                    {
                      color: Colors[colorScheme ?? "light"].secondaryBackground,
                    },
                    globalStyles.textCenter,
                  ]}
                >
                  Trenutna lokacija
                </ThemedText>
                <ThemedText
                  style={[
                    { color: Colors[colorScheme ?? "light"].background },
                    globalStyles.textCenter,
                  ]}
                >
                  Trnje, Zagreb
                </ThemedText>
              </View>
              <View>
                <IconSymbol
                  size={28}
                  name="search"
                  color={Colors[colorScheme ?? "light"].background}
                />
              </View>
            </View>
            <ScrollView
              overScrollMode="never"
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <View style={[globalStyles.dFlex, globalStyles.alignItemsCenter]}>
                {categories.map((categorie) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        setSelectedCategorie(categorie);
                      }}
                      key={categorie.name}
                      style={[
                        globalStyles.me2,
                        styles.categoriesBtn,
                        globalStyles.dFlex,
                        globalStyles.alignItemsCenter,
                        {
                          backgroundColor:
                            categorie === selectedCategorie
                              ? Colors[colorScheme ?? "light"].accent
                              : "transparent",
                        },
                        { borderWidth: 1 },
                        {
                          borderColor:
                            categorie.name !== selectedCategorie.name
                              ? Colors[colorScheme ?? "light"].accent
                              : "transparent",
                        },
                      ]}
                    >
                      <IconSymbol
                        size={20}
                        name={categorie.icon}
                        color={
                          categorie.name !== selectedCategorie.name
                            ? Colors[colorScheme ?? "light"].accent
                            : Colors[colorScheme ?? "light"].background
                        }
                        style={[globalStyles.me1]}
                      />
                      <ThemedText
                        style={[
                          {
                            color:
                              categorie.name !== selectedCategorie.name
                                ? Colors[colorScheme ?? "light"].accent
                                : Colors[colorScheme ?? "light"].background,
                          },
                          globalStyles.textCenter,
                        ]}
                      >
                        {categorie.name}
                      </ThemedText>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>
          </SafeAreaView>
        </View>
      </LinearGradient>
      <ScrollView
        overScrollMode="never"
        showsVerticalScrollIndicator={false}
        alwaysBounceVertical={true}
      >
        <View>
          <View>
            <ThemedText
              style={[globalStyles.px2, globalStyles.pt2]}
              type="subtitle"
            >
              Preporučeno
            </ThemedText>
            <ScrollView
              overScrollMode="never"
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {events.length ? (
                <View
                  style={[globalStyles.dFlex, globalStyles.alignItemsCenter]}
                >
                  {events.map((event) => {
                    return (
                      <View
                        style={{ padding: 10, paddingLeft: 20 }}
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
            </ScrollView>
          </View>
        </View>
        <View>
          <View>
            <ThemedText
              style={[globalStyles.px2, globalStyles.pt2]}
              type="subtitle"
            >
              Popularni
            </ThemedText>
            <ScrollView
              overScrollMode="never"
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <View style={[globalStyles.dFlex, globalStyles.alignItemsCenter]}>
                {events.length ? (
                  <View
                    style={[globalStyles.dFlex, globalStyles.alignItemsCenter]}
                  >
                    {events.map((event) => {
                      return (
                        <View
                          style={{ padding: 10, paddingLeft: 20 }}
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
        <View>
          <View>
            <ThemedText
              style={[globalStyles.px2, globalStyles.pt2]}
              type="subtitle"
            >
              Nadolazeći
            </ThemedText>
            <ScrollView
              overScrollMode="never"
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <View style={[globalStyles.dFlex, globalStyles.alignItemsCenter]}>
                {events.length ? (
                  <View
                    style={[globalStyles.dFlex, globalStyles.alignItemsCenter]}
                  >
                    {events.map((event) => {
                      return (
                        <View
                          style={{ padding: 10, paddingLeft: 20 }}
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
        <View>
          <View>
            <ThemedText
              style={[globalStyles.px2, globalStyles.pt2]}
              type="subtitle"
            >
              U blizni
            </ThemedText>
            <ScrollView
              overScrollMode="never"
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <View style={[globalStyles.dFlex, globalStyles.alignItemsCenter]}>
                {events.length ? (
                  <View
                    style={[globalStyles.dFlex, globalStyles.alignItemsCenter]}
                  >
                    {events.map((event) => {
                      return (
                        <View
                          style={{ padding: 10, paddingLeft: 20 }}
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
    </>
  );
}
