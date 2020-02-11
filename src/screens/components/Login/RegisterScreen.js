import React, { Component } from "react";
import {
  Image,
  Keyboard,
  Dimensions,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View
} from "react-native";
import {
  Ionicons as Icons,
  FontAwesome as FIcons,
  Feather as FeatherIcon
} from "@expo/vector-icons";

import { Asset } from "expo-asset";
import { AppLoading } from "expo";
function cacheImages(images) {
  return images.map(image => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}
const { height, width } = Dimensions.get("window");
export class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isReady: false
    };
  }

  SignIn = () => {
    const { email, password } = this.state;
    if (email === "") {
      alert("Please Fill the Email field");
    } else if (password === "") {
      alert("please fill the Password field");
    } else {
      this.props.navigation.navigate("Home");
    }
    Keyboard.dismiss();
  };

  async _loadAssetsAsync() {
    const imageAssets = cacheImages([]);
    require("../../../../assets/patterns/background.jpg");

    await Promise.all([...imageAssets]);
  }
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
        <View style={styles.container}>
          <View style={{ ...StyleSheet.absoluteFill }}>
            <Image
              source={require("../../../../assets/patterns/background.jpg")}
              style={{ flex: 1, height: null, width: null }}
            ></Image>
          </View>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Login")}
            style={{
              flex: 1,
              flexDirection: "column",
              // justifyContent: "flex-start",
              alignSelf: "flex-start",
              borderRadius: 30,
              backgroundColor: "white",
              width: 50,
              marginTop: 50
            }}
          >
            <View>
              <Icons
                name="ios-arrow-back"
                size={30}
                style={{ color: "black" }}
              />
            </View>
          </TouchableOpacity>
          <View
            style={{ flex: 12, justifyContent: "center", alignItems: "center" }}
          >
            <TextInput
              placeholder="FULL NAME"
              style={styles.textInput}
              value={this.state.name}
              placeholderTextColor="black"
              onChangeText={text => this.setState({ name: text })}
            />
            <TextInput
              placeholder="EMAIL"
              style={styles.textInput}
              value={this.state.email}
              placeholderTextColor="black"
              onChangeText={text => this.setState({ email: text })}
            />
            <TextInput
              placeholder="PASSWORD"
              style={styles.textInput}
              secureTextEntry={true}
              value={this.state.password}
              placeholderTextColor="black"
              onChangeText={text => this.setState({ password: text })}
            />

            <TextInput
              placeholder="MOBILE NUMBER"
              style={styles.textInput}
              keyboardType="phone-pad"
              value={this.state.mobile}
              placeholderTextColor="black"
              onChangeText={text => this.setState({ mobile: text })}
            />
            <TouchableOpacity onPress={this.SignIn}>
              <View style={{ ...styles.innerButton, marginTop: 10 }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    color: "#0099ff"
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
    justifyContent: "center",
    marginVertical: 10,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: "black",
    shadowOpacity: 0.2
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
    shadowOpacity: 0.2
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
    borderColor: "rgba(0,0,0,0.2)"
  }
});
export default RegisterScreen;
