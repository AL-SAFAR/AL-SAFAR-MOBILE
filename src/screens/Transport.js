import React, { Component } from "react";
import {
  Platform,
  Alert,
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput
} from "react-native";
import MapView from "react-native-maps";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";
import * as Location from "expo-location";
import {
  Entypo as En,
  FontAwesome as F,
  AntDesign as AD
} from "@expo/vector-icons";
import { DestinationBtn } from "./components/Transport/DestinationBtn";
import { CurrentLocationBtn } from "./components/Transport/CurrentLocationBtn";
import Driver from "./components/Transport/Driver";

class Transport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: null
    };
  }
  componentDidMount() {
    if (Platform.OS === "android" && !Constants.isDevice) {
      this.setState({
        errorMessage:
          "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      });
    } else {
      this._getLocationAsync();
    }
  }
  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    } else {
      console.log("granted");
    }

    let location = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true
    });
    let region = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.045,
      longitudeDelta: 0.045
    };
    this.setState({ region });
  };

  centerMap() {
    const {
      latitude,
      longitude,
      latitudeDelta,
      longitudeDelta
    } = this.state.region;
    this.map.animateToRegion({
      latitude,
      longitude,
      latitudeDelta,
      longitudeDelta
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <DestinationBtn />
        <CurrentLocationBtn
          cb={() => {
            this.centerMap();
          }}
        />
        <MapView
          initialRegion={this.state.region}
          showsUserLocation={true}
          rotateEnabled={false}
          // showsTraffic={true}
          ref={map => {
            this.map = map;
          }}
          style={{ flex: 1 }}
        >
          <Driver
            driver={{
              uid: "null",
              location: {
                latitude: 33.5925877,
                longitude: 73.0596366
              }
            }}
          />
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
    // marginTop: StatusBar.currentHeight
  }
});

export default Transport;
