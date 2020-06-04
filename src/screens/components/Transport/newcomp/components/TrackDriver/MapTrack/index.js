import React from "react";
import { View, Text } from "react-native";
import styles from "./MapTrackStyles";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import MapViewDirections from "react-native-maps-directions";
import {
  DISTANCE_DIRECTION_KEY,
  HOME_BASE_URL,
} from "../../../../../../../../key.json";

const MapTrack = ({
  region,
  showCarMarker,
  selectedAddress,
  driverLocation,
  carMarker,
  setDurationDistance,
}) => {
  return (
    <View style={{ flex: 1 }}>
      <MapView
        provider={PROVIDER_GOOGLE}
        initialRegion={region}
        showsUserLocation={true}
        rotateEnabled={false}
        style={styles.map}
        // showsTraffic={true}
        ref={(map) => {
          this.map = map;
        }}
      >
        {selectedAddress.selectedPickUp && driverLocation.coordinate ? (
          <MapViewDirections
            origin={{
              latitude: driverLocation.coordinate.coordinates[1],
              longitude: driverLocation.coordinate.coordinates[0],
            }}
            destination={{
              latitude: selectedAddress.selectedPickUp.geometry.location.lat,
              longitude: selectedAddress.selectedPickUp.geometry.location.lng,
            }}
            apikey={DISTANCE_DIRECTION_KEY}
            mode="DRIVING"
            strokeWidth={3}
            strokeColor="#0099ff"
            onReady={(result) => {
              // const distance=Math.ceil(result.duration);
              // const duration=Math.ceil(result.distance);
              let payload = {
                duration: Math.ceil(result.duration),
                distance: Math.ceil(result.distance),
              };
              setDurationDistance(payload);
              // calculateFare(payload);
              // console.log(`Distance: ${result.distance} km`);
              // console.log(`Duration: ${result.duration} min.`);
            }}
          />
        ) : (
          <View></View>
        )}
        {selectedAddress.selectedPickUp && (
          <Marker
            coordinate={{
              latitude: selectedAddress.selectedPickUp.geometry.location.lat,
              latitudeDelta: 0.0922,
              longitude: selectedAddress.selectedPickUp.geometry.location.lng,
              longitudeDelta: 0.051862500000000006,
            }}
            pinColor="#0099ff"
            title={"You're PickUp"}
          />
        )}

        {selectedAddress.selectedDropOff && (
          <Marker
            coordinate={{
              latitude: selectedAddress.selectedDropOff.geometry.location.lat,
              latitudeDelta: 0.0922,
              longitude: selectedAddress.selectedDropOff.geometry.location.lng,
              longitudeDelta: 0.051862500000000006,
            }}
            pinColor="green"
            title={"You're DropOff"}
          />
        )}

        {showCarMarker && (
          <Marker
            coordinate={{
              latitude: driverLocation.coordinate.coordinates[1],
              latitudeDelta: 0.0922,
              longitude: driverLocation.coordinate.coordinates[0],
              longitudeDelta: 0.051862500000000006,
            }}
            image={carMarker}
          />
        )}
      </MapView>
    </View>
  );
};

export default MapTrack;
