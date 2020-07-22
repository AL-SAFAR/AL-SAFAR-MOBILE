const Customer = require("../models/UserManagment/Customer");
const Hotel = require("../models/HotelManagment/Hotel");
const HotelBooking = require("../models/HotelManagment/HotelBooking");
const Room = require("../models/HotelManagment/Room");
const Chat = require("./chat");
const Guide = require("../models/UserManagment/Guide");
// const GuideBooking = require("../models/Booking/GuideBooking");
const { response } = require("express");

const getHotels = async () => {
  try {
    // let hotels;
    let hotels = await Hotel.aggregate([
      {
        $lookup: {
          from: "hotelbookings",
          as: "HotelBooking",
          let: {
            hotelId: "$_id",
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    {
                      $eq: ["$hotelId", "$$hotelId"],
                    },
                    {
                      $eq: ["$status", "completed"],
                    },
                  ],
                },
                feedback: {
                  $exists: true,
                },
              },
            },
          ],
        },
      },
      {
        $lookup: {
          from: "customers",
          localField: "HotelBooking.customerId",
          foreignField: "_id",
          as: "customer",
        },
      },
      {
        $lookup: {
          from: "hotelreps",
          localField: "hotelRep",
          foreignField: "_id",
          as: "HotelRep",
        },
      },
      {
        $lookup: {
          from: "rooms",
          as: "Room",
          let: {
            id: "$_id",
          },
          pipeline: [
            {
              $facet: {
                Economy: [
                  {
                    $match: {
                      $expr: {
                        $and: [
                          {
                            $eq: ["$roomType", "Economy"],
                          },
                          {
                            $eq: ["$hotelId", "$$id"],
                          },
                        ],
                      },
                    },
                  },
                  {
                    $limit: 1,
                  },
                ],
                Delexue: [
                  {
                    $match: {
                      $expr: {
                        $and: [
                          {
                            $eq: ["$roomType", "Deluxe"],
                          },
                          {
                            $eq: ["$hotelId", "$$id"],
                          },
                        ],
                      },
                    },
                  },
                  {
                    $limit: 1,
                  },
                ],
                Luxury: [
                  {
                    $match: {
                      $expr: {
                        $and: [
                          {
                            $eq: ["$roomType", "Luxury"],
                          },
                          {
                            $eq: ["$hotelId", "$$id"],
                          },
                        ],
                      },
                    },
                  },
                  {
                    $limit: 1,
                  },
                ],
              },
            },
            {
              $project: {
                activity: {
                  $setUnion: ["$Economy", "$Luxury", "$Delexue"],
                },
              },
            },
            {
              $unwind: "$activity",
            },
            {
              $replaceRoot: {
                newRoot: "$activity",
              },
            },
          ],
        },
      },
      {
        $project: {
          Feedback: {
            $map: {
              input: {
                $zip: {
                  inputs: ["$HotelBooking", "$customer"],
                },
              },
              as: "el",
              in: {
                HotelBooking: {
                  $arrayElemAt: ["$$el", 0],
                },
                Customer: {
                  $arrayElemAt: ["$$el", 1],
                },
              },
            },
          },
          Room: "$Room",
          HotelRep: "$HotelRep",
        },
      },
      {
        $lookup: {
          from: "hotels",
          localField: "_id",
          foreignField: "_id",
          as: "Hotel",
        },
      },
      {
        $unwind: "$Hotel",
      },
      {
        $set: {
          "Hotel.Room": "$Room",
          "Hotel.Feedback": "$Feedback",
          "Hotel.HotelRep": "$HotelRep",
        },
      },
      {
        $replaceWith: "$Hotel",
      },
    ]);
    return hotels;
  } catch (err) {
    console.log("ERROR MESSAGE=");
    console.error(err.message);
    // res.status(500).send("Server Error");
  }
};
const getGuides = async () => {
  try {
    let guides = await Guide.aggregate([
      {
        $lookup: {
          from: "guideprofiles",
          localField: "_id",
          foreignField: "guide",
          as: "UserProfile",
        },
      },
      {
        $lookup: {
          from: "guidebookings",
          localField: "_id",
          foreignField: "guideId",
          as: "GuideBooking",
        },
      },
      {
        $lookup: {
          from: "customers",
          localField: "GuideBooking.customerId",
          foreignField: "_id",
          as: "CustomerInfo",
        },
      },
    ]);
    return guides;
  } catch (error) {
    console.log("ERROR MESSAGE=");
    console.error(error.message);
  }
};
module.exports = { getHotels, getGuides };
