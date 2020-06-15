import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
const { width, height } = Dimensions.get("window");
import { Entypo } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import moment from "moment";

const GuideCard = ({
  guide: { startDate, endDate, profileImage, charges, id },
}) => {
  const gradients = [
    ["#1131FF", "#AFBAFF"],
    ["#FF0011", "#FFAAAB"],
    ["#0E7E15", "#B2D6B4"],
  ];
  const gradient = gradients[Math.floor(Math.random() * (3 - 0) + 0)];
  // const img = `https://source.unsplash.com/1600x900/?face/${id}`;
  startDate = moment(startDate).format("DD MMM YYYY");
  endDate = moment(endDate).format("DD MMM YYYY");

  return (
    <LinearGradient
      colors={gradient}
      start={[0, 0]}
      end={[1, 0]}
      style={styles.card}
    >
      <View style={{ flexGrow: 1, flexDirection: "row" }}>
        <View style={styles.details}>
          <View
            style={{
              alignSelf: "flex-start",
              marginVertical: 20,
              marginLeft: 20,
            }}
          >
            <Text style={{ marginBottom: 20, fontSize: 20, color: "#fff" }}>
              Jamshed Akhtar
            </Text>
            <View style={{ alignItems: "flex-start", marginBottom: 20 }}>
              <Text style={styles.heading}>Start Date</Text>
              <Text style={styles.data}>{startDate}</Text>
            </View>

            <View style={{ alignItems: "flex-start" }}>
              <Text style={styles.heading}>End Date</Text>
              <Text style={styles.data}>{endDate}</Text>
            </View>
          </View>
        </View>
        <View style={styles.details}>
          <View
            style={{
              alignSelf: "flex-end",
              marginVertical: 20,

              marginRight: 20,
            }}
          >
            <View style={styles.profileImage}>
              <Image
                source={{ uri: profileImage }}
                style={styles.image}
                // resizeMode="cover"
              ></Image>
            </View>
            <View style={{ marginVertical: 10, alignItems: "center" }}>
              <Text style={styles.heading}>Charges</Text>
              <Text style={styles.data}>{charges} PKR</Text>
            </View>
          </View>
          {/* <View
            style={{
              alignSelf: "flex-end",
              marginBottom: 20,
              marginRight: 20,
            }}
          >
            <Text style={styles.data}>DISTANCE</Text>
            <Text style={{ fontSize: 12 }}>1.2 KM</Text>
          </View> */}
        </View>
      </View>
    </LinearGradient>
  );
};

export default GuideCard;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 10,
    height: 200,
    backgroundColor: "#000",
    width: width * 0.9,
    borderRadius: 25,
    borderWidth: null,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 6,
  },
  details: {
    flexDirection: "column",
    flexGrow: 1,
    // marginVertical: 5,
    justifyContent: "flex-start",
    // justifyContent: "center",
    alignItems: "center",
  },
  image: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 180,
    height: undefined,
    width: undefined,
  },
  profileImage: {
    width: 100,
    height: 100,
    overflow: "hidden",
  },
  data: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  heading: { fontSize: 12, color: "#fff" },
  tripDetails: {
    alignItems: "center",
    // paddingTop: 50,
    // paddingBottom: 0,
    // justifyContent: "flex-end",
  },
});
