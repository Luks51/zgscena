import { Stack } from "expo-router";
import { View, TouchableOpacity, ScrollView } from "react-native";
import globalStyles from "../../style";
import styles from "./home.style";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
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

  const [categorieColors, setCategorieColors] = useState<string[]>([
    "#F0635A",
    "#F59762",
    "#29D697",
    "#46CDFB",
  ]);

  const [events, setEvent] = useState<EventModel[]>([
    {
      title: "Božićna želja",
      src: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fimperiallawoffice.com%2Fblog%2Fsanta-claus&psig=AOvVaw3HyxJmNWaeSEM_dAO49Bl6&ust=1732415046336000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCJifxZmz8YkDFQAAAAAdAAAAABAE",
      location: "Gradsko kazalište Žar ptica",
      date: new Date(),
      price: 30,
      numberOfPeoples: 60,
    },
    {
      title: "Božićna želja",
      src: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fimperiallawoffice.com%2Fblog%2Fsanta-claus&psig=AOvVaw3HyxJmNWaeSEM_dAO49Bl6&ust=1732415046336000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCJifxZmz8YkDFQAAAAAdAAAAABAE",
      location: "Gradsko kazalište Žar ptica",
      date: new Date(),
      price: 30,
      numberOfPeoples: 60,
    },
  ]);

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
          <View>
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
                    globalStyles.mx2,
                    styles.categoriesBtn,
                    {
                      backgroundColor:
                        categorieColors[
                          Math.floor(Math.random() * categorieColors.length)
                        ],
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
                  return <EventCardComponent eventValue={event} />;
                })}
              </View>
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
