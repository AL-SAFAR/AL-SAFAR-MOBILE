import React, { useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { globalStyles } from "../../../../styles/global";
import Loader from "../layout/Loader";
import PropTypes from "prop-types";
import { getGuideBookings } from "../../actions/guideActions";
import { getCarBookings } from "../../actions/transportActions";
import { getHotelBookings } from "../../actions/hotelActions";
import { getAgentBookings } from "../../actions/agentActions";
// import { openChat, sendMessage, clearChat } from "../../actions/hotelActions";
import { connect } from "react-redux";

import { Ionicons } from "@expo/vector-icons";
import CarCard from "./Car/CarCard";
import HotelCard from "./Hotel/HotelCard";
import GuideCard from "./Guide/GuideCard";
import AgentCard from "./Agent/AgentCard";
const agentBookings = [
  {
    id: 1,
    startDate: new Date("2020/01/20"),
    endDate: new Date("2020/02/10"),
    charges: 9000,
    profileImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 2,
    startDate: new Date("2020/01/20"),
    endDate: new Date("2020/02/10"),
    charges: 9000,
    profileImage:
      "https://images.unsplash.com/photo-1545167622-3a6ac756afa4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60",
  },
  {
    id: 3,
    startDate: new Date("2020/01/20"),
    endDate: new Date("2020/02/10"),
    charges: 9000,
    profileImage:
      "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60",
  },
];
const HistoryScreen = ({
  navigation,
  getGuideBookings,
  getCarBookings,
  getHotelBookings,
  getAgentBookings,
  guide: { guideBookings, loading },
  transport: { carBookings },
  hotel: { hotelBookings },
  agent: { agentBookings },
}) => {
  const type = navigation.getParam("type");
  const renderCards = (type) => {
    if (type === "car") {
      if (carBookings.length < 1) {
        return (
          <Text
            style={{
              // justifyContent: "center",
              // alignItems: "center",
              color: "red",
              fontSize: 24,
              fontWeight: "700",
            }}
          >
            No Bookings to Show
          </Text>
        );
      } else {
        return carBookings.map((book) => {
          return <CarCard navigation={navigation} key={book._id} book={book} />;
        });
      }
    } else if (type === "hotel") {
      if (hotelBookings.length < 1) {
        return (
          <Text
            style={{
              // justifyContent: "center",
              // alignItems: "center",
              color: "red",
              fontSize: 24,
              fontWeight: "700",
            }}
          >
            No Bookings to Show
          </Text>
        );
      } else {
        return hotelBookings.map((hotel) => {
          return <HotelCard key={hotel._id} hotel={hotel} />;
        });
      }
    } else if (type === "guide") {
      if (hotelBookings.length < 1) {
        return (
          <Text
            style={{
              // justifyContent: "center",
              // alignItems: "center",
              color: "red",
              fontSize: 24,
              fontWeight: "700",
            }}
          >
            No Bookings to Show
          </Text>
        );
      } else {
        return guideBookings.map((guideBooking) => {
          return (
            <GuideCard guideBooking={guideBooking} key={guideBooking._id} />
          );
        });
      }
    } else if (type === "agent") {
      if (agentBookings.length < 1) {
        return (
          <Text
            style={{
              // justifyContent: "center",
              // alignItems: "center",
              color: "red",
              fontSize: 24,
              fontWeight: "700",
            }}
          >
            No Bookings to Show
          </Text>
        );
      } else {
        return agentBookings.map((agentBooking) => {
          return (
            <AgentCard agentBooking={agentBooking} key={agentBooking._id} />
          );
        });
      }
    }
  };
  useEffect(() => {
    if (type === "car") {
      getCarBookings();
    } else if (type === "guide") {
      getGuideBookings();
    } else if (type === "hotel") {
      getHotelBookings();
    } else if (type === "agent") {
      getAgentBookings();
    }
  }, []);
  if (loading || (guideBookings === null && type === "guide")) {
    return <Loader />;
  }
  if (loading || (carBookings === null && type === "car")) {
    return <Loader />;
  }
  if (loading || (hotelBookings === null && type === "hotel")) {
    return <Loader />;
  }
  if (loading || (agentBookings === null && type === "agent")) {
    return <Loader />;
  }
  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={globalStyles.titleBar}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Drawer", { screen: "History" })}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: 40,
                height: 40,
                borderRadius: 100,
                backgroundColor: "black",
              }}
            >
              <Ionicons name="ios-arrow-back" size={24} color="#fff"></Ionicons>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          {renderCards(type)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

HistoryScreen.propTypes = {
  guide: PropTypes.object.isRequired,
  transport: PropTypes.object.isRequired,
  hotel: PropTypes.object.isRequired,
  agent: PropTypes.object.isRequired,
  getGuideBookings: PropTypes.func.isRequired,
  getCarBookings: PropTypes.func.isRequired,
  getHotelBookings: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  guide: state.guide,
  transport: state.transport,
  hotel: state.hotel,
  agent: state.agent,
  //   receiver: navigation.getParam("receivingUser"),
});

// export default connect(mapState)(Chat);
export default connect(mapStateToProps, {
  getGuideBookings,
  getHotelBookings,
  getCarBookings,
  getAgentBookings,
})(HistoryScreen);
