import { View, TextInput, TouchableOpacity, Image, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, Stack, useNavigation } from "expo-router";
import globalStyles from "../../style";
import styles from "./profile.style";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { navigate } from "expo-router/build/global-state/routing";
import { SymbolView } from "expo-symbols";
import { withDecay } from "react-native-reanimated";

export default function HomeScreen() {
  const icon = require('./');
  const userName = "Mihael";
  const colorScheme = useColorScheme();
  const editProfile = "icon Uredi Profil";
  const navigation = useNavigation();

  function Header(){
    return(
      <View style={[styles.header]}>
        <ThemedText style={[styles.headerText]}>Profil</ThemedText>
        <View>
          <ThemedText>a</ThemedText>
        </View>
      </View>
    )
  }

  function ProfileImage(){
    return(
      <Image
          source={require('./testProfile.png')}
          style={[
            styles.profileIcon,
          ]}></Image>
    )
  }

  function EditProfileButton(){
    return(
        <TouchableOpacity style={[styles.editProfileButton, styles.profileButtonShadow]}>
          <Text>Icon</Text>
          <ThemedText style={[styles.editProfileText]}>{editProfile}</ThemedText>
        </TouchableOpacity>
    )
  }

  function ProfileIntro(){
    return(
      <View style={[styles.profileIntro]}>

        <ProfileImage></ProfileImage>

        <ThemedText type="subtitle" style={[globalStyles.mb2, styles.userName]}>
          {userName}
        </ThemedText>

        <EditProfileButton></EditProfileButton>

      </View>
    )
  }

  function InterestsTopButton(){
    return(
        <TouchableOpacity style={[styles.changeInterestsButton]}>
          <Text>Icon</Text>
          <ThemedText style={[{fontSize: 10, color: "#5669FF"}]}>PROMJENI</ThemedText>
        </TouchableOpacity>
    )
  }

  function InterestsTop(){
    return(
      <View style={[styles.interestsTop]}>
        <ThemedText>Interesi</ThemedText>
        <InterestsTopButton></InterestsTopButton>
      </View>
    )
  }

  function InterestsCard(){
    return(
      <View>
        <ThemedText></ThemedText>
      </View>
    )
  }

  function InterestsBottom(){
    return(
      <View>
        <InterestsCard></InterestsCard>
      </View>
    )
  }


  function Interests(){
    return(
      <View style={[styles.interests]}>
        <InterestsTop></InterestsTop>
        <InterestsBottom></InterestsBottom>
      </View>
    )
  }


  
    



  return (
    <SafeAreaView style={[globalStyles.container]}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <Header></Header>
      {/*Wrapper*/}
      <View style={[styles.profileWrapper]}>

        <ProfileIntro></ProfileIntro>
        <Interests></Interests>



        </View>










    </SafeAreaView>
  );
}

// TouchableOpacty
