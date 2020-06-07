import React, { useState } from "react";
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
import { globalStyles } from "./global";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import axios from "axios";

const SettingsScreen = ({ navigation }) => {
  const [ProfileImage, setProfileImage] = useState(
    "https://images.unsplash.com/photo-1591238856576-44bf9f35c141?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60"
  );
  const pickImage = async () => {
    if (Constants.platform.ios || Constants.platform.android) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
    });

    if (!result.cancelled) {
      let base64Img = `data:image/jpg;base64,${result.base64}`;

      //Add your cloud name
      let apiUrl = "https://api.cloudinary.com/v1_1/al-safar/image/upload";

      let data = {
        file: base64Img,
        upload_preset: "al-safar-upload",
      };

      fetch(apiUrl, {
        body: JSON.stringify(data),
        headers: {
          "content-type": "application/json",
        },
        method: "POST",
      })
        .then(async (r) => {
          let data = await r.json();
          console.log(data);
          // this.setState({ image: result.uri })
          setProfileImage(result.uri);
          // return data.secure_url
        })
        .catch((err) => console.log(err));
    }
  };

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
                uri: ProfileImage,
              }}
              style={styles.image}
              resizeMode="cover"
            ></Image>
          </View>
          <TouchableOpacity style={styles.add} onPress={pickImage}>
            <View>
              <Text style={{ color: "#fff", fontSize: 14 }}>Edit</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          <Text style={[styles.text, { fontWeight: "200", fontSize: 24 }]}>
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
  text: {
    color: "#52575D",
  },
  image: {
    flex: 1,
    borderRadius: 180,
    height: undefined,
    width: undefined,
  },
  profileImage: {
    width: 150,
    height: 150,
    overflow: "hidden",
  },
  add: {
    backgroundColor: "#0099ff",
    position: "absolute",
    bottom: 5,
    right: -5,
    width: 50,
    height: 25,
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
