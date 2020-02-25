import React, { useState } from "react";
import {
  StyleSheet,
  Picker,
  Button,
  TextInput,
  View,
  Text
} from "react-native";
import NumericInput from "react-native-numeric-input";
import { Formik } from "formik";
import { globalStyles } from "../../../../styles/global";
import { DatePicker } from "native-base";
const BookingForm = () => {
  const [choseDate, setchoseDate] = useState(new Date());
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);
  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignContent: "center",
          margin: 20
        }}
      >
        <Formik
          initialValues={{
            title: "",
            body: "",
            rating: "",
            adults: 0,
            childs: 0,
            roomType: "",
            noOfRooms: 0,
            fromDate: new Date()
          }}
          onSubmit={values => {
            console.log(values);
          }}
        >
          {props => (
            <View>
              <View style={globalStyles.input}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between"
                  }}
                >
                  <Text style={{ marginTop: 15, fontSize: 16 }}>Adults</Text>
                  <NumericInput
                    type="up-down"
                    value={props.values.adults}
                    minValue={0}
                    onChangeText={props.handleChange("adults")}
                    onChange={value => console.log(value)}
                  />
                </View>
              </View>
              <View style={globalStyles.input}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between"
                  }}
                >
                  <Text style={{ marginTop: 15, fontSize: 16 }}>Children</Text>
                  <NumericInput
                    type="up-down"
                    value={props.values.childs}
                    minValue={0}
                    onChangeText={props.handleChange("childs")}
                    onChange={value => console.log(value)}
                  />
                </View>
              </View>
              <View style={globalStyles.input}>
                <Picker
                  style={{
                    // marginTop: 5,
                    height: 40,
                    width: 400
                  }}
                  mode="dropdown"
                  prompt={"Select Room Type"}
                  itemStyle={{
                    borderWidth: 1,
                    borderColor: "black",
                    backgroundColor: "grey"
                  }}
                  selectedValue={props.values.roomType}
                  onValueChange={itemValue => {
                    props.setFieldValue("roomType", itemValue);
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
                    justifyContent: "space-between"
                  }}
                >
                  <Text style={{ marginTop: 15, fontSize: 16 }}>
                    No Of Rooms
                  </Text>
                  <NumericInput
                    type="up-down"
                    value={props.values.noOfRooms}
                    minValue={0}
                    onChangeText={props.handleChange("noOfRooms")}
                    onChange={value => console.log(value)}
                  />
                </View>
              </View>
              <View style={globalStyles.input}>
                <DatePicker
                  defaultDate={Date.now()}
                  minimumDate={Date.now()}
                  maximumDate={maxDate}
                  locale={"en"}
                  onChangeText={props.handleChange("fromDate")}
                  timeZoneOffsetInMinutes={undefined}
                  modalTransparent={false}
                  animationType={"fade"}
                  androidMode={"default"}
                  placeHolderText="Stay starts from"
                  textStyle={{ color: "green" }}
                  placeHolderTextStyle={{ color: "black" }}
                  onDateChange={date => {
                    setchoseDate(date);
                    console.log(date);
                  }}
                  disabled={false}
                />
              </View>
              {/* <View style={globalStyles.input}>
              <DatePicker
                defaultDate={Date.now()}
                minimumDate={Date.now()}
                maximumDate={maxDate}
                locale={"en"}
                onChangeText={props.handleChange("fromDate")}
                timeZoneOffsetInMinutes={undefined}
                modalTransparent={false}
                animationType={"fade"}
                androidMode={"default"}
                placeHolderText="Stay ends On"
                textStyle={{ color: "green" }}
                placeHolderTextStyle={{ color: "black" }}
                onDateChange={date => {
                  setchoseDate(date);
                  console.log(date);
                }}
                disabled={false}
              />
            </View> */}
              <TextInput
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
              />
              <Button
                title="Confirm Booking"
                color="#0099ff"
                onPress={props.handleSubmit}
              />
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};

export default BookingForm;
