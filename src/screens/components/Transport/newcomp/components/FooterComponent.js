import { FooterTab, Footer, Button } from "native-base";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import {
  // FontAwesome as FIcon,
  MaterialCommunityIcons as MCIcon,
} from "@expo/vector-icons";

const FooterComponent = ({ updateCar }) => {
  //tab bar items
  const cars = [
    {
      title: "Car",
      subTitle: "",
      icon: "car",
    },

    {
      title: "Premium",
      subTitle: "",
      icon: "car-sports",
    },
    {
      title: "Jeep",
      subTitle: "",
      icon: "jeepney",
    },
    {
      title: "Bike",
      subTitle: "",
      icon: "motorbike",
    },
  ];
  const [focusColor, setfocusColor] = useState(0);

  return (
    <Footer>
      <FooterTab style={styles.footerContainer}>
        {cars.map((obj, index) => {
          return (
            <Button
              key={index}
              onPress={() => {
                // console.log(hotel);
                setfocusColor(index);
                updateCar(obj.title);
              }}
            >
              <MCIcon
                size={20}
                name={obj.icon}
                color={index === focusColor ? "#0099ff" : "grey"}
              />
              <Text
                style={{
                  fontSize: 12,
                  color: index === focusColor ? "#0099ff" : "grey",
                }}
              >
                {obj.title}
              </Text>
              <Text style={styles.subText}>{obj.subTitle}</Text>
            </Button>
          );
        })}
      </FooterTab>
    </Footer>
  );
};
const styles = StyleSheet.create({
  footerContainer: {
    backgroundColor: "#fff",
  },
  subText: {
    fontSize: 8,
  },
});

export default FooterComponent;
