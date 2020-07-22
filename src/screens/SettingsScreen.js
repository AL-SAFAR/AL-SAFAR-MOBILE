import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  AsyncStorage,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { globalStyles } from "../../styles/global";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import axios from "axios";
import { ListItem, Button, Icon, Left, Body, Right, Switch } from "native-base";
import { Madoka } from "react-native-textinput-effects";
import { DEFAULT_IMAGE } from "../../key.json";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Root, Popup } from "popup-ui"; // import { reduxForm } from "redux-form";
import { editProfile, test } from "./actions/authActions";

const SettingsScreen = ({ navigation, auth: { user }, editProfile }) => {
  // console.log(user);
  const [ProfileImage, setProfileImage] = useState(
    user.Image ? user.Image : DEFAULT_IMAGE
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
      quality: 0.1,
    });

    if (!result.cancelled) {
      let base64Img = `data:image/jpg;base64,${result.base64}`;

      //Add your cloud name
      let apiUrl = "https://api.cloudinary.com/v1_1/al-safar435/image/upload";

      let data = {
        file: base64Img,
        upload_preset: "CustomerImages",
      };
      axios
        .post(apiUrl, data, {
          "content-type": "application/json",
          timeout: 1000,
        })
        .then(async (r) => {
          let result = r.data;
          // console.log(result);
          // this.setState({ image: result.uri })
          AsyncStorage.getItem("user")
            .then((data) => {
              // the string value read from AsyncStorage has been assigned to data
              console.log(data);

              // transform it back to an object
              data = JSON.parse(data);
              console.log(data);

              // Decrement
              data.Image = result.secure_url;
              console.log(data);
              setProfileImage(result.secure_url);

              //save the value to AsyncStorage again
              AsyncStorage.setItem("user", JSON.stringify(data));
            })
            .done();
          const formbody = {
            Image: result.secure_url,
          };
          editProfile(formbody);
          // return data.secure_url
        })
        .catch((err) => console.log(err));

      // fetch(apiUrl, {
      //   body: JSON.stringify(data),
      //   headers: {
      //     "content-type": "application/json",
      //   },
      //   method: "POST",
      // })
      //   .then(async (r) => {
      //     let data = await r.json();
      //     console.log(data);
      //     // this.setState({ image: result.uri })
      //     setProfileImage(result.uri);
      //     // return data.secure_url
      //   })
      //   .catch((err) => console.log(err));
    }
  };
  const [enablePass, setenablePass] = useState(false);
  const [password, setPassword] = useState("");
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
            {user.name}
          </Text>
        </View>
        <View style={{ marginTop: 10 }}>
          <ListItem
            icon
            style={styles.listitem}
            onPress={() => navigation.navigate("EditProfile")}
          >
            <Left>
              <Button style={{ backgroundColor: "#007AFF" }}>
                <Icon active name="edit" type="AntDesign" />
              </Button>
            </Left>
            <Body>
              <Text>Edit Profile</Text>
            </Body>
            <Right>
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem
            icon
            style={styles.listitem}
            onPress={() => {
              setenablePass(true);
            }}
          >
            <Left>
              <Button style={{ backgroundColor: "#FF9501" }}>
                <Icon active name="airplane" />
              </Button>
            </Left>
            <Body>
              <Text>Change Password</Text>
            </Body>
            <Right>
              <Text>******</Text>
              <Icon active name="arrow-forward" color="#0099ff" />
            </Right>
          </ListItem>
          {enablePass && (
            <View style={{ marginHorizontal: 10, padding: 10 }}>
              <Madoka
                label={"Password"}
                // this is used as active and passive border color
                borderColor={"#0099ff"}
                inputPadding={16}
                labelHeight={24}
                value={password}
                onChangeText={(text) => setPassword(text)}
                labelStyle={{ color: "#0099ff" }}
                inputStyle={{ color: "#0099ff" }}
              />
            </View>
          )}
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
  listitem: {
    marginVertical: 10,
  },
});
SettingsScreen.propTypes = {
  auth: PropTypes.object.isRequired,
  editProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { editProfile })(SettingsScreen);
