import { StyleSheet } from "react-native";

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
    flex: 1,
    fontSize: 14,
    color: '#333',
    fontFamily: 'SpaceMono', // Assuming you are using SpaceMono font
  },
});

export default styles;
