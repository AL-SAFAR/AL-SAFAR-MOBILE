import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Modal,
  TouchableOpacity,
  Image,
  Text,
  AsyncStorage,
  Dimensions,
  StyleSheet,
} from "react-native";
// import Comment from "../layout/Comment";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
// import { TouchableOpacity } from "react-native-gesture-handler";
import { globalStyles } from "../../../../../styles/global";
import {
  Container,
  DeckSwiper,
  Card,
  Content,
  CardItem,
  Thumbnail,
  Left,
  Body,
  Icon,
} from "native-base";
// import GuideBookingForm from "../Guide/GuideBookingForm";
// const cards = [
//   {
//     text: "Faisal Mosque",
//     name: "One",
//     image: { uri: "https://source.unsplash.com/1024x768/?hotel/5" },
//   },
//   {
//     text: "Centaurus",
//     name: "Two",
//     image: { uri: "https://source.unsplash.com/1024x768/?hotel/9" },
//   },
// ];
const width = Dimensions.get("window").width;
const GuideModal = () => {
  //   const guide = navigation.getParam("guide");
  //   const { UserProfile, name } = guide;
  //   const profileImage = guide.Image;
  //   const { city, serviceCharges, places, description } = UserProfile[0];

  // const { places, name, description, city, profileImage } = guide;
  // const guide = {
  //   profileImage: { uri: "https://uinames.com/api/photos/female/7.jpg" }
  // }
  const places = [
    {
      _id: "5eee578c80c0e169d9345413",
      placeName: "Place 1",
      placeImage:
        "https://res.cloudinary.com/al-safar435/image/upload/v1592678280/TravelGuidePlaces/qhtedj9oeaeywdrjc4qq.jpg",
    },
    {
      _id: "5eee578c80c0e169d9345412",
      placeName: "Place 2",
      placeImage:
        "https://res.cloudinary.com/al-safar435/image/upload/v1592678282/TravelGuidePlaces/lvgd3sejtuywbmcse6sj.jpg",
    },
    {
      _id: "5eee578c80c0e169d9345411",
      placeName: "Place 3",
      placeImage:
        "https://res.cloudinary.com/al-safar435/image/upload/v1592678283/TravelGuidePlaces/umfr8tzz9almg5oqtahq.jpg",
    },
  ];
  //   const [modalOpen, setModalOpen] = useState(false);
  //   const [user, setUser] = useState(null);

  //   useEffect(() => {
  //     AsyncStorage.getItem("user").then((res) => {
  //       let tempuser = JSON.parse(res);
  //       // console.log(tempuser);
  //       setUser({ _id: tempuser._id, name: tempuser.name, avatar: "" });
  //     });
  //   }, []);
  return (
    <SafeAreaView style={{ ...styles.container, ...globalStyles.container }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ alignSelf: "center" }}>
          <View style={styles.profileImage}>
            <Image
              source={{
                uri:
                  //   profileImage
                  "https://images.pexels.com/photos/301958/pexels-photo-301958.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
              }}
              style={styles.image}
              resizeMode="cover"
            ></Image>
          </View>
          {/* <TouchableOpacity
            style={styles.dm}
            onPress={() => {
              navigation.navigate("Chat", { receivingUser: guide._id, user });
            }}
          >
            <MaterialIcons
              name="chat"
              size={18}
              color="#DFD8C8"
            ></MaterialIcons>
          </TouchableOpacity> */}

          {/* <TouchableOpacity style={styles.add} onPress={pickImage}>
            <View>
              <Text style={{ color: "#fff", fontSize: 14 }}>Edit</Text>
            </View>
          </TouchableOpacity> */}
          {/* <TouchableOpacity
            style={styles.add}
            onPress={() => setModalOpen(true)}
          >
            <View>
              <Text style={{ color: "#DFD8C8", fontSize: 14 }}>Hire</Text>
            </View>
          </TouchableOpacity> */}
        </View>

        <View style={styles.infoContainer}>
          <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>
            {/* {name} */} Hamza
          </Text>
          <Text style={[styles.text, { color: "#34FFB9", fontSize: 14 }]}>
            {/* {city} */} Rawalpindi
          </Text>
        </View>

        <View style={styles.statsContainer}>
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
        </View>

        <Text style={[styles.recent, { fontSize: 24 }]}>Introduction</Text>
        <View style={{ alignItems: "center", marginHorizontal: 10 }}>
          <Text>
            {/* {description} */}Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit
            esse cillum dolore eu fugiat nulla pariatur.
          </Text>
          {/* <View style={styles.recentItem}>
            <View style={styles.activityIndicator}></View>
            <View style={{ width: 250 }}>
              <Text
                style={[styles.text, { color: "#41444B", fontWeight: "300" }]}
              >
                Started following{" "}
                <Text style={{ fontWeight: "400" }}>Jake Challeahe</Text> and{" "}
                <Text style={{ fontWeight: "400" }}>Luis Poteer</Text>
              </Text>
            </View>

          </View>

          <View style={styles.recentItem}>
            <View style={styles.activityIndicator}></View>
            <View style={{ width: 250 }}>
              <Text
                style={[styles.text, { color: "#41444B", fontWeight: "300" }]}
              >
                Started following{" "}
                <Text style={{ fontWeight: "400" }}>Luke Harper</Text>
              </Text>
            </View>
          </View>
        </View>
        <View style={{ alignItems: "center" }}>
          <View style={styles.recentItem}>
            <View style={styles.activityIndicator}></View>
            <View style={{ width: 250 }}>
              <Text
                style={[styles.text, { color: "#41444B", fontWeight: "300" }]}
              >
                Started following{" "}
                <Text style={{ fontWeight: "400" }}>Jake Challeahe</Text> and{" "}
                <Text style={{ fontWeight: "400" }}>Luis Poteer</Text>
              </Text>
            </View>
          </View>

          <View style={styles.recentItem}>
            <View style={styles.activityIndicator}></View>
            <View style={{ width: 250 }}>
              <Text
                style={[styles.text, { color: "#41444B", fontWeight: "300" }]}
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
                pariatur alias vitae, exercitationem quis quia minus. Corporis
                necessitatibus molestiae a harum sit tempora, cupiditate odit
                dolores ea velit, optio illo.
              </Text>
            </View>
          </View>*/}
        </View>

        <Container style={{ height: 1200, marginHorizontal: 10 }}>
          <Content contentContainerStyle={{ flex: 1 }}>
            {/* <DeckSwiper
              dataSource={places}
              renderItem={(item) => (
              )}
            /> */}
            {places.map((item) => {
              return (
                <Card key={item._id} style={{ elevation: 3 }}>
                  {/* {console.log(item)} */}
                  <CardItem>
                    <Left>
                      <Thumbnail
                        source={{
                          uri:
                            // profileImage
                            "https://images.pexels.com/photos/301958/pexels-photo-301958.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
                        }}
                      />
                      <Body>
                        <Text style={{ fontSize: 16 }}>{item.placeName}</Text>
                      </Body>
                    </Left>
                  </CardItem>
                  <CardItem cardBody>
                    <Image
                      style={{ height: 300, flex: 1 }}
                      source={{ uri: item.placeImage }}
                    />
                  </CardItem>
                </Card>
              );
            })}
          </Content>
        </Container>

        <View
          style={{
            alignSelf: "center",
            justifyContent: "center",
            marginVertical: 10,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "500",
              color: "#000",
              alignSelf: "center",
            }}
          >
            Booking Details
          </Text>
          <View
            style={{
              alignItems: "flex-start",
              paddingStart: 21,
              paddingTop: 10,
              marginTop: 5,
              width: 295,
              height: 125,
              borderRadius: 27,
              backgroundColor: "rgba(246, 245, 245, 255)",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  color: "rgba(0, 0, 0, 140)",
                }}
              >
                Booking ID:
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: "rgba(0, 153, 255, 255)",
                  marginStart: 10,
                }}
              >
                312 {/* {_id} */}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  color: "rgba(0, 0, 0, 140)",
                  marginTop: 7,
                }}
              >
                Booking Date:
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: "rgba(0, 153, 255, 255)",
                  marginStart: 9,
                  marginTop: 7,
                }}
              >
                21-JAN-2020 {/* {paymentDate} */}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  alignItems: "flex-start",
                  //   marginStart: 13,
                  marginTop: 22,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    // alignContent: "flex-end",
                  }}
                >
                  <Icon
                    style={{
                      marginRight: 10,
                      color: "#6F6F6F",
                    }}
                    size={24}
                    name="md-calendar"
                  />
                  <Text
                    style={{
                      fontSize: 14,
                      color: "#6F6F6F",
                    }}
                  >
                    Start Date
                  </Text>
                  <Icon
                    style={{
                      marginRight: 10,
                      marginStart: 50,
                      color: "#6F6F6F",
                    }}
                    size={24}
                    name="md-calendar"
                  />
                  <Text
                    style={{
                      fontSize: 14,
                      color: "#6F6F6F",
                    }}
                  >
                    End Date
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "flex-start",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      color: "rgba(0, 153, 255, 255)",
                      marginStart: 28,
                      //   marginTop: -1,
                    }}
                  >
                    14-JAN-2020 {/* {startDate} */}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: "rgba(0, 153, 255, 255)",
                      marginStart: 74,
                      //   marginTop: -1,
                    }}
                  >
                    17-JAN-2020 {/* {endDate} */}
                  </Text>
                </View>
              </View>
            </View>
          </View>
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
  mediaImageContainer: {
    width: 180,
    height: 200,
    borderRadius: 12,
    overflow: "hidden",
    marginHorizontal: 10,
  },
  mediaCount: {
    backgroundColor: "#41444B",
    position: "absolute",
    top: "50%",
    marginTop: -50,
    marginLeft: 30,
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    shadowColor: "rgba(0, 0, 0, 0.38)",
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    shadowOpacity: 1,
  },
  recent: {
    marginLeft: 50,
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

export default GuideModal;
