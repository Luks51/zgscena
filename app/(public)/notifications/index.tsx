import {Link, Stack} from "expo-router";
import { View, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import globalStyles from "../../style";
import styles from "./notifications.style";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Notifications() {
    const colorScheme = useColorScheme();
    const imageSource = require("@/app/(public)/notifications/NotifImg.png");
    const notifcationMessage = "I smell";
    const notifcationMessage2 = "Jk";
    type NotifProps = {
        imageSrc: any;
        notificationMsg: string;
      };

      const Notif = (props: NotifProps) => {
        return (
          <View style={[styles.notificationCardContainer]}>
            <Image style={[styles.notificationCardImage]} source={props.imageSrc}></Image>
            <ThemedText style={[styles.notificationText]} numberOfLines={3}>{props.notificationMsg}</ThemedText>
          </View>
        );
      };


    function Header(){
        return(
            <View style={[styles.header]}>
                <ThemedText style={[styles.headerText]}>Obavjesti</ThemedText>
                <TouchableOpacity>
                    <IconSymbol size={28} name="more.vert" color={Colors[colorScheme ?? "light"].tint}/>
                </TouchableOpacity>
            </View>
        )
    }


    function NotificationsList(){
        return(
            <View>
                <Notif imageSrc={imageSource} notificationMsg={notifcationMessage} />
                <Notif imageSrc={imageSource} notificationMsg={notifcationMessage2} />
            </View>
        )
    }





    return (
            <SafeAreaView style={[globalStyles.container, { marginHorizontal: 0, marginBottom: 0 }]}>
                <Stack.Screen
                    options={{
                        headerShown: false,
                    }}/>

                    <View style={[{marginHorizontal: 20}]}>
                        <Header></Header>
                    </View>

                    <NotificationsList></NotificationsList>



            </SafeAreaView>
    );
}
