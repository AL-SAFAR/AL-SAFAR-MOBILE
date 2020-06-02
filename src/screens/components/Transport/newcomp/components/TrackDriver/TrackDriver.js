import React, { useEffect } from "react";
import { View, Text, Dimensions, Platform } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Constants from "expo-constants";

import {
  getCurrentLocation,
  getDriverInfo,
  getDriverLocation,
} from "../../../../../actions/trackDriverAction";
// import MapTrack from "./MapTrack";
import DriverFound from "./DriverFound";
import DriverFooterProfile from "./DriverFooterProfile";
import DriverOnTheWayFooter from "./DriverOnTheWayFooter";
const carMarker = require("../../../../../../../assets/car.png");
var width = Dimensions.get("window").width; //full width
var height = Dimensions.get("window").height; //full width

const TrackDriver = ({
  navigation,
  transport: { selectedAddress },
  trackDriver: {
    region,
    driverInfo,
    driverLocation,
    showDriverFound,
    showCarMarker,
  },
  getCurrentLocation,
  getDriverInfo,
  getDriverLocation,
}) => {
  useEffect(() => {
    if (Platform.OS === "android" && !Constants.isDevice) {
      seterrorMessage(
        "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      );
    } else {
      getCurrentLocation();
    }
  }, []);

  useEffect(() => {
    getCurrentLocation();
    getDriverInfo();
  }, []);
  // region = {
  //   latitude: 33.628171,
  //   longitude: 73.062621,
  //   latitudeDelta: 0.0922,
  //   longitudeDelta: 0.051862500000000006,
  // };
  return (
    <View style={styles.container}>
      {/* {region && (
        <MapTrack
          driverLocation={driverLocation}
          selectedAddress={selectedAddress}
          region={region}
          showCarMarker={showCarMarker}
          carMarker={carMarker}
        />
      )} */}
      {/* <DriverOnTheWayFooter driverInfo={driverInfo} /> */}
      {/* <DriverFooterProfile driverInfo={driverInfo} /> */}

      {showDriverFound && (
        <DriverFound
          driverInfo={driverInfo}
          getDriverLocation={getDriverLocation}
        />
      )}
    </View>
  );
};
const styles = {
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // marginTop: StatusBar.currentHeight,
    height: height - 70,
  },
};
TrackDriver.propTypes = {
  getCurrentLocation: PropTypes.func.isRequired,
  getDriverInfo: PropTypes.func.isRequired,
  transport: PropTypes.object.isRequired,
  trackDriver: PropTypes.object.isRequired,
  getDriverLocation: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  transport: state.transport,
  trackDriver: state.trackDriver,
});

export default connect(mapStateToProps, {
  getCurrentLocation,
  getDriverInfo,
  getDriverLocation,
})(TrackDriver);
