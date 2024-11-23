import { Platform } from "react-native";
import globalStyles from "@/app/style";
import { ThemedText } from "@/components/ThemedText";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { View, Image, useColorScheme } from "react-native";
import { EventModel } from "./../models/home.model";
import styles from "../home.style";

export default function EventCardComponent({
  eventValue,
}: {
  eventValue: EventModel;
    routeId: number;
}) {
  const colorScheme = useColorScheme();
  return (
        <View style={{ padding: 5 }}>
          <View
            style={[
              globalStyles.boxShadow,
              { backgroundColor: Colors[colorScheme ?? "light"].background },
              globalStyles.p2,
              styles.eventCard,
            ]}
          >
            <Image src={eventValue.src} />
            <ThemedText>{eventValue.title}</ThemedText>
            <View style={[globalStyles.dFlex, globalStyles.alignItemsCenter]}>
              <IconSymbol
                size={28}
                name="location.pin"
                color={Colors[colorScheme ?? "light"].text}
              />
              <ThemedText>{eventValue.location}</ThemedText>
            </View>
            <View style={[globalStyles.dFlex, globalStyles.alignItemsCenter]}>
              <IconSymbol
                size={28}
                name="calendar.month"
                color={Colors[colorScheme ?? "light"].text}
              />
              <ThemedText>{String(eventValue.date)}</ThemedText>
            </View>
            <View style={[globalStyles.dFlex, globalStyles.alignItemsCenter]}>
              <IconSymbol
                size={28}
                name="euro"
                color={Colors[colorScheme ?? "light"].text}
              />
              <ThemedText>{eventValue.price}</ThemedText>
            </View>
            <View style={[globalStyles.dFlex, globalStyles.alignItemsCenter]}>
              <IconSymbol
                size={28}
                name="local.fire.department"
                color={Colors[colorScheme ?? "light"].text}
              />
              <ThemedText>{eventValue.numberOfPeoples}</ThemedText>
            </View>
          </View>
        </View>
  );
}
