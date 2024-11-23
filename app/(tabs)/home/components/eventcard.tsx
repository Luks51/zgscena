import { Platform, TouchableOpacity } from "react-native";
import globalStyles from "@/app/style";
import { ThemedText } from "@/components/ThemedText";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { View, Image, useColorScheme } from "react-native";
import { EventModel } from "./../models/home.model";
import styles from "../home.style";
import { useEffect } from "react";
import { navigate } from "expo-router/build/global-state/routing";
import { router } from "expo-router";

export default function EventCardComponent({
  eventValue,
}: {
  eventValue: any;
}) {
  const colorScheme = useColorScheme();
  // useEffect(() => {
  //   if (eventValue.fields.slika?.length) {
  //     console.log(eventValue.fields.slika[0].thumbnails.small.url);
  //   }
  // }, [eventValue]);

  return (
    <View style={[styles.eventCard]}>
      {eventValue.fields.slika?.length ? (
        <Image
          source={{
            uri: `${eventValue.fields.slika[0].thumbnails.large.url}`,
          }}
          style={[styles.eventCardImage, globalStyles.mb2]}
        />
      ) : null}
      <ThemedText type="subtitle" style={[globalStyles.mb2]}>
        {eventValue.fields["skraćeni naziv"]}
      </ThemedText>
      <View
        style={[
          globalStyles.dFlex,
          globalStyles.alignItemsCenter,
          globalStyles.mb1,
        ]}
      >
        <IconSymbol
          size={28}
          name="location.pin"
          color={Colors[colorScheme ?? "light"].text}
        />
        <ThemedText style={[globalStyles.ms1]}>
          {eventValue.fields.lokacija
            ? `${eventValue.fields.lokacija}`
            : "Lokacija nije navedena"}
        </ThemedText>
      </View>
      <View
        style={[
          globalStyles.dFlex,
          globalStyles.alignItemsCenter,
          globalStyles.mb1,
        ]}
      >
        <IconSymbol
          size={28}
          name="calendar.month"
          color={Colors[colorScheme ?? "light"].text}
        />
        <ThemedText style={[globalStyles.ms1]}>
          {`${new Date(
            eventValue.fields["datum i vrijeme početka"]
          ).getDate()}.${
            new Date(eventValue.fields["datum i vrijeme početka"]).getMonth() +
            1
          }.${new Date(
            eventValue.fields["datum i vrijeme početka"]
          ).getFullYear()}.`}
          {}
        </ThemedText>
      </View>
      <View
        style={[
          globalStyles.dFlex,
          globalStyles.alignItemsCenter,
          globalStyles.mb1,
        ]}
      >
        <IconSymbol
          size={28}
          name="euro"
          color={Colors[colorScheme ?? "light"].text}
        />
        <ThemedText style={[globalStyles.ms1]}>
          {parseFloat(eventValue.fields.cijena).toFixed(2)} EUR
        </ThemedText>
      </View>
      <View style={[globalStyles.dFlex, globalStyles.alignItemsCenter]}>
        <IconSymbol
          size={28}
          name="local.fire.department"
          color={Colors[colorScheme ?? "light"].text}
        />
        <ThemedText style={[globalStyles.ms1]}>{30}</ThemedText>
      </View>
    </View>
  );
}
