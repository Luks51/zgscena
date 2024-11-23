import { StyleSheet } from "react-native";

export default StyleSheet.create({
  imageWrapper: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  image: {
    width: "100%",
    height: "100%",
    // maxHeight: 300,
  },
  headerWrapper: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  dotWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "#007AFF", // Active dot color
  },
  inactiveDot: {
    backgroundColor: "#C4C4C4", // Inactive dot color
  },
  navigationWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingBottom: 20,
  },
  navigationButton: {
    fontSize: 16,
    color: "white", // Navigation button color
    fontWeight: "bold",
  },

});
