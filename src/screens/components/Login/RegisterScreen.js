import React, { useState } from "react";
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
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Root, Popup } from "popup-ui"; // import { reduxForm } from "redux-form";

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
import { register, test } from "../../actions/authActions";
const RegisterScreen = ({ navigation, auth: { user }, register }) => {
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
  const SignUp = async () => {
    if (email === "") {
      Popup.show({
        type: "Warning",
        title: "Field Incomplete",
        textBody: "Please Fill the Email",
        buttontext: "Understood",
        callback: () => Popup.hide(),
      });
      // Alert.alert("OOPS!", "Please Fill the Email field", [
      //   { text: "Understood", onPress: () => console.log("alert closed") },
      // ]);
    } else if (name === "") {
      Popup.show({
        type: "Warning",
        title: "Field Incomplete",
        textBody: "Please Fill the Name",
        buttontext: "Understood",
        callback: () => Popup.hide(),
      });
    } else if (password === "") {
      Popup.show({
        type: "Warning",
        title: "Field Incomplete",
        textBody: "Please Fill the Password",
        buttontext: "Understood",
        callback: () => Popup.hide(),
      });
    } else if (password === confirmPassword) {
      Popup.show({
        type: "Warning",
        title: "Password Unmatch",
        textBody: "Password and Confirm Password Don't Match",
        buttontext: "Understood",
        callback: () => Popup.hide(),
      });
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      Popup.show({
        type: "Danger",
        title: "Invalid Email",
        textBody: "Enter a Valid Email",
        buttontext: "Try again",
        callback: () => Popup.hide(),
      });
    } else if (
      !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(password)
    ) {
      Popup.show({
        type: "Danger",
        title: "Invalid Password",
        textBody:
          "Password should contain at least 8 characters which include uppercase,lowercase and a number",
        buttontext: "Try again",
        callback: () => Popup.hide(),
      });
    } else {
      register(name, email, password).then((res) => {
        // console.log(res);
        if (res) {
          navigation.navigate("App");
        } else {
          Popup.show({
            type: "Danger",
            title: "Invalid Credentials",
            textBody: "Please recheck your Credentials",
            buttontext: "Try again",
            callback: () => Popup.hide(),
          });
        }
      });
    }
    Keyboard.dismiss();
  };
  const sign = () => {
    console.log("hello ");
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
    <Root>
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
                  flexDirection: "row",
                  marginVertical: 10,
                  // justifyContent: "center",
                  // alignItems: "center",
                }}
              >
                <TouchableOpacity
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    width: 40,
                    height: 40,
                    borderRadius: 100,
                    backgroundColor: "black",
                    // alignSelf: "flex-start",
                    marginLeft: 10,
                  }}
                  onPress={() => {
                    navigation.navigate("Login");
                  }}
                >
                  <Ionicons name="ios-arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text
                  style={{
                    fontSize: 28,
                    fontWeight: "700",
                    // textAlign: "center",
                    // justifyContent: "center",
                    // justifyContent: "center",
                    marginHorizontal: width / 5,
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
              <TouchableOpacity onPress={SignUp}>
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
    </Root>
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
RegisterScreen.propTypes = {
  auth: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { register })(RegisterScreen);
