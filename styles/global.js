import { Dimensions, StyleSheet, StatusBar } from "react-native";
const { width, height } = Dimensions.get("window");
export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "#FFF",
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
  text: {
    color: "#52575D",
  },
  image: {
    flex: 1,
    borderRadius: 180,
    height: undefined,
    width: undefined,
  },
  profileImage: {
    width: 150,
    height: 150,
    overflow: "hidden",
  },
  add: {
    backgroundColor: "#0099ff",
    position: "absolute",
    bottom: 5,
    right: -5,
    width: 50,
    height: 25,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    color: "#0099ff",
    borderColor: "#0099ff",
    width: width - 50,
    height: 50,
    marginVertical: 10,
    borderWidth: 2,
    borderRadius: 5,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: { color: "#0099ff", fontSize: 24 },
  formContainer: {
    borderWidth: 1,
    borderColor: "#0099ff",
    borderRadius: 10,
    margin: 10,
    marginTop: 30,
    padding: 10,
  },
});
