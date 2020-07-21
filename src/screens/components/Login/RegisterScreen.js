import React, { Component, useState } from "react";
import {
  // Image,
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
import Svg, { Image, Circle, ClipPath } from "react-native-svg";

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
    <KeyboardAvoidingView
      // keyboardVerticalOffset={-64}
      style={{
        flex: 1,
        backgroundColor: "white",
        justifyContent: "flex-end",
      }}
      behavior="padding"
      enabled
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          justifyContent: "flex-end",
        }}
      >
        <View
          style={{
            ...StyleSheet.absoluteFill,
            // transform: [{ translateY: bgY }],
          }}
        >
          <Svg height={height + 50} width={width}>
            {/* <ClipPath id="clip">
              <Circle r={height + 50} cx={width / 2}></Circle>
            </ClipPath> */}
            <Image
              href={require("../../../../assets/patterns/background.jpg")}
              height={height + 50}
              width={width}
              preserveAspectRatio="xMidYMid slice"
              clipPath="url(#clip)"
            />
          </Svg>
        </View>
        {/* <View style={styles.cover}></View> */}
        <View style={styles.footer}>
          <View
            style={{
              // flex: 1,
              ...StyleSheet.absoluteFillObject,
              // height: height * 0.4,
              alignSelf: "flex-end",
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
            <View
              style={{
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  alignSelf: "flex-start",
                }}
              >
                <Ionicons name="ios-arrow-back" size={24} color="#000" />
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 28,
                  fontWeight: "700",
                  textAlign: "center",

                  // justifyContent: "center",
                  // marginBottom: 10,
                }}
              >
                Sign Up
              </Text>
            </View>
            {/* </View> */}
            <TextInput
              placeholder="NAME"
              style={styles.textInput}
              keyboardType="email-address"
              value={name}
              placeholderTextColor="black"
              onChangeText={(text) => setName(text)}
            />
            <TextInput
              placeholder="EMAIL"
              style={styles.textInput}
              keyboardType="email-address"
              value={email}
              placeholderTextColor="black"
              onChangeText={(text) => setEmail(text)}
            />
            <TextInput
              placeholder="PASSWORD"
              value={password}
              secureTextEntry={true}
              style={styles.textInput}
              onChangeText={(text) => setPassword(text)}
              placeholderTextColor="black"
            />
            <TextInput
              placeholder="CONFIRM PASSWORD"
              value={confirmPassword}
              secureTextEntry={true}
              style={styles.textInput}
              onChangeText={(text) => setConfirmPassword(text)}
              placeholderTextColor="black"
            />
            <TouchableOpacity
            //  onPress={SignIn}
            >
              <View style={styles.innerButton}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    color: "#0099ff",
                  }}
                >
                  SIGN UP
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
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
  footer: { height: height * 0.6 },
  textInput: {
    height: 45,
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
