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

import {
  Ionicons as Icons,
  FontAwesome as FIcons,
  Feather as FeatherIcon,
} from "@expo/vector-icons";

import { Asset } from "expo-asset";
import { AppLoading } from "expo";
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
  const [mobile, setMobile] = useState("");
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
    // <KeyboardAvoidingView
    //   style={{
    //     flex: 1,
    //     backgroundColor: "white",
    //     justifyContent: "flex-end",
    //   }}
    //   behavior="padding"
    //   enabled
    // ></KeyboardAvoidingView>
    <View style={styles.container}>
      <ImageBackground
        source={require("../../../../assets/patterns/background.jpg")}
        style={styles.cover}
      ></ImageBackground>
      <View style={styles.footer}>
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: "white",
            borderTopStartRadius: 75,
            marginHorizontal: 10,
          }}
        ></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cover: {
    height: 0.4 * height,
    // backgroundColor: "#6441a5",
    // borderBottomRightRadius: 75,
  },
  footer: { flex: 1 },
});
export default RegisterScreen;
