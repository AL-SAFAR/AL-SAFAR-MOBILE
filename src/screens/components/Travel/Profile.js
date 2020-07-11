import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Modal,
  TouchableOpacity,
  Image,
  Text,
  Dimensions,
  StyleSheet,
} from "react-native";
import AwesomeButton from "react-native-really-awesome-button";
import { Root, Popup } from "popup-ui"; // import { reduxForm } from "redux-form";
import { CreditCardInput } from "react-native-credit-card-input";
import Comment from "../layout/Comment";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
// import { TouchableOpacity } from "react-native-gesture-handler";
// import { getAgents } from "../../actions/agentActions";
// import { connect } from "react-redux";
// import PropTypes from "prop-types";

import { globalStyles } from "../../../../styles/global";
import PackageCard from "./PackageCard";

// import GuideBookingForm from "../Guide/GuideBookingForm";
const width = Dimensions.get("window").width;
const Profile = ({ navigation }) => {
  const agent = navigation.getParam("agent");
  const chargeCustomer = navigation.getParam("chargeCustomer");
  //   const { places, name, description, city, profileImage } = agent;

  const { AgencyLogo, AgencyLocation, AgencyName, AgencyDescription } = agent;
  // const guide = {
  //   profileImage: { uri: "https://uinames.com/api/photos/female/7.jpg" }
  // }
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const _onChange = (form) => {
    // console.log(form);
    // console.log(form);
    if (form.valid) {
      let payment = {
        number: form.values.number,
        expiry: form.values.expiry,
        cvc: form.values.cvc,
        type: form.values.type,
      };
      setPaymentDetails(payment);
    } else {
      // console.log(form.valid);
    }
  };
  const addtionalInputsProps = {
    number: {
      maxLength: 16,
    },
    cvc: { maxLength: 3 },
  };
  const handleSubmit = async (next) => {
    // console.log();
    if (paymentDetails) {
      let bookdetails = {
        paymentDetails,
        agent,
      };
      // console.log(bookdetails);
      // setProcessing(true);
      chargeCustomer(bookdetails).then((res) => {
        // setProcessing(false);
        if (res === true) {
          console.log("hello");
          next();
          Popup.show({
            type: "Success",
            title: "Booking Completed",
            button: false,
            textBody: "Congrats! Booking successfully done",
            buttontext: "Ok",
            callback: () => {
              Popup.hide();
              setModalOpen(false);
            },
          });
        } else {
          Popup.show({
            type: "Danger",
            title: "Booking failed",
            textBody: "Please try again",
            buttontext: "Try again",
            callback: () => Popup.hide(),
          });
        }
      });
    } else if (
      paymentDetails.number ||
      paymentDetails.expiry ||
      paymentDetails.cvc ||
      paymentDetails.type
    ) {
      Popup.show({
        type: "Warning",
        title: "Fields Incomplete",
        textBody: "Please Fill All the fields",
        buttontext: "Continue",
        callback: () => Popup.hide(),
      });
    } else {
      Popup.show({
        type: "Danger",
        title: "Booking failed",
        textBody: "Sorry No rooms available try another Hotel",
        buttontext: "Try again",
        callback: () => Popup.hide(),
      });
    }
  };

  return (
    <SafeAreaView style={{ ...styles.container, ...globalStyles.container }}>
      <Modal visible={modalOpen} animationType="slide">
        <Root>
          <View style={styles.modalContent}>
            <MaterialIcons
              name="close"
              size={24}
              style={styles.modalToggle}
              onPress={() => setModalOpen(false)}
            />
            <ScrollView>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignContent: "center",
                  margin: 20,
                }}
              >
                <CreditCardInput
                  addtionalInputsProps={addtionalInputsProps}
                  onChange={_onChange}
                  validColor="#7CFC00"
                />
                <AwesomeButton
                  style={{
                    marginVertical: 10,
                    alignSelf: "center",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  progress
                  raiseLevel={4}
                  backgroundColor="#FFF"
                  textColor="#0099ff"
                  backgroundDarker="#1073CE"
                  backgroundProgress="#b3e0ff"
                  backgroundPlaceholder="#fff"
                  borderColor="#1073CE"
                  borderWidth={2}
                  borderRadius={100}
                  width={width - 50}
                  textSize={24}
                  progressLoadingTime={10000}
                  onPress={(next) => {
                    handleSubmit(next);
                    /** Do Something **/
                  }}
                >
                  Confirm Booking
                </AwesomeButton>
              </View>
            </ScrollView>
          </View>
        </Root>
      </Modal>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={globalStyles.titleBar}>
          <TouchableOpacity onPress={() => navigation.popToTop()}>
            <View>
              <Ionicons
                name="ios-arrow-back"
                size={24}
                color="#52575D"
              ></Ionicons>
            </View>
          </TouchableOpacity>
          {/* <Ionicons name="md-more" size={24} color="#52575D"></Ionicons> */}
        </View>

        <View style={{ alignSelf: "center" }}>
          <View style={styles.profileImage}>
            <Image
              source={{ uri: AgencyLogo }}
              style={styles.image}
              resizeMode="cover"
            ></Image>
          </View>
          <View style={styles.dm}>
            <MaterialIcons
              name="chat"
              size={18}
              color="#DFD8C8"
            ></MaterialIcons>
          </View>

          {/* <TouchableOpacity style={styles.add} onPress={pickImage}>
            <View>
              <Text style={{ color: "#fff", fontSize: 14 }}>Edit</Text>
            </View>
          </TouchableOpacity> */}
          <TouchableOpacity
            style={styles.add}
            onPress={() => setModalOpen(true)}
          >
            <View>
              <Text style={{ color: "#DFD8C8", fontSize: 14 }}>Hire</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          <Text
            style={[
              styles.text,
              { fontWeight: "200", fontSize: 36, textAlign: "center" },
            ]}
          >
            {AgencyName}
          </Text>
          <Text style={[styles.text, { color: "#34FFB9", fontSize: 16 }]}>
            {AgencyLocation}
          </Text>
        </View>

        {/* <View style={styles.statsContainer}>
          <View style={styles.statsBox}>
            <Text style={[styles.text, { fontSize: 24 }]}>4</Text>
            <Text style={[styles.text, styles.subText]}>Trips Made</Text>
          </View>
          <View
            style={[
              styles.statsBox,
              {
                borderColor: "#DFD8C8",
                borderLeftWidth: 1,
                // borderRightWidth: 1
              },
            ]}
          >
            <Text style={[styles.text, { fontSize: 24 }]}>15</Text>
            <Text style={[styles.text, styles.subText]}>Bookings</Text>
          </View>
        </View> */}

        <Text style={[styles.recent, { fontSize: 24, alignSelf: "center" }]}>
          Introduction
        </Text>
        <View style={{ alignItems: "center", marginHorizontal: 10 }}>
          <Text>{AgencyDescription}</Text>
        </View>
        <Text style={{ fontSize: 24, alignSelf: "center", marginVertical: 20 }}>
          Our Services
        </Text>
        <View
          style={{
            justifyContent: "center",
            flexDirection: "row",
            flexWrap: "wrap",
            // marginHorizontal: 20,
            // alignContent: "space-between",
          }}
        >
          {/* <PackageCard
            pack={silver}
            gradient={["#283048", "#859398"]}
            name={"Silver"}
          />
          <PackageCard
            pack={gold}
            gradient={["#FEB645", "#f1e767"]}
            name={"Gold"}
          /> */}
          <PackageCard
            service="Hotel"
            gradient={["#66a6ff", "#89f7fe"]}
            // name={"Diamond"}
          />
          <PackageCard
            service="Guide"
            gradient={["#66a6ff", "#89f7fe"]}
            // name={"Diamond"}
          />
        </View>

        {/* <Comment /> */}
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
  },
  modalContent: {
    flex: 1,
    backgroundColor: "white",
    color: "#0099ff",
  },
  modalToggle: {
    // marginBottom: 10,
    marginTop: 20,
    borderWidth: 1,
    // borderColor: "",
    backgroundColor: "#0099ff",
    color: "white",
    padding: 10,
    borderRadius: 50,
    alignSelf: "center",
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

  subText: {
    fontSize: 12,
    color: "#AEB5BC",
    textTransform: "uppercase",
    fontWeight: "500",
  },
  profileImage: {
    width: 200,
    height: 200,
    overflow: "hidden",
  },
  dm: {
    backgroundColor: "#41444B",
    position: "absolute",
    top: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  active: {
    backgroundColor: "#34FFB9",
    position: "absolute",
    bottom: 28,
    left: 10,
    padding: 4,
    height: 20,
    width: 20,
    borderRadius: 10,
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
  statsContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 32,
  },
  statsBox: {
    alignItems: "center",
    flex: 1,
  },
  recent: {
    // marginLeft: 50,
    marginHorizontal: 10,
    marginTop: 32,
    marginBottom: 6,
  },
  recentItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  activityIndicator: {
    backgroundColor: "#CABFAB",
    padding: 4,
    height: 12,
    width: 12,
    borderRadius: 6,
    marginTop: 3,
    marginRight: 20,
  },
});

export default Profile;
