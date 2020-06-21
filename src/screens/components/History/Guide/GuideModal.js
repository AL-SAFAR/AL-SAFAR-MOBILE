import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons as Icon } from "@expo/vector-icons";
import moment from "moment";

const GuideModal = ({ setModalOpen, guideBooking }) => {
  let { _id, startDate, endDate, guide, payment } = guideBooking;
  // let profileImage = guide.Image;
  let { amount } = payment;
  // let { name } = guide;

  startDate = moment(startDate).format("DD MMM YYYY");
  endDate = moment(endDate).format("DD MMM YYYY");
  let paymentDate = moment(payment.date).format("DD MMM YYYY");
  return (
    <View
      style={{
        alignItems: "flex-start",
        paddingStart: 13,
        paddingTop: 18,
        width: 321,
        height: 393,
        borderRadius: 21,
        borderWidth: null,
        backgroundColor: "rgba(255, 255, 255, 255)",
      }}
    >
      <Text
        style={{
          fontSize: 16,
          fontWeight: "500",
          color: "#000",
          marginStart: 10,
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
            {_id}
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
            {paymentDate}
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
                {startDate}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: "rgba(0, 153, 255, 255)",
                  marginStart: 74,
                  //   marginTop: -1,
                }}
              >
                {endDate}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <Text
        style={{
          fontSize: 16,
          fontWeight: "500",
          color: "#000",
          marginTop: 10,
          marginStart: 10,
          //   marginTop: 28,
        }}
      >
        Payment Details
      </Text>

      <View
        style={{
          alignItems: "flex-start",
          paddingStart: 21,
          paddingTop: 10,
          marginTop: 5,
          width: 295,
          height: 107,
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
            Payment ID:
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: "rgba(0, 153, 255, 255)",
              marginStart: 9,
            }}
          >
            {payment._id}
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
              marginStart: 1,
              marginTop: 7,
            }}
          >
            Payment Date:
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: "rgba(0, 153, 255, 255)",
              marginStart: 7,
              marginTop: 7,
            }}
          >
            {paymentDate}
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
              marginStart: 201,
              marginTop: 21,
            }}
          >
            {payment.amount} PKR
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: "rgba(0, 0, 0, 140)",
              marginStart: -55,
              marginTop: 5,
            }}
          >
            Paid Total
          </Text>
        </View>
      </View>
      <View
        style={{
          // alignItems: "center",
          // justifyContent: "center",
          alignSelf: "center",
          // marginStart: 90,
          marginTop: 25,
        }}
      >
        <TouchableOpacity
          onPress={() => setModalOpen(false)}
          style={{
            alignItems: "center",
            justifyContent: "center",
            //   paddingStart: 38,
            //   paddingTop: 5,
            width: 114,
            height: 30,
            borderRadius: 14,
            borderWidth: 1,
            borderColor: "rgba(142, 208, 252, 255)",
            backgroundColor: "rgba(246, 245, 245, 255)",
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: "rgba(0, 153, 255, 255)",
            }}
          >
            Close
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GuideModal;

const styles = StyleSheet.create({});
