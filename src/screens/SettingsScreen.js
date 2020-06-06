import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { globalStyles } from "../../styles/global";

const SettingsScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ ...styles.container, ...globalStyles.container }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={globalStyles.titleBar}>
          <TouchableOpacity
            onPress={() => navigation.navigate("HomeNavigation")}
          >
            <Ionicons
              name="ios-arrow-back"
              size={24}
              color="#52575D"
            ></Ionicons>
          </TouchableOpacity>
        </View>
        <View style={{ alignSelf: "center" }}>
          <View style={styles.profileImage}>
            <Image
              source={{
                uri:
                  "https://images.unsplash.com/photo-1591238856576-44bf9f35c141?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60",
              }}
              style={styles.image}
              resizeMode="cover"
            ></Image>
          </View>
          <View style={styles.add}>
            <Text style={{ color: "#DFD8C8", fontSize: 14 }}>Hire</Text>
          </View>
        </View>
        <View style={styles.infoContainer}>
          <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>
            Sophie Turner
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
  },
  profileImage: {
    width: 200,
    height: 200,
    overflow: "hidden",
  },
  text: {
    color: "#52575D",
  },
  add: {
    backgroundColor: "#41444B",
    position: "absolute",
    bottom: 5,
    right: 0,
    width: 60,
    height: 30,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  infoContainer: {
    alignSelf: "center",
    alignItems: "center",
    marginTop: 16,
  },
});
export default SettingsScreen;
