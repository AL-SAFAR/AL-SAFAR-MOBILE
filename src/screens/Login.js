import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { StackNavigator } from "react-navigation";
import { LoginScreen } from "./components/Login/LoginScreen";

export default class Login extends Component {
  render() {
    return (
      <View>
        <Text> textInComponent </Text>
      </View>
    );
  }
}

const AppStackNavigator = StackNavigator({
  LoginScreen: { screen: LoginScreen }
});
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
