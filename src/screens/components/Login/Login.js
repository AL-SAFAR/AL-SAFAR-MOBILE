import React, { useState } from "react";
import {
  Text,
  TextInput,
  View,
  Keyboard,
  Image as Img,
  KeyboardAvoidingView,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Asset } from "expo-asset";
import { AppLoading } from "expo";
import { Root, Popup } from "popup-ui"; // import { reduxForm } from "redux-form";
import { Formik } from "formik";
import Animated, { Easing } from "react-native-reanimated";
import {
  TapGestureHandler,
  State,
  TouchableOpacity,
} from "react-native-gesture-handler";
import Svg, { Image, Circle, ClipPath } from "react-native-svg";
function cacheImages(images) {
  return images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

const {
  Value,
  event,
  block,
  cond,
  eq,
  concat,
  set,
  Clock,
  startClock,
  stopClock,
  debug,
  timing,
  clockRunning,
  interpolate,
  Extrapolate,
} = Animated;
const { width, height } = Dimensions.get("window");

function runTiming(clock, value, dest) {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0),
  };

  const config = {
    duration: 1000,
    toValue: new Value(0),
    easing: Easing.inOut(Easing.ease),
  };

  return block([
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.frameTime, 0),
      set(config.toValue, dest),
      startClock(clock),
    ]),
    timing(clock, state, config),
    cond(state.finished, debug("stop clock", stopClock(clock))),
    state.position,
  ]);
}
import { loginuser, test } from "../../actions/authActions";
const Login = ({ navigation, auth: { user }, loginuser }) => {
  const [buttonOpacity, setbuttonOpacity] = useState(new Value(1));
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const [isReady, setisReady] = useState(false);
  const onStateChange = event([
    {
      nativeEvent: ({ state }) =>
        block([
          cond(
            eq(state, State.END),
            set(buttonOpacity, runTiming(new Clock(), 1, 0))
          ),
        ]),
    },
  ]);
  const onCloseState = event([
    {
      nativeEvent: ({ state }) =>
        block([
          cond(
            eq(state, State.END),
            set(buttonOpacity, runTiming(new Clock(), 0, 1))
          ),
        ]),
    },
  ]);
  const buttonY = interpolate(buttonOpacity, {
    inputRange: [0, 1],
    outputRange: [100, 0],
    extrapolate: Extrapolate.CLAMP,
  });
  const bgY = interpolate(buttonOpacity, {
    inputRange: [0, 1],
    outputRange: [-height / 3 - 50, 0],
    extrapolate: Extrapolate.CLAMP,
  });
  const textInputZindex = interpolate(buttonOpacity, {
    inputRange: [0, 1],
    outputRange: [1, -1],
    extrapolate: Extrapolate.CLAMP,
  });
  const textInputY = interpolate(buttonOpacity, {
    inputRange: [0, 1],
    outputRange: [0, 100],
    extrapolate: Extrapolate.CLAMP,
  });
  const textInputOpacity = interpolate(buttonOpacity, {
    inputRange: [0, 1],
    outputRange: [1, 0],
    extrapolate: Extrapolate.CLAMP,
  });
  const rotateCross = interpolate(buttonOpacity, {
    inputRange: [0, 1],
    outputRange: [180, 360],
    extrapolate: Extrapolate.CLAMP,
  });
  const _loadAssetsAsync = async () => {
    const imageAssets = cacheImages([]);
    require("../../../../assets/patterns/background.jpg");
    require("../../../../assets/logo.png");
    await Promise.all([...imageAssets]);
  };

  const SignIn = async () => {
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
    } else if (password === "") {
      Popup.show({
        type: "Warning",
        title: "Field Incomplete",
        textBody: "Please Fill the Password",
        buttontext: "Understood",
        callback: () => Popup.hide(),
      });
      // Alert.alert("OOPS!", "please fill the Password field", [
      //   { text: "Understood", onPress: () => console.log("alert closed") },
      // ]);
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      Popup.show({
        type: "Danger",
        title: "Invalid Email",
        textBody: "Enter a Valid Email",
        buttontext: "Try again",
        callback: () => Popup.hide(),
      });
      // Alert.alert("OOPS!", "Invalid Email address", [
      //   { text: "Understood", onPress: () => console.log("alert closed") },
      // ]);
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
      // Alert.alert(
      //   "OOPS!",
      //   "Password should contain at least 8 characters which include uppercase,lowercase and a number",
      //   [{ text: "Understood", onPress: () => console.log("alert closed") }]
      // );
      // } else if (loginuser(email, password)) {
      // this.props.navigation.navigate("Home");
      // console.log("loggedin");
    } else {
      loginuser(email, password).then((res) => {
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

  clearFields = () => {
    setemail("");
    setpassword("");
    Keyboard.dismiss();
  };

  if (!isReady) {
    return (
      <AppLoading
        startAsync={_loadAssetsAsync}
        onFinish={() => setisReady(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <Root>
      <KeyboardAvoidingView
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
          <Animated.View
            style={{
              ...StyleSheet.absoluteFill,
              transform: [{ translateY: bgY }],
            }}
          >
            <Svg height={height + 50} width={width}>
              <ClipPath id="clip">
                <Circle r={height + 50} cx={width / 2}></Circle>
              </ClipPath>
              <Image
                href={require("../../../../assets/patterns/background.jpg")}
                height={height + 50}
                width={width}
                preserveAspectRatio="xMidYMid slice"
                clipPath="url(#clip)"
              />
            </Svg>
          </Animated.View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{ color: "white", fontSize: 40, fontFamily: "sans-serif" }}
            >
              AL-SAFAR
            </Text>
          </View>
          <View style={{ height: height / 3, justifyContent: "center" }}>
            <TapGestureHandler onHandlerStateChange={onStateChange}>
              <Animated.View
                style={{
                  ...styles.button,

                  opacity: buttonOpacity,
                  transform: [{ translateY: buttonY }],
                }}
              >
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  SIGN IN
                </Text>
              </Animated.View>
            </TapGestureHandler>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Animated.View
                style={{
                  ...styles.button,
                  backgroundColor: "#0099FF",
                  opacity: buttonOpacity,
                  transform: [{ translateY: buttonY }],
                }}
              >
                <Text
                  style={{ fontSize: 20, fontWeight: "bold", color: "white" }}
                >
                  SIGN UP
                </Text>
              </Animated.View>
            </TouchableOpacity>

            <Animated.View
              style={{
                zIndex: textInputZindex,
                opacity: textInputOpacity,
                transform: [{ translateY: textInputY }],
                backgroundColor: "#fff",
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                height: height / 3,
                ...StyleSheet.absoluteFill,
                top: null,
                justifyContent: "center",
              }}
            >
              <TapGestureHandler onHandlerStateChange={onCloseState}>
                <Animated.View style={styles.closeButton}>
                  <TouchableOpacity onPress={clearFields}>
                    <Animated.Text
                      style={{
                        fontSize: 15,
                        transform: [{ rotate: concat(rotateCross, "deg") }],
                      }}
                    >
                      X
                    </Animated.Text>
                  </TouchableOpacity>
                </Animated.View>
              </TapGestureHandler>
              <TextInput
                placeholder="EMAIL"
                style={styles.textInput}
                keyboardType="email-address"
                value={email}
                placeholderTextColor="black"
                onChangeText={(text) => setemail(text)}
              />
              <TextInput
                placeholder="PASSWORD"
                value={password}
                secureTextEntry={true}
                style={styles.textInput}
                onChangeText={(text) => setpassword(text)}
                placeholderTextColor="black"
              />

              <TouchableOpacity onPress={SignIn}>
                <Animated.View style={styles.innerButton}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      color: "#0099ff",
                    }}
                  >
                    SIGN IN
                  </Text>
                </Animated.View>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Root>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "white",
    height: 50,
    marginHorizontal: 40,
    borderRadius: 35,
    alignItems: "center",
    alignContent: "space-around",
    justifyContent: "center",
    marginVertical: 10,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: "black",
    shadowOpacity: 0.2,
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
  closeButton: {
    height: 40,
    width: 40,
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: -20,
    left: width / 2 - 20,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: "black",
    shadowOpacity: 0.2,
  },
  textInput: {
    height: 50,
    borderRadius: 25,
    borderWidth: 0.5,
    marginHorizontal: 20,
    paddingLeft: 10,
    marginVertical: 5,
    borderColor: "rgba(0,0,0,0.2)",
  },
});
// export default Login;
Login.propTypes = {
  auth: PropTypes.object.isRequired,
  loginuser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { loginuser })(Login);
