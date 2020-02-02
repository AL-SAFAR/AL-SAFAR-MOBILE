import React from "react";
import { View, Text, Dimensions, StatusBar } from "react-native";
import Home from "./components/Explore/Home";
import Category from "./components/Explore/Category";
import { ScrollView } from "react-native-gesture-handler";

const { height, width } = Dimensions.get("window");
const Booking = () => {
  return (
    <ScrollView
      vertical
      showsVerticalScrollIndicator={false}
      style={{ marginTop: StatusBar.currentHeight + 15 }}
    >
      <Text style={{ fontSize: 24, fontWeight: "700", paddingHorizontal: 20 }}>
        What can we help you find?
      </Text>
      <View style={{ height: 130, marginTop: 20 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Category imageUri={require("../../assets/home.jpg")} Name="Home" />
          <Category
            imageUri={require("../../assets/experiences.jpg")}
            Name="Experiences"
          />
          <Category
            imageUri={require("../../assets/restaurant.jpg")}
            Name="Restaurant"
          />
          <Category
            imageUri={{
              uri:
                "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
            }}
            Name="Hotels"
          />
        </ScrollView>
      </View>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "700",
          paddingHorizontal: 20,
          marginTop: 15
        }}
      >
        Homes around the world
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
          marginBottom: 10
        }}
      >
        <Home
          width={width}
          name="The Cozy Place"
          type="PRIVATE ROOM - 2 BEDS"
          price={82}
          rating={4}
          imageUri={{
            uri:
              "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
          }}
        />
        <Home
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
        <Home
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
        <Home
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
        <Home
          width={width}
          name="The Cozy Place"
          type="PRIVATE ROOM - 2 BEDS"
          price={82}
          rating={4}
          imageUri={{
            uri:
              "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=889&q=80 "
          }}
        />
      </View>
    </ScrollView>
  );
};

export default Booking;
