import React from "react";
import { View, Text, StatusBar } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import TravelGuide from "./components/Guide/TravelGuide";

const Guide = () => {
  return (
    <ScrollView
      vertical
      showsVerticalScrollIndicator={false}
      style={{
        marginTop: StatusBar.currentHeight
      }}
    >
      <Text style={{ paddingHorizontal: 20, fontSize: 24, fontWeight: "700" }}>
        Tour Guides
      </Text>
      <TravelGuide
        placeUri={{
          uri:
            "https://images.unsplash.com/photo-1503971090465-19d3c80f81f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=845&q=80"
        }}
        placeName={"Lahore"}
        duration={"8 hours"}
        placeDes={
          "Among the most popular sights are the Lahore Fort, adjacent to the Walled City, and home to the Sheesh Mahal, the Alamgiri Gate, the Naulakha pavilion, and the Moti Masjid."
        }
      />
      <TravelGuide
        placeUri={{
          uri:
            "https://images.unsplash.com/photo-1470756544705-1848092fbe5f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1488&q=80"
        }}
        placeName={"Islamabad"}
        duration={"4 hours"}
        placeDes={
          "Daman-i-Koh, Margalla Zoo, Pakistan Monument, Faisal Mosque, Shakarparian, Lok Virsa Museum and Rawal lake view point are among the top tourist attractions in Islamabad. There are many spots for rock climbing in Margalla Hills"
        }
      />
      <TravelGuide
        placeUri={{
          uri:
            "https://images.unsplash.com/photo-1533548036275-b79603f53145?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
        }}
        placeName={"Multan"}
        duration={"2 hours"}
        placeDes={
          "Mausoleum of Baha-ud-Din Zakariya, Mausoleum of Shah Rukn-e-Alam, Mausoleum of Shah Shams Sabzwari are among the top tourist attractions in Multan."
        }
      />
    </ScrollView>
  );
};

export default Guide;
