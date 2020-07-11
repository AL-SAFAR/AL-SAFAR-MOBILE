import React from "react";
import { StyleSheet, Dimensions, Image, Text, View } from "react-native";
const width = Dimensions.get("window").width;
import { LinearGradient } from "expo-linear-gradient";
import {
  // Ionicons,
  FontAwesome5,
  MaterialCommunityIcons as MC,
} from "@expo/vector-icons";

const PackageCard = ({ service, gradient }) => {
  //   const gradient = ["#12c2e9", "#c471ed", "#f64f59"];
  //   const gradient = ["#355C7D", "#6C5B7B", "#C06C84"];
  //   const gradient = ["#283048", "#859398"];
  //   const gradient = ["#FEB645", "#f1e767"];
  //   const gradient = ["#4CA1AF", "#C4E0E5"];
  //   const gradient = ["#66a6ff", "#89f7fe"];
  const renderItems = () => {
    if (service === "Hotel") {
      return (
        <FontAwesome5
          style={{ textAlign: "center" }}
          name="hotel"
          size={72}
          color="white"
        />
      );
    } else if (service === "Guide") {
      return (
        <MC
          name="lighthouse"
          style={{ textAlign: "center" }}
          size={72}
          color="white"
        />
      );
    }
  };
  return (
    // <LinearGradient colors={gradient} style={styles.card}>
    //   <View
    //     style={{
    //       paddingTop: 10,
    //       flex: 1,
    //       alignItems: "center",
    //       justifyContent: "center",
    //     }}
    //   >
    //     <Text style={{ fontSize: 32, color: "#fff", fontWeight: "500" }}>
    //       {name}
    //     </Text>
    //   </View>
    //   <View
    //     style={{
    //       //   paddingVertical: 20,
    //       flexDirection: "row",

    //       flex: 3,
    //       alignItems: "center",
    //       alignContent: "center",
    //       justifyContent: "center",
    //       flexWrap: "wrap",
    //     }}
    //   >
    //     {renderItems()}
    //   </View>
    // </LinearGradient>
    <LinearGradient
      colors={["#36BF78", "#247F50"]}
      // start={[0, 0]}
      // end={[0, 0]}
      style={styles.statscontainer}
    >
      <View style={{ alignContent: "flex-start", flex: 1, paddingTop: 20 }}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "500",
            color: "white",
            textAlign: "center",
          }}
        >
          {service}
        </Text>
      </View>
      <View
        style={{
          alignContent: "flex-start",
          justifyContent: "center",
          alignContent: "center",
          paddingVertical: 10,
        }}
      >
        {renderItems()}
      </View>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  statscontainer: {
    // flex: 1,
    marginHorizontal: 10,
    marginVertical: 10,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#000",
    width: 150,
    borderRadius: 10,
    borderWidth: null,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 6,
  },
});
export default PackageCard;

// const styles = StyleSheet.create({
//   card: {
//     // flexDirection: "column",
//     flex: 1,
//     marginHorizontal: 20,
//     marginVertical: 10,
//     height: 200,
//     // backgroundColor: "#000",
//     width: width * 0.9,
//     borderRadius: 25,
//     borderWidth: null,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 6,
//     },
//     shadowOpacity: 0.37,
//     shadowRadius: 7.49,
//     elevation: 6,
//   },
//   activityIndicator: {
//     backgroundColor: "#fff",
//     padding: 4,
//     height: 8,
//     width: 8,
//     borderRadius: 6,
//     marginTop: 5,
//     marginRight: 10,
//   },
//   details: {
//     flexDirection: "column",
//     // flexGrow: 1,
//     // marginVertical: 5,
//     justifyContent: "flex-start",
//     // justifyContent: "center",
//     alignItems: "center",
//   },
//   image: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: "#000",
//     borderRadius: 180,
//     height: undefined,
//     width: undefined,
//   },
//   profileImage: {
//     width: 100,
//     height: 100,
//     overflow: "hidden",
//   },
//   data: {
//     // fontSize: 16,
//     fontWeight: "bold",
//     color: "#0099ff",
//   },
//   heading: { fontSize: 12, color: "#0099ff" },
//   tripDetails: {
//     alignItems: "center",
//     // paddingTop: 50,
//     // paddingBottom: 0,
//     // justifyContent: "flex-end",
//   },
//   listitems: {
//     flexDirection: "row",
//     flexBasis: "30%",
//     marginHorizontal: 20,
//   },
//   listtext: {
//     color: "#fff",
//     fontSize: 16,
//   },
// });
