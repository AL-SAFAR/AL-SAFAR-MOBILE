import React from "react";
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  ImageBackground,
  Image,
  StyleSheet,
  View,
} from "react-native";

export default class AuthLoadingScreen extends React.Component {
  componentDidMount() {
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const token = await AsyncStorage.getItem("token");
    // console.log(token);
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    setTimeout(() => {
      this.props.navigation.navigate(token ? "App" : "Login");
    }, 5000);
  };

  // Render any loading content that you like here
  render() {
    return (
      //   <View style={styles.container}>
      //     <Image
      //       source={require("../../assets/Splasher.png")}
      //       style={styles.backgroundImage}
      //     />
      //   </View>
      <ImageBackground
        source={require("../../assets/Splasher.png")}
        style={{ width: "100%", height: "100%", resizeMode: "contain" }}
      ></ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  backgroundImage: {
    flex: 1,
    resizeMode: "contain", // or 'stretch'
  },
});
