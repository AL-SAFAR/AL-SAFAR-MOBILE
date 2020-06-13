import React from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { globalStyles } from "../../styles/global";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { CarHistory } from "./components/History/CarHistory";
const BookingHistory = ({ navigation }) => {
  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={require("../../assets/History.png")}
          style={{
            width: undefined,
            // resizeMode: "cover",
            height: 135,
          }}
        >
          <View style={globalStyles.titleBar}>
            <TouchableOpacity
              onPress={() => navigation.navigate("HomeNavigation")}
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
                <Ionicons
                  name="ios-arrow-back"
                  size={24}
                  color="#fff"
                ></Ionicons>
              </View>
            </TouchableOpacity>
          </View>
        </ImageBackground>
        <View
          style={{
            flex: 1,
            alignItems: "center",
          }}
        >
          <Text style={styles.heading}>Trip History</Text>
          <CarHistory />
          <CarHistory />
          <CarHistory />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  heading: {
    fontSize: 32,
    fontWeight: "700",
    color: "#0099ff",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 1,
  },
});
export default BookingHistory;
