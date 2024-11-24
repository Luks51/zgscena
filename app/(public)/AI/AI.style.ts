import { StyleSheet } from "react-native";
import {Colors} from "@/constants/Colors";

const styles = StyleSheet.create({
  notificationCardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#f9f9f9', // Lighter background
    borderRadius: 10, // Rounded corners
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 2,
  },
  notificationCardImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  notificationText: {
    // flex: 1,
    justifyContent: "space-between",
    fontSize: 14,
    color: '#333',
    fontFamily: 'SpaceMono', // Assuming you are using SpaceMono font
  },
  bubbleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    paddingHorizontal: 10,
  },
  bubble: {
    backgroundColor: Colors.light.tint, // Customize based on your theme
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    // maxWidth: "60%", // Limit bubble size
    alignSelf: "center", // Center the bubble horizontally
  },
  chatbox: {
    height: 50,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
});

export default styles;
