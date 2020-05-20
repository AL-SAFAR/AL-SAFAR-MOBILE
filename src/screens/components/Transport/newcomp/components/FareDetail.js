import React from "react";
import {
  // FontAwesome as FIcon,
  MaterialCommunityIcons as MCIcon,
} from "@expo/vector-icons";

import {
  Container,
  TypeTitle,
  TypeDescription,
  TypeImage,
  RequestButton,
  RequestButtonText,
} from "./detailstyle";

const FareDetail = ({ distance, duration, fare, carType }) => {
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
  const car = cars.filter((car) => {
    return car.title === carType;
  });

  return (
    <Container>
      <TypeTitle>Details</TypeTitle>
      <TypeDescription>
        {distance} Km and {duration} mins
      </TypeDescription>
      <MCIcon size={20} name={car[0].icon} color="#0099ff" />

      {/* <TypeImage source={uberx} /> */}
      <TypeTitle>{car[0].title}</TypeTitle>
      <TypeDescription>PKR {fare}</TypeDescription>

      <RequestButton onPress={() => {}}>
        <RequestButtonText>Book Now</RequestButtonText>
      </RequestButton>
    </Container>
  );
};
export default FareDetail;
