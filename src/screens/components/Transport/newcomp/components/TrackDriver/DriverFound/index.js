import React from "react";
import { Text, Image } from "react-native";
import { View, Button } from "native-base";
import styles from "./DriveFoundStyles.js";
const DriverFound = ({ driverInfo, getDriverLocation }) => {
  const { name, vehicle, profilePic } = driverInfo || {};
  return (
    <View style={styles.findDriverContainer}>
      <View style={styles.content}>
        <Text>YAY Driver Found</Text>
        <Image
          resizeMode="contain"
          style={styles.driverPic}
          source={{ uri: profilePic }}
        />
        <Text style={styles.quotationMarkLeft}>""</Text>
        <View style={styles.driverBio}>
          <Text style={styles.bioText}>Hi my name is</Text>
          <Text style={styles.nameText}>{name}</Text>
          <Text style={styles.bioText}>and I am 0.2km away</Text>
        </View>
        <Text style={styles.quotationMarkRight}></Text>
      </View>
      <View style={styles.vehicleDetails}>
        <Text style={styles.vehicleText}>Vehicle Plate number:</Text>
        <Text style={styles.vehicleNumber}>
          {vehicle && vehicle.plateNumber}
        </Text>
      </View>
      <Button style={styles.nextBtn} onPress={() => getDriverLocation()}>
        <Text style={styles.nextBtnText}>Next</Text>
      </Button>
    </View>
  );
};

export default DriverFound;
