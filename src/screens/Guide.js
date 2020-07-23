import React, { useEffect } from "react";
import { View, Button, Text, Image, StatusBar } from "react-native";
import { connect } from "react-redux";

import TravelGuide from "./components/Guide/TravelGuide";
import { ScrollView } from "react-native-gesture-handler";
import { globalStyles } from "../../styles/global";
import PropTypes from "prop-types";
import { getGuides, filterGuides } from "./actions/guideActions";
import Loader from "./components/layout/Loader";
import SearchBar from "./components/layout/SearchBar";

const Guide = ({
  navigation,
  guide: { guides, loading, filtered },
  getGuides,
  filterGuides,
}) => {
  useEffect(() => {
    getGuides();
    //eslint-disable-next-line
  }, []);
  if (loading || guides === null) {
    return <Loader />;
  }
  var city = {};
  var filterByCity = guides.filter(function (entry) {
    if (city[entry.city]) {
      return false;
    }
    city[entry.city] = true;
    return true;
  });

  return (
    <View style={globalStyles.container}>
      <ScrollView vertical showsVerticalScrollIndicator={false}>
        <SearchBar search={filterGuides} />
        <Text
          style={{
            paddingHorizontal: 20,
            fontSize: 24,
            fontWeight: "700",
            marginTop: 10,
          }}
        >
          Meet our Guides!
        </Text>
        {/* <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {guides.length === 0 ? (
            <Text style={{ color: "red", justifyContent: "center" }}>
              No Guides To Show
            </Text>
          ) : null}
          {guides.map((guide) => {
            return (
              <TravelGuide
                key={guide._id}
                navigation={navigation}
                guide={guide}
              />
            );
          })}
        </ScrollView> */}

        <View style={{ marginTop: 20 }}>
          {filtered !== null
            ? filtered.map((guide) => {
                return (
                  <TravelGuide
                    key={guide._id}
                    navigation={navigation}
                    guide={guide}
                  />
                );
              })
            : guides.map((guide) => {
                return (
                  <TravelGuide
                    key={guide._id}
                    navigation={navigation}
                    guide={guide}
                  />
                );
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
  getGuides: PropTypes.func.isRequired,
  filterGuides: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  guide: state.guide,
});

export default connect(mapStateToProps, { getGuides, filterGuides })(Guide);
