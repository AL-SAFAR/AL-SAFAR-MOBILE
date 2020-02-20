import React, { Component, useState, useEffect } from "react";
import {
  Platform,
  Alert,
  ScrollView,
  View,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
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
import { GoogleAutoComplete } from "react-native-google-autocomplete";
import LocationItem from "./components/Transport/LocationItem";
import { API_KEY } from "../../key.json";

import { DestinationBtn } from "./components/Transport/DestinationBtn";
import { CurrentLocationBtn } from "./components/Transport/CurrentLocationBtn";

import Driver from "./components/Transport/Driver";
import CarOptions from "./components/Transport/CarOptions";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const Transport = ({ navigation }) => {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     region: null,
  //     selectedValue: ""
  //   };
  // }

  const [region, setRegion] = useState(null);
  const [destination, setDestination] = useState(null);
  const [destinationRegion, setDestinationRegion] = useState("");
  const [errorMessage, seterrorMessage] = useState("");
  useEffect(() => {
    if (Platform.OS === "android" && !Constants.isDevice) {
      seterrorMessage(
        "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      );
    } else {
      this._getLocationAsync();
    }
  }, []);

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      seterrorMessage("Permission to access location was denied");
    } else {
      console.log("granted");
    }

    let location = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true
    });
    let region = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121
    };
    setRegion(region);
  };

  centerMap = () => {
    const { latitude, longitude, latitudeDelta, longitudeDelta } = region;
    this.map.animateToRegion({
      latitude,
      longitude,
      latitudeDelta,
      longitudeDelta
    });
  };

  update = (region, desc) => {
    setDestinationRegion(region);
    setDestination(desc);
    // console.log(destinationRegion);
    // console.log(destination);
    // console.log("hello" + destination);
  };

  return (
    <View style={styles.container}>
      <GoogleAutoComplete
        apiKey={API_KEY}
        debounce={500}
        minLength={3}
        queryTypes={"geocode"}
        components="country:pk"
      >
        {({
          handleTextChange,
          locationResults,
          fetchDetails,
          inputValue,
          clearSearch,
          isSearching
        }) => (
          <View>
            <DestinationBtn
              handleTextChange={handleTextChange}
              // locationResults={locationResults}
              // fetchDetails={fetchDetails}
              // isSearching={isSearching}
              inputValue={inputValue}
            />
            <View
              style={{
                ...styles.suggestion,
                height: locationResults.length * 40
              }}
            >
              {isSearching && (
                <ActivityIndicator size="large" color="#0099ff" />
              )}
              <ScrollView>
                {locationResults.map(el => (
                  <LocationItem
                    {...el}
                    key={el.id}
                    fetchDetails={fetchDetails}
                    inputValue={destination}
                    isSearching
                    // onPress={async () => {
                    //   const res = await fetchDetails(el.place_id);
                    //   const { lat, lng } = res.geometry.location;
                    //   let region = {
                    //     latitude: lat,
                    //     longitude: lng,
                    //     latitudeDelta: 0.015,
                    //     longitudeDelta: 0.0121
                    //   };
                    //   setDestinationRegion(region);
                    //   setDestination(el.description);
                    //   inputValue = destination;
                    //   clearSearch();
                    // }}
                  />
                ))}
              </ScrollView>
            </View>
          </View>
        )}
      </GoogleAutoComplete>

      <CurrentLocationBtn
        cb={() => {
          this.centerMap();
        }}
      />
      {/* <CarOptions /> */}
      <MapView
        initialRegion={region}
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
        {/* <CarOptions /> */}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // marginTop: StatusBar.currentHeight
    height: height - 70
  },
  suggestion: {
    zIndex: 9,
    position: "absolute",
    flexDirection: "column",
    width: width - 40,
    top: 150,
    left: 20,
    borderRadius: 2,
    backgroundColor: "white",
    alignItems: "center",
    shadowColor: "#000000",
    elevation: 7,
    shadowRadius: 5,
    shadowOpacity: 1.0
  }
});

export default Transport;
