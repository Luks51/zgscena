import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  headerWrapper: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  categoriesBtn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 50,
  },
  eventCard: {
    borderRadius: 12,
    maxWidth: 300,
  },
  eventCardImage: {
    aspectRatio: "16/9",
    width: "100%",
    objectFit: "cover",
  },
  bellIcon: {
    borderRadius: 50,
    padding: 10,
  },
});

export default styles;
