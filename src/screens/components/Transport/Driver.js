import React, { Component } from "react";
import { View, Image } from "react-native";
import MapView, { AnimatedRegion, Animated, Marker } from "react-native-maps";

export default class Driver extends Component {
  constructor(props) {
    super(props);
    const driver = this.props.driver
      ? this.props.driver
      : {
          uid: "noDriversPassed",
          location: { latitude: 0, longitude: 0 }
        };
    const coordinate = new MapView.AnimatedRegion({
      latitude: driver.location.latitude,
      longitude: driver.location.longitude,
      longitudeDelta: 0.045,
      latitudeDelta: 0.045
    });
    this.state = {
      driver: driver,
      coordinate: coordinate
    };
  }

  render() {
    return (
      <MapView.Marker.Animated
        coordinate={this.state.coordinate}
        anchor={{ x: 0.35, y: 0.32 }} //centers car.png image
        ref={marker => {
          this.marker = marker;
        }}
        style={{ width: 100, height: 50 }}
      >
        <Image
          source={require("../../../../assets/car.png")}
          style={{
            width: 90,
            height: 50
          }}
        />
      </MapView.Marker.Animated>
    );
  }
}
