import React from "react";
// import {
//   Ionicons as Icons,
//   FontAwesome as FIcons,
//   Feather as FeatherIcon,
//   MaterialIcons as Mat,
//   EvilIcons,
//   Entypo,
// } from "@expo/vector-icons";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
const { width, height } = Dimensions.get("window");
import { Entypo } from "@expo/vector-icons";

const Agent = ({ agent, navigation }) => {
  // console.log(agent);
  const { companyUri, Location, companyName, intro } = agent;
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        navigation.navigate("AgentProfile", { agent: agent });
      }}
    >
      <View
        style={{
          flex: 1,
          padding: 10,
          justifyContent: "center",
          alignItems: "center",
          // backgroundColor: "red",
        }}
      >
        <View style={styles.profileImage}>
          <Image
            source={{
              uri: companyUri,
            }}
            style={styles.image}
            // resizeMode="cover"
          ></Image>
        </View>
        <View
          style={{
            marginVertical: 10,
            alignSelf: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ ...styles.data, flexWrap: "wrap", fontSize: 14 }}>
            {companyName}
          </Text>
          <Text style={styles.heading}>{Location}</Text>
        </View>
      </View>
      <View
        style={{
          flex: 2,
          flexWrap: "wrap",
          justifyContent: "flex-start",
          alignItems: "center",
          padding: 10,
          paddingBottom: 20,
          paddingTop: 20,
          overflow: "hidden",
        }}
      >
        <Text numberOfLines={10}>{intro} </Text>
      </View>
    </TouchableOpacity>
  );
};

// const Agent = () => {
//   return (
//     <TouchableOpacity style={styles.card}>
//       <View style={{ flex: 1, flexDirection: "row" }}>
//         <View style={{ ...styles.details, flex: 1 }}>
//           <View
//             style={{
//               alignSelf: "flex-end",
//               marginVertical: 20,

//               // marginRight: 20,
//             }}
//           >
//             <View style={styles.profileImage}>
//               <Image
//                 source={{
//                   uri:
//                     "https://images.unsplash.com/photo-1588783948922-d2f155b13c89?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60",
//                 }}
//                 style={styles.image}
//                 // resizeMode="cover"
//               ></Image>
//             </View>
//             <View style={{ marginVertical: 10, alignItems: "center" }}>
//               <Text style={styles.heading}>AirLift</Text>
//               <Text style={styles.data}>Islamabad</Text>
//             </View>
//           </View>
//         </View>
//         <View style={{ ...styles.details, flex: 2 }}>
//           <View
//             style={{
//               flexDirection: "row",
//               justifyContent: "center",
//               alignItems: "center",
//             }}
//           >
//             <View
//               style={{
//                 // flexDirection: "row",
//                 flex: 0,
//                 backgroundColor: "#eeff96",
//               }}
//             >
//               <Text>
//                 Hello this is a long bit of text that will fill up the entire
//                 column to see how the text will wrap
//               </Text>
//             </View>
//           </View>
//         </View>
//       </View>
//     </TouchableOpacity>
//   );
// };

export default Agent;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 10,
    height: 200,
    // backgroundColor: "#000",
    width: width * 0.9,
    borderRadius: 25,
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
  details: {
    flexDirection: "column",
    // flexGrow: 1,
    // marginVertical: 5,
    justifyContent: "flex-start",
    // justifyContent: "center",
    alignItems: "center",
  },
  image: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 180,
    height: undefined,
    width: undefined,
  },
  profileImage: {
    width: 100,
    height: 100,
    overflow: "hidden",
  },
  data: {
    // fontSize: 16,
    fontWeight: "bold",
    color: "#0099ff",
  },
  heading: { fontSize: 12, color: "#0099ff" },
  tripDetails: {
    alignItems: "center",
    // paddingTop: 50,
    // paddingBottom: 0,
    // justifyContent: "flex-end",
  },
});
