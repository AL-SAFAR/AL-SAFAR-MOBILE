import React, { useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Dimensions,
  StatusBar,
  FlatList,
} from "react-native";
import { connect } from "react-redux";
import Hotel from "./components/Hotel/Hotel";
import Category from "./components/Explore/Category";
import { ScrollView } from "react-native-gesture-handler";
import { globalStyles } from "../../styles/global";
import PropTypes from "prop-types";
import Loader from "./components/layout/Loader";
import SearchBar from "./components/layout/SearchBar";

import { getHotels, searchHotels } from "./actions/hotelActions";
const { height, width } = Dimensions.get("window");
const Booking = ({
  navigation,
  hotel: { hotels, loading },
  getHotels,
  searchHotels,
}) => {
  useEffect(() => {
    getHotels();
    //eslint-disable-next-line
  }, []);
  // const { hotelName, address } = hotels;
  if (loading || hotels === null) {
    return <Loader />;
  }
  // constonChange = text => {
  //   console.log(text);
  //   searchHotels(text);
  // };
  return (
    <ScrollView
      vertical
      showsVerticalScrollIndicator={false}
      style={globalStyles.container}
    >
      <Text style={{ fontSize: 24, fontWeight: "700", paddingHorizontal: 20 }}>
        What can we help you find?
      </Text>
      <SearchBar search={searchHotels} />
      <View style={{ height: 130, marginTop: 20 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Category
            imageUri={require("../../assets/home.jpg")}
            Name="Islamabad"
            searchHotels={searchHotels}
          />
          <Category
            imageUri={require("../../assets/restaurant.jpg")}
            Name="Karachi"
            searchHotels={searchHotels}

            // onPress={searchHotels("Karachi")}
          />
          <Category
            imageUri={require("../../assets/experiences.jpg")}
            Name="Gilgit"
            searchHotels={searchHotels}

            // onPress={searchHotels("Gilgit")}
          />
          <Category
            imageUri={{
              uri:
                "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
            }}
            Name="Kashmir"
            searchHotels={searchHotels}

            // onPress={searchHotels("Kashmir")}
          />
        </ScrollView>
      </View>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "700",
          paddingHorizontal: 20,
          marginTop: 15,
        }}
      >
        Hotels around Pakistan
      </Text>
      <View
        style={{
          paddingHorizontal: 20,
          marginTop: 20,
          // alignItems: "stretch",
          flexDirection: "row",
          flexWrap: "wrap",
          marginHorizontal: "auto",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        {hotels.length === 0 ? (
          <Text style={{ color: "red", justifyContent: "center" }}>
            No Hotels To Show
          </Text>
        ) : null}
        {hotels.map((hotel) => {
          return (
            <Hotel
              key={hotel._id}
              navigation={navigation}
              width={width}
              hotelName={hotel.hotelName}
              hotel={hotel}
              city={hotel.city}
              rent={hotel.rent}
              starRating={parseInt(hotel.starRating)}
              imageUri={{ uri: hotel.hotelImages[0] }}
            />
          );
        })}
      </View>

      {/* <Hotel
          // navigation={navigation}
          width={width}
          name="The Charming Place"
          type="SHARED ROOM - 4 BEDS"
          price={90}
          rating={4.5}
          imageUri={{
            uri:
              "https://images.unsplash.com/photo-1553653924-39b70295f8da?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80 "
          }}
        />
        <Hotel
          // navigation={navigation}
          width={width}
          name="The Convenient Place"
          type="ENTIRE PLACE - 4 BEDS"
          price={112}
          rating={4}
          imageUri={{
            uri:
              "https://images.unsplash.com/photo-1564501049559-0b54b6f0dc1b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=889&q=80"
          }}
        />
        <Hotel
          // navigation={navigation}
          width={width}
          name="The Cozy Place"
          type="PRIVATE ROOM - 2 BEDS"
          price={82}
          rating={4}
          imageUri={{
            uri:
              "https://images.unsplash.com/photo-1570214476695-19bd467e6f7a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
          }}
        />
        <Hotel
          // navigation={navigation}
          width={width}
          name="The Cozy Place"
          type="PRIVATE ROOM - 2 BEDS"
          price={82}
          rating={4}
          imageUri={{
            uri:
              "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=889&q=80 "
          }}
        /> */}
    </ScrollView>
  );
};

Booking.propTypes = {
  hotel: PropTypes.object.isRequired,
  getHotels: PropTypes.func.isRequired,
  // searchHotels: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  hotel: state.hotel,
});

export default connect(mapStateToProps, { getHotels, searchHotels })(Booking);
