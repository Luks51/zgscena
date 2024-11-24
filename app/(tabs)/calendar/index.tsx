import { View, TextInput, TouchableOpacity, SafeAreaView } from "react-native";
import { Stack } from "expo-router";

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <View>
        <View>
          <View></View>
          <TextInput placeholder="Pretraži"></TextInput>
        </View>
        <View>
          <TouchableOpacity></TouchableOpacity>
        </View>
      </View>
      <View></View>
    </SafeAreaView>
  );
}
