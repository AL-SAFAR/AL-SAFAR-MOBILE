import React, { Component } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { Asset } from "expo-asset";
import { AppLoading } from "expo";
import Login from "./Login";
function cacheImages(images) {
  return images.map(image => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false
    };
  }
  async _loadAssetsAsync() {
    const imageAssets = cacheImages([]);
    require("../../../../assets/patterns/background.jpg");
    require("../../../../assets/logo.png");
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
    return <Login />;
  }
}
