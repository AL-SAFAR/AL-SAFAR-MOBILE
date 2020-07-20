import React, { Component, useState } from "react";
import {
  Image,
  Keyboard,
  Dimensions,
  TextInput,
  TouchableOpacity,
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
    <KeyboardAvoidingView
      style={{
        flex: 1,
        backgroundColor: "white",
        justifyContent: "flex-end",
      }}
      behavior="padding"
      enabled
    >
      <View style={styles.container}>
        <View style={{ ...StyleSheet.absoluteFill }}>
          <Image
            source={require("../../../../assets/patterns/background.jpg")}
            style={{ flex: 1, height: null, width: null }}
          ></Image>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          style={{
            flex: 1,
            flexDirection: "column",
            alignSelf: "flex-start",
            // borderRadius: 30,
            backgroundColor: "white",
            width: 50,
            marginTop: 50,
          }}
        >
          <View
            style={{
              alignSelf: "center",
              justifyContent: "center",
            }}
          >
            <Icons name="ios-arrow-back" size={30} style={{ color: "black" }} />
          </View>
        </TouchableOpacity>

        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 15,
            borderTopLeftRadius: 75,
            flex: 12,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TextInput
            placeholder="FULL NAME"
            style={styles.textInput}
            value={name}
            placeholderTextColor="black"
            onChangeText={(text) => setName(text)}
          />
          <TextInput
            placeholder="EMAIL"
            style={styles.textInput}
            value={email}
            placeholderTextColor="black"
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            placeholder="PASSWORD"
            style={styles.textInput}
            secureTextEntry={true}
            value={password}
            placeholderTextColor="black"
            onChangeText={(text) => setPassword(text)}
          />

          <TextInput
            placeholder="MOBILE NUMBER"
            style={styles.textInput}
            keyboardType="phone-pad"
            value={mobile}
            placeholderTextColor="black"
            onChangeText={(text) => setMobile(text)}
          />
          <TouchableOpacity onPress={this.SignUp}>
            <View style={{ ...styles.innerButton, marginTop: 10 }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "#0099ff",
                }}
              >
                SIGN IN
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "#fff",
    // borderTopLeftRadius: 30,
    // borderTopRightRadius: 30,
    // height: height / 3,
    // ...StyleSheet.absoluteFill,
    // top: null
  },
  button: {
    backgroundColor: "white",
    height: 50,
    marginHorizontal: 40,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: "black",
    shadowOpacity: 0.2,
  },
  innerButton: {
    backgroundColor: "white",
    width: width / 2,
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
  // closeButton: {
  //   height: 40,
  //   width: 40,
  //   backgroundColor: "white",
  //   borderRadius: 20,
  //   alignItems: "center",
  //   justifyContent: "center",
  //   position: "absolute",
  //   top: -20,
  //   left: width / 2 - 20,
  //   shadowOffset: { width: 2, height: 2 },
  //   shadowColor: "black",
  //   shadowOpacity: 0.2
  // },
  textInput: {
    height: 50,
    width: width - 30,
    backgroundColor: "white",
    borderRadius: 25,
    borderWidth: 0.5,
    marginHorizontal: 20,
    paddingLeft: 10,
    marginVertical: 5,
    borderColor: "rgba(0,0,0,0.2)",
  },
});
export default RegisterScreen;
