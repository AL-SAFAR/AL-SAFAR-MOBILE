import React, { useEffect } from "react";
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  ImageBackground,
  Image,
  StyleSheet,
  View,
} from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loadUser, test } from "./actions/authActions";

const AuthLoadingScreen = ({ navigation, auth: { user }, loadUser }) => {
  useEffect(() => {
    _bootstrapAsync();
  }, []);
  // Fetch the token from storage then navigate to our appropriate place
  const _bootstrapAsync = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      await loadUser();
    }
    // console.log(token);
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    navigation.navigate(token ? "App" : "Login");
    // setTimeout(() => {
    // }, 3000);
  };

  // Render any loading content that you like here

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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  backgroundImage: {
    flex: 1,
    resizeMode: "contain", // or 'stretch'
  },
});
AuthLoadingScreen.propTypes = {
  auth: PropTypes.object.isRequired,
  loadUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { loadUser })(AuthLoadingScreen);
