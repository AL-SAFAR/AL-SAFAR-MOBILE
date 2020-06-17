import React from "react";
import { View, Text } from "react-native";

export default () => {
  return (
    <View
      style={{
        alignItems: "flex-start",
        paddingStart: 20,
        paddingTop: 83,
        flex: 1,
      }}
    >
      <View
        style={{
          alignItems: "flex-start",
          paddingStart: 13,
          paddingTop: 34,
          width: 321,
          height: 475,
          borderRadius: 21,
          borderWidth: 1,
          borderColor: "rgba(112, 112, 112, 255)",
          backgroundColor: "rgba(255, 255, 255, 255)",
        }}
      >
        <Text
          style={{
            fontSize: 12,
            color: "rgba(0, 0, 0, 255)",
            marginStart: 7,
          }}
        >
          Booking Details
        </Text>
        <View
          style={{
            alignItems: "flex-start",
            paddingStart: 21,
            paddingTop: 10,
            marginTop: 7,
            width: 295,
            height: 181,
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
              12342212
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
              5 Jan 2020
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
            }}
          >
            {/* <Path /> {Path is not supported. It can be exported as Svg} */}
            <View
              style={{
                width: 18,
                height: 18,
                backgroundColor: "#000000",
              }}
            />
            <View
              style={{
                alignItems: "flex-start",
                marginStart: 13,
                marginTop: 22,
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
                  Start Date
                </Text>
                {/* <Path /> {Path is not supported. It can be exported as Svg} */}
                <View
                  style={{
                    width: 18,
                    height: 18,
                    backgroundColor: "#000000",
                  }}
                />
                <Text
                  style={{
                    fontSize: 12,
                    color: "rgba(0, 0, 0, 140)",
                    marginStart: 17,
                    marginTop: 1,
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
                    marginTop: -1,
                  }}
                >
                  12 Jan 2020
                </Text>
                {/* <Path /> {Path is not supported. It can be exported as Svg} */}
                <View
                  style={{
                    width: 18,
                    height: 18,
                    backgroundColor: "#000000",
                  }}
                />
                <Text
                  style={{
                    fontSize: 12,
                    color: "rgba(0, 153, 255, 255)",
                    marginStart: 17,
                    marginTop: -1,
                  }}
                >
                  17 Jan 2020
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
                    marginTop: 22,
                  }}
                >
                  Room Type
                </Text>
                {/* <Path /> {Path is not supported. It can be exported as Svg} */}
                <View
                  style={{
                    width: 18,
                    height: 18,
                    backgroundColor: "#000000",
                  }}
                />
                <Text
                  style={{
                    fontSize: 12,
                    color: "rgba(0, 0, 0, 140)",
                    marginStart: 14,
                    marginTop: 22,
                  }}
                >
                  No of Rooms
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
            }}
          >
            {/* <Path /> {Path is not supported. It can be exported as Svg} */}
            <View
              style={{
                width: 18,
                height: 18,
                backgroundColor: "#000000",
              }}
            />
            <Text
              style={{
                fontSize: 12,
                color: "rgba(0, 153, 255, 255)",
                marginStart: 26,
              }}
            >
              Luxury
            </Text>
            {/* <Path /> {Path is not supported. It can be exported as Svg} */}
            <View
              style={{
                width: 18,
                height: 18,
                backgroundColor: "#000000",
              }}
            />
            <Text
              style={{
                fontSize: 12,
                color: "rgba(0, 153, 255, 255)",
                marginStart: 46,
              }}
            >
              2
            </Text>
          </View>
        </View>
        <Text
          style={{
            fontSize: 12,
            color: "rgba(0, 0, 0, 255)",
            marginStart: 9,
            marginTop: 28,
          }}
        >
          Payment Details
        </Text>
        <View
          style={{
            alignItems: "flex-start",
            paddingStart: 20,
            paddingTop: 10,
            marginTop: 7,
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
              1234323
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
              5 Jan 2020
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
              10000 PKR
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
            alignItems: "flex-start",
            marginStart: 90,
            marginTop: 25,
          }}
        >
          <View
            style={{
              alignItems: "flex-start",
              paddingStart: 38,
              paddingTop: 5,
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
          </View>
        </View>
      </View>
    </View>
  );
};
