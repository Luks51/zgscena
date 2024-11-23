import { Stack } from "expo-router";
import { View, TouchableOpacity } from "react-native";
import globalStyles from "../../style";
import styles from "./onboard.style";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";
export default function OnBoardScreen() {
  const colorScheme = useColorScheme();
  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <View style={[globalStyles.container]}>
        <View>
          <View
            style={[globalStyles.dFlex, globalStyles.justifyContentBetween]}
          >
            <View
              style={[
                styles.headerWrapper,
                { backgroundColor: Colors[colorScheme ?? "light"].tint },
              ]}
            >
              <ThemedText>Trenutna lokacija</ThemedText>
              <ThemedText>Trnje, Zagreb</ThemedText>
            </View>
            <View>
              <IconSymbol
                size={28}
                name="bell"
                color={Colors[colorScheme ?? "light"].tint}
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
