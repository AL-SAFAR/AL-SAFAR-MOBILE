import { StyleSheet, StatusBar } from "react-native";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  titleBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    marginHorizontal: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    marginVertical: 5,
    padding: 10,
    fontSize: 16,
    borderRadius: 6,
  },
});
