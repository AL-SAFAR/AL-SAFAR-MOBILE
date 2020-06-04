import React from "react";
import { Text, Image, TouchableOpacity } from "react-native";
import { View, Button } from "native-base";
import StarRating from "react-native-star-rating";
import { FontAwesome as Icon } from "@expo/vector-icons";
import { Linking } from "expo";
import styles from "./DriverFooterProfileStyles.js";

export const DriverFooterProfile = ({ driverInfo, getDriverLocation }) => {
  const { profilePic, starRating, mobile } = driverInfo || "";
  return (
    <View style={styles.footerContainer}>
      <View style={styles.imageContainer}>
        <Image
          resizemode="contain"
          style={styles.driverPic}
          source={{ uri: profilePic }}
        />
      </View>
      <View style={styles.ratingContainer}>
        <StarRating
          starSize={20}
          disabled={true}
          maxStars={5}
          starRating={starRating}
          starColor="#0099ff"
        />
      </View>
      <View style={styles.iconContainer} />
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => Linking.openURL(`tel:${mobile}`)}
      >
        <Icon name="phone" size={30} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => Linking.openURL(`sms:${mobile}`)}
      >
        <Icon name="comment-o" size={30} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

export default DriverFooterProfile;
