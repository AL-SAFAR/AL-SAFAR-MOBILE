import React, { useEffect } from "react";
import { View, Text, StatusBar, YellowBox } from "react-native";
import ChatBot from "react-native-chatbot-expo";

YellowBox.ignoreWarnings(["Warning: ..."]);

console.disableYellowBox = true;

const steps = [
  {
    id: "Greet",
    message: "Hello, Welcome to Customer Support",
    trigger: "Ask Problem",
  },
  {
    id: "Ask Problem",
    message: "In which matter can we help you?",
    trigger: "Displaying options Problem",
  },
  {
    id: "Displaying options Problem",
    options: [
      {
        value: "payment",
        label: "Payment",
        trigger: "Payment Issue",
      },
      {
        value: "booking",
        label: "Booking",
        trigger: "Booking Issue",
      },
    ],
  },
  {
    id: "Booking Issue",
    message: "Please Share your problem with us?",
    trigger: "Waiting for user Booking Issue",
    delay: 3000,
  },
  {
    id: "Waiting for user Booking Issue",
    user: true,
    trigger: "Ask for Email",
  },
  {
    id: "Payment Issue",
    message: "Please Share your problem with us?",
    trigger: "Waiting for user Payment Issue",
    delay: 3000,
  },
  {
    id: "Waiting for user Payment Issue",
    user: true,
    trigger: "Ask for Email",
  },
  {
    id: "Ask for Email",
    message: "Please Share your Email with us?",
    trigger: "Waiting for user Email",
    delay: 3000,
  },
  {
    id: "Waiting for user Email",
    user: true,
    inputAttributes: {
      keyboardType: "email-address",
    },
    trigger: "Contact Back",
    // end: true,
  },
  {
    id: "Contact Back",
    message: "Our Representative will get back to you soon",
    delay: 3000,

    end: true,
  },
];

const SupportScreen = () => {
  // console.log(object);
  useEffect(() => {
    YellowBox.ignoreWarnings(["Warning: ..."]);
  }, []);
  return (
    <View style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
      {/* <ThemeProvider theme={theme}> */}
      <ChatBot
        steps={steps}
        eventHandler={this.clickEventHandler}
        botAvatar={
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60"
        }
        botDelay={1000}
        botBubbleColor="#0099ff"
      />
      {/* </ThemeProvider> */}
    </View>
  );
};

export default SupportScreen;
