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
  const editProfile = "Uredi Profil";
  const navigation = useNavigation();
  const ProfileTitle = "Profil";

  function Header(){
    return(
      <View style={[styles.header]}>
        <ThemedText style={[styles.headerText]}>{ProfileTitle}</ThemedText>
        <View style={[styles.headerIcons]}>
          <IconSymbol name="settings" color={Colors[colorScheme ?? "light"].text} />
          <IconSymbol name="question" color={Colors[colorScheme ?? "light"].text} />
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
        <TouchableOpacity style={[styles.editProfileButton]}>
          <IconSymbol name="edit" size={15} color={"#016EB2"} />
          <ThemedText style={[styles.editProfileText]}>{editProfile}</ThemedText>
        </TouchableOpacity>
    )
  }

  function ProfileIntro(){
    return(
      <View style={[styles.profileIntro]}>

        <ProfileImage></ProfileImage>

        <ThemedText type="subtitle" style={[styles.userName]}>
          {userName}
        </ThemedText>

        <EditProfileButton></EditProfileButton>


      </View>
    )
  }

  function InterestsTopButton(){
    return(
        <TouchableOpacity style={[styles.changeInterestsButton]}>
          <IconSymbol name="edit" size={15} color={"#5669FF"} />
          <ThemedText style={[{fontSize: 10, color: "#5669FF"}]}>PROMJENI</ThemedText>
        </TouchableOpacity>
    )
  }

  function InterestsTop(){
    return(
      <View style={[styles.interestsTop]}>
        <ThemedText style={[{fontSize: 18, paddingTop: 10}]}>Interesi</ThemedText>
        <InterestsTopButton></InterestsTopButton>
      </View>
    )
  }

  function InterestsCard(){
    return(
      <View>
        <ThemedText>card</ThemedText>
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
