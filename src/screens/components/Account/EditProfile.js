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
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Root, Popup } from "popup-ui"; // import { reduxForm } from "redux-form";
import { globalStyles } from "../../../../styles/global";

import { Container, Header, Content } from "native-base";
// import {
//   CreditCardInput,
//   LiteCreditCardInput,
// } from "react-native-credit-card-input";
// <LiteCreditCardInput onChange={_onChange} />
import { Madoka } from "react-native-textinput-effects";
import { editProfile, test } from "../../actions/authActions";

const EditProfile = ({ navigation, auth: { user }, editProfile }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [mobile, setMobile] = useState(user.mobile ? user.mobile : "");
  const SubmitForm = async () => {
    const formbody = {
      name,
      email,
      mobile,
    };
    // console.log(name, email, mobile);
    if (formbody.email === "") {
      Popup.show({
        type: "Warning",
        title: "Field Incomplete",
        textBody: "Email Field Cannot be Empty",
        buttontext: "Understood",
        callback: () => Popup.hide(),
      });
      // Alert.alert("OOPS!", "Please Fill the Email field", [
      //   { text: "Understood", onPress: () => console.log("alert closed") },
      // ]);
    } else if (formbody.name === "") {
      Popup.show({
        type: "Warning",
        title: "Field Incomplete",
        textBody: "Name Field Cannot be Empty",
        buttontext: "Understood",
        callback: () => Popup.hide(),
      });
    } else if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formbody.email)
    ) {
      Popup.show({
        type: "Danger",
        title: "Invalid Email",
        textBody: "Enter a Valid Email",
        buttontext: "Try again",
        callback: () => Popup.hide(),
      });
    } else {
      editProfile(formbody).then((res) => {
        // console.log(res);
        if (res) {
          // navigation.navigate("App");
          Popup.show({
            type: "Success",
            title: "Profile Updated",
            button: false,
            textBody: "Profile has been Updated",
            buttontext: "Ok",
            callback: () => {
              Popup.hide();
              // setModalOpen(false);
            },
          });
        } else {
          Popup.show({
            type: "Danger",
            title: "Invalid Credentials",
            textBody: "Please recheck your Credentials",
            buttontext: "Try again",
            callback: () => Popup.hide(),
          });
        }
      });
    }
    Keyboard.dismiss();
  };
  return (
    <Root>
      <SafeAreaView style={globalStyles.container}>
        {/* <ImageBackground
          source={require("../../../../assets/patterns/editbg.jpg")}
          style={{ width: undefined, justifyContent: "center" }}
        > */}
        {/* <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={100}> */}
        <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={10}>
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
              onPress={() =>
                navigation.navigate("Drawer", { screen: "Settings" })
              }
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
              maxLength={11}
              value={mobile}
              keyboardType="phone-pad"
              onChangeText={(text) => {
                // if (text.length > 11) {
                // setMobile(text.substring(0, 11));
                // console.log(mobile);
                // } else {
                setMobile(text);
                // }
                // setMobile(text);
              }}
              labelStyle={{ color: "#0099ff" }}
              inputStyle={{ color: "#0099ff" }}
            />
            <TouchableOpacity onPress={SubmitForm}>
              <View style={globalStyles.button}>
                <Text style={globalStyles.buttonText}>Save</Text>
              </View>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Root>
    // </KeyboardAvoidingView>
  );
};
const styles = {
  label: { color: "#0099ff" },
};
EditProfile.propTypes = {
  auth: PropTypes.object.isRequired,
  editProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { editProfile })(EditProfile);
