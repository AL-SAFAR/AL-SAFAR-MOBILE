import React, { Component } from "react";
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
  Dimensions
} from "react-native";
import { Asset } from "expo-asset";
import { AppLoading } from "expo";
import { Formik } from "formik";
import Animated, { Easing } from "react-native-reanimated";
import {
  TapGestureHandler,
  State,
  TouchableOpacity
} from "react-native-gesture-handler";
import Svg, { Image, Circle, ClipPath } from "react-native-svg";
function cacheImages(images) {
  return images.map(image => {
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
  Extrapolate
} = Animated;
const { width, height } = Dimensions.get("window");

function runTiming(clock, value, dest) {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0)
  };

  const config = {
    duration: 1000,
    toValue: new Value(0),
    easing: Easing.inOut(Easing.ease)
  };

  return block([
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.frameTime, 0),
      set(config.toValue, dest),
      startClock(clock)
    ]),
    timing(clock, state, config),
    cond(state.finished, debug("stop clock", stopClock(clock))),
    state.position
  ]);
}
class Login extends Component {
  constructor(props) {
    super(props);

    this.buttonOpacity = new Value(1);
    this.state = {
      password: "",
      email: "",
      isReady: false
    };

    this.onStateChange = event([
      {
        nativeEvent: ({ state }) =>
          block([
            cond(
              eq(state, State.END),
              set(this.buttonOpacity, runTiming(new Clock(), 1, 0))
            )
          ])
      }
    ]);
    this.onCloseState = event([
      {
        nativeEvent: ({ state }) =>
          block([
            cond(
              eq(state, State.END),
              set(this.buttonOpacity, runTiming(new Clock(), 0, 1))
            )
          ])
      }
    ]);
    this.buttonY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [100, 0],
      extrapolate: Extrapolate.CLAMP
    });

    this.bgY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [-height / 3 - 50, 0],
      extrapolate: Extrapolate.CLAMP
    });
    this.textInputZindex = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [1, -1],
      extrapolate: Extrapolate.CLAMP
    });
    this.textInputY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [0, 100],
      extrapolate: Extrapolate.CLAMP
    });
    this.textInputOpacity = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [1, 0],
      extrapolate: Extrapolate.CLAMP
    });
    this.rotateCross = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [180, 360],
      extrapolate: Extrapolate.CLAMP
    });
  }

  async _loadAssetsAsync() {
    const imageAssets = cacheImages([]);
    require("../../../../assets/patterns/background.jpg");
    require("../../../../assets/logo.png");
    await Promise.all([...imageAssets]);
  }

  SignIn = () => {
    const { email, password } = this.state;
    if (email === "") {
      Alert.alert("OOPS!", "Please Fill the Email field", [
        { text: "Understood", onPress: () => console.log("alert closed") }
      ]);
    } else if (password === "") {
      Alert.alert("OOPS!", "please fill the Password field", [
        { text: "Understood", onPress: () => console.log("alert closed") }
      ]);
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      Alert.alert("OOPS!", "Invalid Email address", [
        { text: "Understood", onPress: () => console.log("alert closed") }
      ]);
    } else if (
      !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(password)
    ) {
      Alert.alert(
        "OOPS!",
        "Password should contain at least 8 characters which include uppercase,lowercase and a number",
        [{ text: "Understood", onPress: () => console.log("alert closed") }]
      );
    } else {
      this.props.navigation.navigate("Home");
    }
    Keyboard.dismiss();
  };

  clearFields = () => {
    const { email, password } = this.state;
    this.setState({ email: "", password: "" });
  };
  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }

    return (
      <KeyboardAvoidingView
        style={{
          flex: 1,
          backgroundColor: "white",
          justifyContent: "flex-end"
        }}
        behavior="padding"
        enabled
      >
        <Animated.View
          style={{
            ...StyleSheet.absoluteFill,
            transform: [{ translateY: this.bgY }]
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
            alignItems: "center"
          }}
        >
          <Text
            style={{ color: "white", fontSize: 40, fontFamily: "sans-serif" }}
          >
            AL-SAFAR
          </Text>
        </View>
        <View style={{ height: height / 3, justifyContent: "center" }}>
          <TapGestureHandler onHandlerStateChange={this.onStateChange}>
            <Animated.View
              style={{
                ...styles.button,

                opacity: this.buttonOpacity,
                transform: [{ translateY: this.buttonY }]
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>SIGN IN</Text>
            </Animated.View>
          </TapGestureHandler>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Register")}
          >
            <Animated.View
              style={{
                ...styles.button,
                backgroundColor: "#0099FF",
                opacity: this.buttonOpacity,
                transform: [{ translateY: this.buttonY }]
              }}
            >
              <Text
                style={{ fontSize: 20, fontWeight: "bold", color: "white" }}
              >
                SIGN UP
              </Text>
            </Animated.View>
          </TouchableOpacity>
          <TouchableOpacity>
            <Animated.View
              style={{
                alignItems: "center",
                opacity: this.buttonOpacity,
                transform: [{ translateY: this.buttonY }]
              }}
            >
              <Text
                style={{ fontSize: 15, fontWeight: "bold", color: "white" }}
              >
                Join As a <Text style={{ color: "#0099ff" }}>Partner</Text>
              </Text>
            </Animated.View>
          </TouchableOpacity>

          <Animated.View
            style={{
              zIndex: this.textInputZindex,
              opacity: this.textInputOpacity,
              transform: [{ translateY: this.textInputY }],
              backgroundColor: "#fff",
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              height: height / 3,
              ...StyleSheet.absoluteFill,
              top: null,
              justifyContent: "center"
            }}
          >
            <TapGestureHandler onHandlerStateChange={this.onCloseState}>
              <Animated.View style={styles.closeButton}>
                <TouchableOpacity onPress={this.clearFields}>
                  <Animated.Text
                    style={{
                      fontSize: 15,
                      transform: [{ rotate: concat(this.rotateCross, "deg") }]
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
              value={this.state.email}
              placeholderTextColor="black"
              onChangeText={text => this.setState({ email: text })}
            />
            <TextInput
              placeholder="PASSWORD"
              value={this.state.password}
              secureTextEntry={true}
              style={styles.textInput}
              onChangeText={text => this.setState({ password: text })}
              placeholderTextColor="black"
            />

            <TouchableOpacity onPress={this.SignIn}>
              <Animated.View style={styles.innerButton}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    color: "#0099ff"
                  }}
                >
                  SIGN IN
                </Text>
              </Animated.View>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
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
    shadowOpacity: 0.2
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
    shadowOpacity: 0.2
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
    shadowOpacity: 0.2
  },
  textInput: {
    height: 50,
    borderRadius: 25,
    borderWidth: 0.5,
    marginHorizontal: 20,
    paddingLeft: 10,
    marginVertical: 5,
    borderColor: "rgba(0,0,0,0.2)"
  }
});
export default Login;
