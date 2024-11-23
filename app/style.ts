import { StyleSheet } from "react-native";

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  dFlex: {
    display: "flex",
    flexDirection: "row",
  },
  justifyContentCenter: {
    justifyContent: "center",
  },
  justifyContentBetween: {
    justifyContent: "space-between",
  },
  alignItemsCenter: {
    alignItems: "center",
  },
  textCenter: {
    textAlign: "center",
  },
  m2: {
    margin: 20,
  },
  mx2: {
    marginHorizontal: 20,
  },
  my2: {
    marginVertical: 20,
  },
  mt2: {
    marginTop: 20,
  },
  mb2: {
    marginBottom: 20,
  },
  m3: {
    margin: 30,
  },
  mx3: {
    marginHorizontal: 30,
  },
  my3: {
    marginVertical: 30,
  },
  mt3: {
    marginTop: 30,
  },
  mb3: {
    marginBottom: 30,
  },
  p2: {
    padding: 20,
  },
  px2: {
    paddingHorizontal: 20,
  },
  py2: {
    paddingVertical: 20,
  },
  pt2: {
    paddingTop: 20,
  },
  pb2: {
    paddingBottom: 20,
  },
  p3: {
    padding: 30,
  },
  px3: {
    paddingHorizontal: 30,
  },
  py3: {
    paddingVertical: 30,
  },
  pt3: {
    paddingTop: 30,
  },
  pb3: {
    paddingBottom: 30,
  },
  boxShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});

export default globalStyles;
