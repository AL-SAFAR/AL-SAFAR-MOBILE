import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { globalStyles } from "../../../../styles/global";
import { Ionicons } from "@expo/vector-icons";
import CarCard from "./Car/CarCard";
import HotelCard from "./Hotel/HotelCard";
import GuideCard from "./Guide/GuideCard";
const carbookings = [
  {
    id: 1,
    pickUp: {
      name: "Kohati Bazar",
      latitude: 33.62193060000001,
      longitude: 73.0645363,
    },
    dropOff: {
      name: "Satellite Town",
      latitude: 33.6412348,
      longitude: 73.0634749,
    },
  },
  {
    id: 2,
    pickUp: {
      name: "Kohati Bazar",
      latitude: 33.62193060000001,
      longitude: 73.0645363,
    },
    dropOff: {
      name: "Satellite Town",
      latitude: 33.6412348,
      longitude: 73.0634749,
    },
  },
];
const hotelbookings = [
  {
    id: 1,
    fromDate: new Date("2020/01/20"),
    toDate: new Date("2020/02/10"),
    charges: 9000,
  },
  {
    id: 2,
    fromDate: new Date("2020/01/20"),
    toDate: new Date("2020/02/10"),
    charges: 9000,
  },
];
const guidebooking = [
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
const HistoryScreen = ({ navigation }) => {
  const type = navigation.getParam("type");
  const renderCards = (type) => {
    if (type === "car") {
      return carbookings.map((book) => {
        return <CarCard navigation={navigation} key={book.id} book={book} />;
      });
    } else if (type === "hotel") {
      return hotelbookings.map((hotel) => {
        return <HotelCard key={hotel.id} hotel={hotel} />;
      });
    } else if (type === "guide") {
      return guidebooking.map((guide) => {
        return <GuideCard guide={guide} key={guide.id} />;
      });
    }
  };
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

export default HistoryScreen;
