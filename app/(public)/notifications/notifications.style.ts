import { StyleSheet } from "react-native";

export default StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 60, //KASNIJE POPRAVI
    marginBottom: 18,
  },
  headerText: {
    fontSize: 24,
    lineHeight: 28,
    fontWeight: "bold",
  },
  notificationCardContainer: {
    width: "100%",
    height: 72,
    marginBottom: 18,
    borderBottomWidth: 1,
    paddingLeft: 20,
    paddingRight: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  notificationCardImage: {
    width: 60,
    height: 60,
    borderRadius: 1000,
  },
  notificationText: {
    width: 260,
    overflow: "hidden",
    textOverflow: "ellipsis",
  }

});
