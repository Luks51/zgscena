import globalStyles from "@/app/style";
import { ThemedText } from "@/components/ThemedText";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { View, Image, useColorScheme } from "react-native";
import styles from "../events.style";

export default function EventCardComponent({
  eventValue,
}: {
  eventValue: any;
}) {
  const colorScheme = useColorScheme();
  const image = require("@/assets/images/placeholder-image.png");

  return (
    <View
      style={[
        styles.eventCard,
        globalStyles.dFlex,
        globalStyles.justifyContentBetween,
        { width: "100%" },
      ]}
    >
      <View style={[{ width: "40%" }]}>
        {eventValue.fields.slika?.length ? (
          <Image
            source={{
              uri: `${eventValue.fields.slika[0].thumbnails.large.url}`,
            }}
            style={[styles.eventCardImage, globalStyles.mb2]}
          />
        ) : (
          <Image
            source={image}
            style={[styles.eventCardImage, globalStyles.mb2]}
          />
        )}
      </View>
      <View style={[{ width: "55%" }]}>
        <ThemedText
          numberOfLines={1}
          type="subtitle"
          style={[globalStyles.mb1]}
        >
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
            color={Colors[colorScheme ?? "light"].tint}
          />
          <ThemedText
            style={[globalStyles.ms1, { lineHeight: 16 }]}
            numberOfLines={2}
          >
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
          <ThemedText style={[globalStyles.ms1]}>
            {`${new Date(
              eventValue.fields["datum i vrijeme početka"]
            ).getDate()}.${
              new Date(
                eventValue.fields["datum i vrijeme početka"]
              ).getMonth() + 1
            }.${new Date(
              eventValue.fields["datum i vrijeme početka"]
            ).getFullYear()}. - ${new Date(
              eventValue.fields["datum i vrijeme početka"]
            ).getHours()}:${
              new Date(
                eventValue.fields["datum i vrijeme početka"]
              ).getMinutes() < 10
                ? "0"
                : ""
            }${
              new Date(
                eventValue.fields["datum i vrijeme početka"]
              ).getMinutes() < 10
                ? "0"
                : ""
            }`}
            {}
          </ThemedText>
        </View>
      </View>
    </View>
  );
}
