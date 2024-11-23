import { router, Stack } from "expo-router";
import { View, TouchableOpacity, ScrollView } from "react-native";
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

  const [categories, setCategories] = useState<string[]>([
    "Sport",
    "Glazba",
    "Gastro",
    "Predstava",
  ]);

  const [selectedCategorie, setSelectedCategorie] = useState<string>(
    categories[0]
  );

  const [events, setEvents] = useState<any[]>([]);

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
          { backgroundColor: Colors[colorScheme ?? "light"].tint },
        ]}
      >
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
              { backgroundColor: Colors[colorScheme ?? "light"].tintSecondary },
            ]}
          >
            <IconSymbol
              size={28}
              name="notifications.none"
              color={Colors[colorScheme ?? "light"].background}
            />
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
                  key={categorie}
                  style={[
                    globalStyles.me2,
                    styles.categoriesBtn,
                    {
                      backgroundColor:
                        categorie === selectedCategorie
                          ? Colors[colorScheme ?? "light"].accent
                          : "transparent",
                    },
                    { borderWidth: 1 },
                    {
                      borderColor:
                        categorie !== selectedCategorie
                          ? Colors[colorScheme ?? "light"].accent
                          : "transparent",
                    },
                  ]}
                >
                  <ThemedText
                    style={[
                      { color: Colors[colorScheme ?? "light"].background },
                      globalStyles.textCenter,
                    ]}
                  >
                    {categorie}
                  </ThemedText>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>
      <SafeAreaView style={[globalStyles.container]}>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
        />
        <View>
          <View>
            <ThemedText type="subtitle" style={[globalStyles.mb2]}>
              Preporučeno
            </ThemedText>
            <ScrollView
              overScrollMode="never"
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <View style={[globalStyles.dFlex, globalStyles.alignItemsCenter]}>
                {events.map((event) => {
                  return (
                    <View style={{ padding: 5 }}>
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
                          <EventCardComponent
                            key={event.id}
                            eventValue={event}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                })}
              </View>
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
