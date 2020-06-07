import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  // Animated,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import Animated, { Easing } from "react-native-reanimated";

const EditProfile = () => {
  const [animate, setAnimate] = useState(new Animated.Value(0));
  const [success, setSuccess] = useState(false);

  const handlePress = () => {
    Animated.timing(animate, {
      toValue: 1,
      duration: 300,
    }).start();
  };

  const handleSend = () => {
    setSuccess(true, () => {
      Animated.sequence([
        Animated.timing(animate, {
          toValue: 0,
          duration: 300,
        }),
        Animated.delay(1500),
      ]).start(() => setSuccess(false));
    });
  };

  const widthInterpolate = animate.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [150, 150, 300],
    extrapolate: "clamp",
  });
  const notifyTextScaleInterpolate = animate.interpolate({
    inputRange: [0, 0.5],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const inputScaleInterpolate = animate.interpolate({
    inputRange: [0, 0.5, 0.6],
    outputRange: [0, 0, 1],
    extrapolate: "clamp",
  });

  const sendButtonInterpolate = animate.interpolate({
    inputRange: [0, 0.6, 1],
    outputRange: [0, 0, 1],
  });

  const thankyouScaleInterpolate = animate.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  const buttonWrapStyle = {
    width: widthInterpolate,
  };

  const notifyTextStyle = {
    transform: [
      {
        scale: notifyTextScaleInterpolate,
      },
    ],
  };

  const thankyouTextStyle = {
    transform: [
      {
        scale: thankyouScaleInterpolate,
      },
    ],
  };

  const inputWrapStyle = {
    transform: [
      {
        scale: inputScaleInterpolate,
      },
    ],
  };

  const sendButtonStyle = {
    transform: [
      {
        scale: sendButtonInterpolate,
      },
    ],
  };
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={handlePress}>
        <Animated.View style={[styles.buttonWrap, buttonWrapStyle]}>
          {!success && (
            <Animated.View
              style={[
                StyleSheet.absoluteFill,
                styles.inputWrap,
                inputWrapStyle,
              ]}
            >
              <TextInput
                autoFocus
                keyboardType="email-address"
                placeholder="Email"
                placeholderTextColor="#0099ff"
                style={styles.textInput}
              />
              <TouchableOpacity
                style={[styles.sendButton, sendButtonStyle]}
                onPress={handleSend}
              >
                <Text style={styles.sendText}>Send</Text>
              </TouchableOpacity>
            </Animated.View>
          )}

          {!success && (
            <Animated.View style={notifyTextStyle}>
              <Text style={styles.notifyText}>Notify Me</Text>
            </Animated.View>
          )}
          {success && (
            <Animated.View style={thankyouTextStyle}>
              <Text style={styles.notifyText}>Thank You</Text>
            </Animated.View>
          )}
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0099ff",
  },
  buttonWrap: {
    backgroundColor: "#FFF",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  notifyText: {
    color: "#0099ff",
    fontWeight: "bold",
  },
  inputWrap: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  textInput: {
    flex: 4,
  },
  sendButton: {
    backgroundColor: "#0099ff",
    flex: 1,
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  sendText: {
    color: "#FFF",
  },
});
export default EditProfile;
