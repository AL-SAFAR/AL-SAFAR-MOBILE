import React from "react";
import { View, Text, Image, StatusBar } from "react-native";
import Agent from "./components/Travel/Agent";
import { ScrollView } from "react-native-gesture-handler";

const Travel = () => {
  return (
    <ScrollView
      vertical
      showsVerticalScrollIndicator={false}
      style={{
        marginTop: StatusBar.currentHeight
      }}
    >
      <Text style={{ paddingHorizontal: 20, fontSize: 24, fontWeight: "700" }}>
        Meet our Travel Agents!
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Agent
          placeUri={{
            uri:
              "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=753&q=80"
          }}
          placePrice={139}
          agentPic={{ uri: "https://uinames.com/api/photos/female/7.jpg" }}
          placeName={"Walk to the Beach / Lay at the beach"}
          placeDescription={"Entire Home • 27 reviews • Karachi"}
        />
        <Agent
          placeUri={{
            uri:
              "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
          }}
          placePrice={102}
          agentPic={{ uri: "https://uinames.com/api/photos/male/19.jpg" }}
          placeName={"Infinity Pool"}
          placeDescription={"40 reviews • Islamabad"}
        />
        <Agent
          placeUri={{
            uri:
              "https://images.unsplash.com/photo-1502252430442-aac78f397426?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
          }}
          placePrice={102}
          agentPic={{ uri: "https://uinames.com/api/photos/female/19.jpg" }}
          placeName={"Walk at Fairy Meadows "}
          placeDescription={"40 reviews • Gilgit"}
        />
      </ScrollView>

      <View style={{ marginTop: 20 }}>
        <Text
          style={{ paddingHorizontal: 20, fontSize: 22, fontWeight: "700" }}
        >
          Just for the Weekend
        </Text>
        <Agent
          placeUri={{
            uri:
              "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
          }}
          placePrice={80}
          agentPic={{ uri: "https://uinames.com/api/photos/female/19.jpg" }}
          placeName={"Umaid Bhawan Palace"}
          placeDescription={"Entire Palace • 27 reviews • Karachi"}
        />
        <Agent
          placeUri={{
            uri:
              "https://images.unsplash.com/photo-1561486008-1011a284acfb?ixlib=rb-1.2.1&auto=format&fit=crop&w=747&q=80"
          }}
          placePrice={90}
          agentPic={{ uri: "https://uinames.com/api/photos/female/14.jpg" }}
          placeName={"Buckingham Palace"}
          placeDescription={"Entire Palace • 27 reviews • London"}
        />
      </View>
    </ScrollView>
  );
};

export default Travel;
