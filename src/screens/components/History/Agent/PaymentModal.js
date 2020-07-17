import React, { useState } from "react";
// import AwesomeButton from "react-native-really-awesome-button";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Modal,
} from "react-native";
import ReadMore from "react-native-read-more-text";
// import {
//   Container,
//   Header,
//   Content,
//   Form,
//   Item,
//   Input,
//   Label
// } from "native-base";
import { CreditCardInput } from "react-native-credit-card-input";
import AwesomeButton from "react-native-really-awesome-button";
import { Root, Popup } from "popup-ui"; // import { reduxForm } from "redux-form";
// import BookingForm from "./BookingForm";
const { width, height } = Dimensions.get("window");

const PaymentModal = () => {
  const [paymentDetails, setPaymentDetails] = useState(null);
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

  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignContent: "center",
          marginTop: 20,
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
  );
};

export default PaymentModal;
