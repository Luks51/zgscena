import { StyleSheet } from "react-native";
import { red } from "react-native-reanimated/lib/typescript/Colors";

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 60,
    width: "100%",
    marginBottom: 18,
  },
  headerText: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "bold",
  },
  headerIcons: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  profileWrapper: {
    flexDirection: "column",
    alignItems: "center",
  },
  profileIntro: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 14,
    marginBottom: 14,
  },
  profileIcon: {
    width: 120,
    height: 120,
    borderRadius: 100000,
  },
  userName: {
    fontSize: 30,
    fontWeight: "bold",
  },
  profileButtonShadow: {
    shadowColor: '#016EB2',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 10,
    shadowOpacity: 1,
    elevation: 1,
  },
  editProfileButton: {
    borderRadius: 15,
    borderWidth: 1,
    width: 154,
    height: 50,
    paddingTop: 12.5,
    paddingBottom: 12.5,
    paddingLeft: 19.5,
    paddingRight: 19.5,
    borderColor: '#016EB2',
    gap: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: "center",
  },
  editProfileText: {
    fontSize: 16,
    textAlign: "center",
    color: '#016EB2',
  },
  interests: {
    height: 128,
    width: "100%",
    display: "flex",
    alignItems: "center",
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "rgba(23, 23, 102, 0.05)",
    borderRadius: 10,
  },
  interestsTop: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  changeInterestsButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    width: 90,
    height: 28,
    borderRadius: 10,
    backgroundColor: "rgba(86, 105, 255, 0.1)", 
  },
  interestsCard: {
    backgroundColor: "#FBD041",
    width: 99,
    height: 39.6,
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }
});

export default styles;
