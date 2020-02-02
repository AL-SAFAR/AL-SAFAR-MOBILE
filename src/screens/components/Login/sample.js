import React, { Component } from "react";
import {
  ImageBackground,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
  View
} from "react-native";

export class LoginScreen extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={require("../assets/login_bg.jpg")}
          style={{ flex: 1 }}
        >
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Animatable.View
              animation="zoomIn"
              iterationCount={1}
              style={{
                backgroundColor: "white",
                height: 100,
                width: 100,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 26 }}>UBER</Text>
            </Animatable.View>
          </View>

          {/** BOTTOM HALF **/}
          <Animatable.View animation="slideInUp" iterationCount={1}>
            <Animated.View
              style={{
                height: this.loginHeight, //animated
                backgroundColor: "white"
              }}
            >
              <Animated.View
                style={{
                  opacity: headerTextOpacity, //animated
                  alignItems: "flex-start",
                  paddingHorizontal: 25,
                  marginTop: marginTop //animated
                }}
              >
                <Text style={{ fontSize: 24 }}>Get moving with Uber</Text>
              </Animated.View>

              <TouchableOpacity onPress={() => this.increaseHeightOfLogin()}>
                <Animated.View
                  style={{
                    marginTop: marginTop, //animated
                    paddingHorizontal: 25,
                    flexDirection: "row"
                  }}
                >
                  <Animated.Text
                    style={{
                      fontSize: 24,
                      color: "gray",
                      position: "absolute",
                      bottom: titleTextBottom, //animated
                      left: titleTextLeft, //animated
                      opacity: titleTextOpacity //animated
                    }}
                  >
                    Enter your mobile number
                  </Animated.Text>

                  <Image
                    source={require("../assets/india.png")}
                    style={{ height: 24, width: 24, resizeMode: "contain" }}
                  />
                  <Animated.View
                    pointerEvents="none"
                    style={{
                      flexDirection: "row",
                      flex: 1,
                      borderBottomWidth: this.borderBottomWidth //animated
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        paddingHorizontal: 10
                      }}
                    >
                      +91
                    </Text>

                    <TextInput
                      keyboardType="numeric"
                      ref="textInputMobile"
                      style={{ flex: 1, fontSize: 20 }}
                      placeholder={this.state.placeholderText}
                      underlineColorAndroid="transparent"
                    />
                  </Animated.View>
                </Animated.View>
              </TouchableOpacity>
            </Animated.View>
            <View
              style={{
                height: 70,
                backgroundColor: "white",
                alignItems: "flex-start",
                justifyContent: "center",
                borderTopColor: "#e8e8ec",
                borderTopWidth: 1,
                paddingHorizontal: 25
              }}
            >
              <Text
                style={{
                  color: "#5a7fdf",
                  fontWeight: "bold"
                }}
              >
                Or connect using a social account
              </Text>
            </View>
          </Animatable.View>
        </ImageBackground>
      </View>
    );
  }
}

export default LoginScreen;
