import React from "react";
import { Text } from "react-native";
import { View, Button } from "native-base";
import { FontAwesome as Icon } from "@expo/vector-icons";
import { Swing } from "react-native-animated-spinkit";
import styles from "./FindDriverStyles";
const FindDriver = ({ selectedAddress, clearDriverState }) => {
  const { selectedPickUp, selectedDropOff } = selectedAddress || {};
  return (
    <View style={styles.findDriverContainer}>
      <Swing style={styles.spinner} size={150} color="#FFF" />
      <View style={styles.content}>
        <Text style={styles.text}> Processing your request</Text>
        <Icon style={styles.locationIcon} name="map-marker" />

        <View style={styles.pickup}>
          <Text>{selectedPickUp.name}</Text>
        </View>
        <Icon style={styles.toArrow} name="long-arrow-down" />
        <View style={styles.dropoff}>
          <Text>{selectedDropOff.name}</Text>
        </View>

        <View>
          <Text style={styles.termsText}>
            By booking you confirm that you accept our T & C
          </Text>
          <Button style={styles.cancelBtn} onPress={() => clearDriverState()}>
            <Text style={styles.cancelBtnText}>Cancel</Text>
          </Button>
        </View>
      </View>
    </View>
  );
};

export default FindDriver;
