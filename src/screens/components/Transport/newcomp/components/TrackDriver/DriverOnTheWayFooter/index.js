import React from "react";
import { Text, Image } from "react-native";
import { View, Button } from "native-base";
import { FontAwesome as Icon } from "@expo/vector-icons";

import styles from "./DriverOnTheWayStyles";

export const DriverOnTheWayFooter = ({
  distanceFromDriver,
  driverInfo,
  getDriverLocation,
}) => {
  const { vehicle } = driverInfo || {};
  const { duration } = distanceFromDriver || {};
  return (
    <View style={styles.footerContainer}>
      <View style={styles.iconContainer}>
        <Icon name="window-minimize" style={styles.icon} />
        <Text style={styles.distanceText}>
          {duration < 2 ? "Your Driver is Here" : duration + " min"}
        </Text>
        <Text style={styles.onWayText}>
          {duration < 2 ? "Meet Your Driver" : "Your driver is on the way"}
        </Text>
        <Text style={styles.vehicleText}>
          {vehicle && vehicle.plateNumber} {vehicle && vehicle.model}
        </Text>
      </View>
    </View>
  );
};

export default DriverOnTheWayFooter;
