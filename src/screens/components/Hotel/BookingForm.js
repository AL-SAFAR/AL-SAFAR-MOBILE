import React, { useState } from "react";
import {
  StyleSheet,
  Picker,
  ScrollView,
  Button,
  TextInput,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import moment from "moment";
import NumericInput from "react-native-numeric-input";
import { Root, Popup } from "popup-ui"; // import { reduxForm } from "redux-form";
import { globalStyles } from "../../../../styles/global";
import { DatePicker } from "native-base";
import { CreditCardInput } from "react-native-credit-card-input";
import { connect } from "react-redux";
import { chargeCustomer, checkAvailability } from "../../actions/hotelActions";
import PropTypes from "prop-types";

const BookingForm = ({
  setModalOpen,
  chargeCustomer,
  hotel,
  checkAvailability,
}) => {
  const [startDate, setstartDate] = useState(null);
  const [endDate, setendDate] = useState(null);
  const [adults, setAdults] = useState(1);
  const [childs, setChilds] = useState(0);
  const [roomType, setRoomType] = useState(null);
  const [noOfRooms, setNoOfRooms] = useState(1);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);
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
      // console.log(form);
    } else {
      console.log(form);
    }
  };
  const addtionalInputsProps = {
    number: {
      maxLength: 16,
    },
    cvc: { maxLength: 3 },
  };
  const handleSubmit = async () => {
    // console.log();
    let person = adults + Math.ceil(childs / 2);
    // person = 0;
    if (
      startDate &&
      endDate &&
      person > 0 &&
      roomType &&
      noOfRooms > 0 &&
      paymentDetails
    ) {
      let bookdetails = {
        startDate,
        endDate,
        person,
        noOfRooms,
        roomType,
        paymentDetails,
      };

      console.log(bookdetails);
      const room = hotel.Room.filter((el) => {
        return el.roomType === roomType;
      });
      checkAvailability();
      // Popup.show({
      //   type: "Success",
      //   title: "Booking Completed",
      //   button: false,
      //   textBody: "Congrats! Booking successfully done",
      //   buttontext: "Ok",
      //   callback: () => {
      //     Popup.hide();
      //     setModalOpen(false);
      //   },
      // });
    } else if (startDate || endDate || roomType || paymentDetails) {
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
    <Root>
      <ScrollView>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignContent: "center",
            margin: 20,
          }}
        >
          <View>
            <View style={globalStyles.input}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ marginTop: 15, fontSize: 16 }}>Adults</Text>
                <NumericInput
                  type="up-down"
                  value={adults}
                  minValue={1}
                  // onChangeText={handleChange("adults")}
                  onChange={(value) => setAdults(value)}
                />
              </View>
            </View>
            <View style={globalStyles.input}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ marginTop: 15, fontSize: 16 }}>Children</Text>
                <NumericInput
                  type="up-down"
                  value={childs}
                  minValue={0}
                  // onChangeText={handleChange("childs")}
                  onChange={(value) => setChilds(value)}
                />
              </View>
            </View>
            <View style={globalStyles.input}>
              <Picker
                style={{
                  // marginTop: 5,
                  height: 40,
                  width: 400,
                }}
                mode="dropdown"
                prompt={"Select Room Type"}
                itemStyle={{
                  borderWidth: 1,
                  borderColor: "black",
                  backgroundColor: "grey",
                }}
                selectedValue={roomType}
                onValueChange={(itemValue) => {
                  setRoomType(itemValue);
                }}
              >
                <Picker.Item
                  label="Select your Room Type"
                  value={null}
                  key={0}
                />
                <Picker.Item label="Economy" value={"economy"} key={1} />
                <Picker.Item label="Deluxe" value={"deluxe"} key={2} />
                <Picker.Item label="Luxury" value={"luxury"} key={3} />
              </Picker>
            </View>
            <View style={globalStyles.input}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ marginTop: 15, fontSize: 16 }}>No Of Rooms</Text>
                <NumericInput
                  type="up-down"
                  value={noOfRooms}
                  minValue={1}
                  // onChangeText={handleChange("noOfRooms")}
                  onChange={(value) => setNoOfRooms(value)}
                />
              </View>
            </View>
            <View style={globalStyles.input}>
              <DatePicker
                defaultDate={Date.now()}
                minimumDate={Date.now()}
                maximumDate={maxDate}
                locale={"en"}
                // onChangeText={handleChange("startDate")}
                timeZoneOffsetInMinutes={undefined}
                modalTransparent={false}
                animationType={"fade"}
                androidMode={"default"}
                placeHolderText="Stay starts from"
                textStyle={{ color: "green" }}
                placeHolderTextStyle={{ color: "black" }}
                onDateChange={(date) => {
                  setstartDate(date);
                  console.log(date);
                }}
                disabled={false}
              />
            </View>
            <View style={globalStyles.input}>
              <DatePicker
                defaultDate={Date.now()}
                minimumDate={startDate ? startDate : Date.now()}
                maximumDate={maxDate}
                locale={"en"}
                // onChangeText={handleChange("startDate")}
                timeZoneOffsetInMinutes={undefined}
                modalTransparent={false}
                animationType={"fade"}
                androidMode={"default"}
                placeHolderText="Stay ends On"
                textStyle={{ color: "green" }}
                placeHolderTextStyle={{ color: "black" }}
                onDateChange={(date) => {
                  setendDate(date);
                  console.log(date);
                }}
                disabled={false}
              />
            </View>
            {/* <TextInput
                style={globalStyles.input}
                placeholder="Review body"
                onChangeText={props.handleChange("body")}
                value={props.values.body}
              />
              <TextInput
                style={globalStyles.input}
                placeholder="Rating (1-5)"
                onChangeText={props.handleChange("rating")}
                value={props.values.rating}
              /> */}
            <CreditCardInput
              addtionalInputsProps={addtionalInputsProps}
              onChange={_onChange}
              validColor="#7CFC00"
            />

            <TouchableOpacity onPress={handleSubmit}>
              <View style={globalStyles.button}>
                <Text style={globalStyles.buttonText}>Confirm Booking</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </Root>
  );
};

BookingForm.propTypes = {
  chargeCustomer: PropTypes.func.isRequired,
  checkAvailability: PropTypes.func.isRequired,
  hotel: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  hotel: state.hotel,
  //   receiver: navigation.getParam("receivingUser"),
});

export default connect(mapStateToProps, { chargeCustomer })(BookingForm);
