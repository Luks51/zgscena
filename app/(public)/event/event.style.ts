import { StyleSheet } from "react-native";
import {Colors} from "@/constants/Colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  detailsContainer: {
    marginBottom: 16,
  },
  iconRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  placeholderIcon: {
    width: 40,
    height: 40,
    backgroundColor: "#ccc", // Placeholder color for the icon
    borderRadius: 20,
    marginRight: 8,
  },
  detailText: {
    fontSize: 16,
    color: Colors.light.text,
  },
  description: {
    fontSize: 14,
    color: Colors.light.text,
    lineHeight: 20,
    marginBottom: 16,
  },
  footerContainer: {
    // borderWidth: 1,
    gap: 3,
    display: "flex",
    flexDirection: "row",
    marginTop: "auto",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  footerButton: {
    backgroundColor: Colors.light.tint,
    // borderWidth: 1,
    // borderColor: Colors.light.tint,
    display: "flex",
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  footerButton2: {
    // backgroundColor: Colors.light.tint,
    borderWidth: 1,
    borderColor: Colors.light.tint,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  footerButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  iconBox: {
    width: 40,
    height: 40,
    backgroundColor: "#f3f3f3",
    borderRadius: 5,
    marginRight: 8,
  },
  iconCenter: {
    justifyContent: "center",
    alignItems: "center",
  },
});
