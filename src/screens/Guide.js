import React, { useEffect } from "react";
import { View, Button, Text, Image, StatusBar } from "react-native";
import { connect } from "react-redux";

import TravelGuide from "./components/Guide/TravelGuide";
import { ScrollView } from "react-native-gesture-handler";
import { globalStyles } from "../../styles/global";
import PropTypes from "prop-types";
import { getGuides } from "./actions/guideActions";
import Loader from "./components/layout/Loader";


const Guide = ({
  navigation,
  guide: { guides, loading },
  getGuides
}) => {
  useEffect(() => {
    getGuides();
    //eslint-disable-next-line
  }, []);
  if (loading || guides === null) {
    return <Loader />;
  }
  var city = {}
  var filterByCity = guides.filter(function (entry) {
    if (city[entry.location]) {
      return false;
    }
    city[entry.location] = true;
    return true;
  });

  return (
    <View style={globalStyles.container}>
      <ScrollView vertical showsVerticalScrollIndicator={false}>
        <Text
          style={{ paddingHorizontal: 20, fontSize: 24, fontWeight: "700" }}
        >
          Meet our Guides!
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {guides.length === 0 ? (
            <Text style={{ color: "red", justifyContent: "center" }}>
              No Guides To Show
          </Text>
          ) : null}
          {guides.map(guide => {
            return (
              <TravelGuide
                key={guide.id}

                navigation={navigation}
                guide={guide}
              />)
          })}
        </ScrollView>

        <View style={{ marginTop: 20 }}>
          <Text
            style={{ paddingHorizontal: 20, fontSize: 22, fontWeight: "700" }}
          >
            Top Guides
          </Text>
          {filterByCity.map(guide => {
            return (
              <TravelGuide
                key={guide.id}

                navigation={navigation}
                guide={guide}
              />)
          })}
          {/* <TravelGuide
            placeUri={{
              uri:
                "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
            }}
            placePrice={80}
            guidePic={{ uri: "https://uinames.com/api/photos/female/19.jpg" }}
            placeName={"Umaid Bhawan Palace"}
            placeDescription={"Entire Palace • 27 reviews • Karachi"}
          />
          <TravelGuide
            placeUri={{
              uri:
                "https://images.unsplash.com/photo-1561486008-1011a284acfb?ixlib=rb-1.2.1&auto=format&fit=crop&w=747&q=80"
            }}
            placePrice={90}
            guidePic={{ uri: "https://uinames.com/api/photos/female/14.jpg" }}
            placeName={"Buckingham Palace"}
            placeDescription={"Entire Palace • 27 reviews • London"}
          /> */}
        </View>
      </ScrollView>
    </View>
  );
};
Guide.propTypes = {
  guide: PropTypes.object.isRequired,
  getGuides: PropTypes.func.isRequired
  // searchHotels: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  guide: state.guide
});

export default connect(mapStateToProps, { getGuides })(Guide);
