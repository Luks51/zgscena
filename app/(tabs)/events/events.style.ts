import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  headerWrapper: {
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    paddingBottom: 20,
    paddingTop: 10,
  },
  categoriesBtn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 50,
  },
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
  bellIcon: {
    borderRadius: 50,
    padding: 8,
    position: "relative",
  },
  bellPoint: {
    backgroundColor: "#02E9FE",
    borderRadius: 50,
    height: 7,
    width: 7,
    position: "absolute",
    top: 14,
    right: 14,
    borderWidth: 1,
    borderColor: "#016eb2",
    boxSizing: "border-box",
  },
  eventBtn: {
    height: 120,
    borderRadius: 12,
  },
});

export default styles;
