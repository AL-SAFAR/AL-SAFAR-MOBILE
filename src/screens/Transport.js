import React, { Component, useState, useEffect, Fragment } from "react";
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
import { connect } from "react-redux";
import MapView, { Marker } from "react-native-maps";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";
import * as Location from "expo-location";
import {
  Entypo as En,
  FontAwesome as F,
  AntDesign as AD
} from "@expo/vector-icons";
import { GoogleAutoComplete } from "react-native-google-autocomplete";
// import LocationItem from "./components/Transport/LocationItem";
import { API_KEY } from "../../key.json";
import PropTypes from "prop-types";
import { getCurrentLocation, getSelectedAddress, getInputData, toggleSearchResultmodal, getAddressPredictions } from "./actions/transportActions";

// import { DestinationBtn } from "./components/Transport/DestinationBtn";
import { CurrentLocationBtn } from "./components/Transport/CurrentLocationBtn";
import SearchBox from './components/Transport/newcomp/SearchBox'
import SearchResults from './components/Transport/newcomp/SearchResults'
import Driver from "./components/Transport/Driver";
import FooterComponent from "./components/Transport/newcomp/components/FooterComponent";
// import CarOptions from "./components/Transport/CarOptions";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const Transport = ({ navigation,
  transport: { region, resultType, inputData, loading, predictions },
  getCurrentLocation,
  getInputData,
  getSelectedAddress,
  toggleSearchResultmodal,
  getAddressPredictions

}) => {
  const [destination, setDestination] = useState(null);
  const [destinationRegion, setDestinationRegion] = useState("");
  const [errorMessage, seterrorMessage] = useState("");
  useEffect(() => {
    if (Platform.OS === "android" && !Constants.isDevice) {
      seterrorMessage(
        "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      );
    } else {
      getCurrentLocation();
    }
  }, []);


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
      {/* <GoogleAutoComplete
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

      </GoogleAutoComplete> */}
      <CurrentLocationBtn
        cb={() => {
          this.centerMap();
        }}
      />
      {region.latitude && <MapView
        initialRegion={region}
        showsUserLocation={true}
        rotateEnabled={false}
        // showsTraffic={true}
        ref={map => {
          this.map = map;
        }}
        style={{ flex: 1 }}
      >
        <Marker coordinate={region} pinColor="#0099ff" />

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
      }
      <FooterComponent />

      <GoogleAutoComplete
        apiKey={API_KEY}
        debounce={300}
        minLength={3}
        queryTypes={"geocode"}
        components="country:pk"
      >
        {({ isSearching, inputValue, handleTextChange, locationResults, fetchDetails }) => (

          <Fragment>
            <SearchBox
              locationResults={locationResults}
              inputValue={inputValue}
              toggleSearchResultmodal={toggleSearchResultmodal}
              handleTextChange={handleTextChange}
              getAddressPredictions={getAddressPredictions}
              getInputData={getInputData}
            // fetchDetails={fetchDetails}
            />
            {/* {isSearching && (
              <ActivityIndicator size="large" color="#0099ff" />
            )} */}
            {/* && (resultType.pickUp || resultType.dropOff) */}

            {((!isSearching) && (predictions.length) !== 0)
              &&
              <SearchResults
                getSelectedAddress={getSelectedAddress}
                locationResults={locationResults}
                fetchDetails={fetchDetails}
                predictions={predictions}
              />

            }


          </Fragment>
        )}
      </GoogleAutoComplete>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // marginTop: StatusBar.currentHeight,
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

Transport.propTypes = {
  transport: PropTypes.object.isRequired,
  getCurrentLocation: PropTypes.func.isRequired,
  getInputData: PropTypes.func.isRequired,
  toggleSearchResultmodal: PropTypes.func.isRequired,
  getAddressPredictions: PropTypes.func.isRequired,
  getSelectedAddress: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  transport: state.transport
});

export default connect(mapStateToProps, { getSelectedAddress, getAddressPredictions, getCurrentLocation, getInputData, toggleSearchResultmodal })(Transport);
