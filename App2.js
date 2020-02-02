import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { LoginScreen } from "./src/screens/components/Login/LoginScreen";

const AppStackNavigator = createStackNavigator({
  LoginScreen: { screen: LoginScreen }
});

export default createAppContainer(AppStackNavigator);
