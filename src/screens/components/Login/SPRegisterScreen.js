import React, { Component, useState } from "react";
import {
  Image,
  Keyboard,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { globalStyles } from "../../../../styles/global";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

// import { Ionicons } from "@expo/vector-icons";
// import { Madoka } from "react-native-textinput-effects";

import { Asset } from "expo-asset";
import { AppLoading } from "expo";
import { ScrollView } from "react-native-gesture-handler";
function cacheImages(images) {
  return images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}
const { height, width } = Dimensions.get("window");
const RegisterScreen = ({ navigation }) => {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     email: "",
  //     password: "",
  //     isReady: false
  //   };
  // }
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const [mobile, setMobile] = useState("");
  const [isReady, setisReady] = useState("");
  SignUp = () => {
    if (email === "") {
      alert("Please Fill the Email field");
    } else if (password === "") {
      alert("please fill the Password field");
    } else {
      navigation.navigate("Home");
    }
    Keyboard.dismiss();
  };

  _loadAssetsAsync = async () => {
    const imageAssets = cacheImages([]);
    require("../../../../assets/patterns/background.jpg");

    await Promise.all([...imageAssets]);
  };
  if (!isReady) {
    return (
      <AppLoading
        startAsync={this._loadAssetsAsync}
        onFinish={() => setisReady(true)}
        onError={console.warn}
      />
    );
  }
  return (
    //   <KeyboardAvoidingView
    //   style={{
    //     flex: 1,
    //     backgroundColor: "white",
    //     justifyContent: "flex-end",
    //   }}
    //   behavior="padding"
    //   enabled
    // >
    <View style={styles.container}>
      <ImageBackground
        source={require("../../../../assets/patterns/background.jpg")}
        // style={styles.cover}
        style={{ width: "100%", height: "100%", resizeMode: "contain" }}
      >
        <View style={styles.cover}>
          <Text
            style={{ color: "white", fontSize: 40, fontFamily: "sans-serif" }}
          >
            AL SAFAR
          </Text>
        </View>
        {/* < behavior="padding" enabled> */}
        <View style={styles.footer}>
          {/* <ScrollView showsVerticalScrollIndicator={false}> */}
          <View
            style={{
              // flex: 1,
              ...StyleSheet.absoluteFillObject,
              // height: height * 0.4,

              backgroundColor: "white",
              borderTopRightRadius: 25,
              borderTopLeftRadius: 25,
              marginHorizontal: 10,
              justifyContent: "flex-start",
              // alignItems: "center",
              paddingHorizontal: 5,
              paddingVertical: 5,
            }}
          >
            <ScrollView showsVerticalScrollIndicator={false}></ScrollView>
          </View>
          {/* </ScrollView> */}
        </View>
        {/* </> */}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cover: {
    height: 0.3 * height,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#6441a5",
    // borderBottomRightRadius: 75,
  },
  footer: { flex: 1 },
  textInput: {
    height: 50,
    borderRadius: 25,
    borderWidth: 0.5,
    marginHorizontal: 20,
    paddingLeft: 10,
    marginVertical: 5,
    borderColor: "rgba(0,0,0,0.2)",
  },
  innerButton: {
    backgroundColor: "white",
    height: 50,
    borderColor: "#0099ff",
    borderWidth: 1,
    marginHorizontal: 40,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: "black",
    shadowOpacity: 0.2,
  },
});
export default RegisterScreen;
