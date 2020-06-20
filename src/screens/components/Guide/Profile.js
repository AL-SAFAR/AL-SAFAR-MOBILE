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
import Comment from "../layout/Comment";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
// import { TouchableOpacity } from "react-native-gesture-handler";
import { globalStyles } from "../../../../styles/global";
import {
  Container,
  DeckSwiper,
  Card,
  CardItem,
  Thumbnail,
  Left,
  Body,
  Icon,
} from "native-base";
import GuideBookingForm from "../Guide/GuideBookingForm";
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
const Profile = ({ navigation }) => {
  const guide = navigation.getParam("guide");
  const { UserProfile, name } = guide;
  const profileImage = guide.Image;
  const { city, serviceCharges, places, description } = UserProfile[0];

  // const { places, name, description, city, profileImage } = guide;
  // const guide = {
  //   profileImage: { uri: "https://uinames.com/api/photos/female/7.jpg" }
  // }
  const [modalOpen, setModalOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem("user").then((res) => {
      let tempuser = JSON.parse(res);
      // console.log(tempuser);
      setUser({ _id: tempuser._id, name: tempuser.name, avatar: "" });
    });
  }, []);
  return (
    <SafeAreaView style={{ ...styles.container, ...globalStyles.container }}>
      <Modal visible={modalOpen} animationType="slide">
        <View style={styles.modalContent}>
          <MaterialIcons
            name="close"
            size={24}
            style={styles.modalToggle}
            onPress={() => setModalOpen(false)}
          />
          <GuideBookingForm
            setModalOpen={setModalOpen}
            serviceCharges={serviceCharges}
            currentGuide={guide}
          />
        </View>
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
          <Ionicons name="md-more" size={24} color="#52575D"></Ionicons>
        </View>

        <View style={{ alignSelf: "center" }}>
          <View style={styles.profileImage}>
            <Image
              source={{ uri: profileImage }}
              style={styles.image}
              resizeMode="cover"
            ></Image>
          </View>
          <TouchableOpacity
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
          </TouchableOpacity>

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
          <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>
            {name}
          </Text>
          <Text style={[styles.text, { color: "#34FFB9", fontSize: 14 }]}>
            {city}
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
          <Text>{description}</Text>
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

        <Container style={{ height: 400, marginHorizontal: 10 }}>
          <DeckSwiper
            dataSource={places}
            renderItem={(item) => (
              <Card>
                <CardItem>
                  <Left>
                    <Thumbnail source={{ uri: profileImage }} />
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
            )}
          />
        </Container>
        <Comment />
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

export default Profile;
