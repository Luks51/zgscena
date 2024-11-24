import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  eventCard: {
    borderRadius: 12,
  },
  eventCardImage: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
    resizeMode: "cover",
    borderRadius: 8,
  },
  eventSkeletonCard: {
    borderRadius: 12,
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
    height: 120,
  },
  eventSkeletonCardInner: {
    backgroundColor: "lightgray",
    aspectRatio: "1/1",
    width: "30%",
    borderRadius: 10,
    margin: 10,
  },
  eventSkeletonCardRight: {
    width: "65%",
  },
  eventSkeletonCardText: {
    backgroundColor: "lightgray",
    margin: 10,
    height: 20,
    width: "70%",
  },
  eventSkeletonCardTextSecond: {
    backgroundColor: "lightgray",
    margin: 10,
    height: 20,
    width: "40%",
  },
  eventBtn: {
    height: 120,
    borderRadius: 12,
  },
  filterScreen: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  filterScreenContainer: {},
  filterContainer: {
    width: "100%",
    height: "80%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});

export default styles;
