import { router, Stack } from "expo-router";
import { View, TouchableOpacity, ScrollView, Image } from "react-native";
import globalStyles from "../../style";
import styles from "./home.style";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { EventModel } from "./models/home.model";
import EventCardComponent from "./components/eventcard";
export default function HomeScreen() {
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

  const imageCardSkeleton = require("@/assets/images/card-skeleton.gif");

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
      <View
        style={[
          styles.headerWrapper,
          globalStyles.px2,
          { backgroundColor: Colors[colorScheme ?? "light"].tint },
        ]}
      >
        <SafeAreaView style={[globalStyles.pb2]}>
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
                  backgroundColor: Colors[colorScheme ?? "light"].tintSecondary,
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
                  { color: Colors[colorScheme ?? "light"].secondaryBackground },
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
              {events.length < 1 ? (
                <View
                  style={[globalStyles.dFlex, globalStyles.alignItemsCenter]}
                >
                  {events.map((event) => {
                    return (
                      <View style={{ paddingLeft: 20 }} key={event.id}>
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
                <View>
                  <Image
                    source={imageCardSkeleton}
                    style={[styles.eventCardImage, globalStyles.mb2]}
                  />
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
                {events.map((event) => {
                  return (
                    <View style={{ paddingLeft: 20 }} key={event.id}>
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
                {events.map((event) => {
                  return (
                    <View style={{ paddingLeft: 20 }} key={event.id}>
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
                {events.map((event) => {
                  return (
                    <View style={{ paddingLeft: 20 }} key={event.id}>
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
            </ScrollView>
          </View>
        </View>
      </ScrollView>
      <SafeAreaView style={[globalStyles.container]}>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
        />
      </SafeAreaView>
    </>
  );
}
