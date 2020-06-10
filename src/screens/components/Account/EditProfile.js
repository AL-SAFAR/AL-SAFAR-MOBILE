import React, { useState, useEffect } from "react";
import {
  StatusBar,
  SafeAreaView,
  Button,
  ScrollView,
  KeyboardAvoidingView,
  Text,
  ImageBackground,
  View,
  TouchableOpacity,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { globalStyles } from "../../../../styles/global";

import { Container, Header, Content } from "native-base";
// import {
//   CreditCardInput,
//   LiteCreditCardInput,
// } from "react-native-credit-card-input";
// <LiteCreditCardInput onChange={_onChange} />
import { Madoka } from "react-native-textinput-effects";
const EditProfile = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const SubmitForm = () => {
    console.log(name, email, mobile);
  };
  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView>
        {/* <ImageBackground
          source={require("../../../../assets/patterns/editbg.jpg")}
          style={{ width: undefined, justifyContent: "center" }}
        > */}
        <View
          style={[
            globalStyles.titleBar,
            {
              paddingBottom: 10,
              borderBottomWidth: 1,
              borderBottomColor: "#0099ff",
              borderStyle: "dotted",
            },
          ]}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("SettingsScreen")}
          >
            <Ionicons
              name="ios-arrow-back"
              size={24}
              color="#0099ff"
            ></Ionicons>
          </TouchableOpacity>

          <Text
            style={{
              fontSize: 16,
              fontWeight: "700",
              // paddingHorizontal: 20,
              // marginVertical: 10,
              color: "#0099ff",
            }}
          >
            Edit Profile
          </Text>
        </View>
        {/* </ImageBackground> */}

        <View style={globalStyles.formContainer}>
          <Madoka
            label={"Name"}
            // this is used as active and passive border color
            borderColor={"#0099ff"}
            inputPadding={16}
            labelHeight={24}
            value={name}
            onChangeText={(text) => setName(text)}
            labelStyle={{ color: "#0099ff" }}
            inputStyle={{ color: "#0099ff" }}
          />
          <Madoka
            label={"Email"}
            // this is used as active and passive border color
            borderColor={"#0099ff"}
            inputPadding={16}
            labelHeight={24}
            value={email}
            keyboardType="email-address"
            autoCompleteType="email"
            textContentType="emailAddress"
            onChangeText={(text) => setEmail(text)}
            labelStyle={{ color: "#0099ff" }}
            inputStyle={{ color: "#0099ff" }}
          />
          <Madoka
            label={"Mobile"}
            // this is used as active and passive border color
            borderColor={"#0099ff"}
            inputPadding={16}
            labelHeight={24}
            value={mobile}
            keyboardType="phone-pad"
            onChangeText={(text) => setMobile(text)}
            labelStyle={{ color: "#0099ff" }}
            inputStyle={{ color: "#0099ff" }}
          />
          <TouchableOpacity onPress={SubmitForm}>
            <View style={globalStyles.button}>
              <Text style={globalStyles.buttonText}>Save</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = {
  label: { color: "#0099ff" },
};
export default EditProfile;
