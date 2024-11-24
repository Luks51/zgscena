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
    <View style={[styles.eventCard]}>
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
      <ThemedText numberOfLines={1} type="subtitle" style={[globalStyles.mb1]}>
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
        <IconSymbol
          size={28}
          name="calendar.month"
          color={Colors[colorScheme ?? "light"].tint}
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
          color={Colors[colorScheme ?? "light"].tint}
        />
        {!isNaN(eventValue.fields.cijena) ? (
          <ThemedText style={[globalStyles.ms1]}>
            {parseFloat(eventValue.fields.cijena).toFixed(2)} EUR
          </ThemedText>
        ) : (
          <ThemedText style={[globalStyles.ms1]}>Nepoznato</ThemedText>
        )}
      </View>
      <View style={[globalStyles.dFlex, globalStyles.alignItemsCenter]}>
        <IconSymbol
          size={28}
          name="local.fire.department"
          color={Colors[colorScheme ?? "light"].tint}
        />
        <ThemedText style={[globalStyles.ms1]}>
          {`zainteresirano ${Math.floor(Math.random() * 100)} osoba`}
        </ThemedText>
      </View>
    </View>
  );
}
