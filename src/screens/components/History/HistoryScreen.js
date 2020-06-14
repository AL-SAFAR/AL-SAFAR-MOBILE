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
// import CarCard from "./Car/CarCard";
const bookings = [
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
const HistoryScreen = ({ navigation }) => {
  const type = navigation.getParam("type");
  const renderCards = (type) => {
    if (type === "car") {
      return bookings.map((book) => {
        return <CarCard navigation={navigation} key={book.id} book={book} />;
      });
    } else if (type === "hotel") {
      return <Text>Hotel</Text>;
    } else if (type === "guide") {
      return <Text>Guide</Text>;
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
