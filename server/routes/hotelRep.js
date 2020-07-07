const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");

const Hotel = require("../models/HotelManagment/Hotel");
const Room = require("../models/HotelManagment/Room");
const HotelRep = require("../models/UserManagment/HotelRep");
const { ObjectId } = require("mongodb");
const async = require("async");
const HotelBooking = require("../models/HotelManagment/HotelBooking");
const Payment = require("../models/Payment/Payment");
const schedule = require("node-schedule");
const Stripe = require("stripe");
const stripe = new Stripe("sk_test_hqcxEpMNto862mGujgGpONho004USKiy2K");

router.get("/", async (req, res) => {
  try {
    const hotelRep = await HotelRep.find();

    res.json(hotelRep);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route    POST api/hotelRep
// @desc     Register hotelRep
// @access   Public
router.post(
  "/",
  [
    check("name", "full Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "mobile",
      "Please include a valid Pakistan mobile number"
    ).isMobilePhone([, "en-PK"]),
    check(
      "cnic",
      "Please enter a correct CNIC which should be like this xxxxx-xxxxxxx-x don't include dashes"
    ).isLength({ min: 13 }),
    // .matches("/([0-9]{5}[0-9]{7}(0|1))+/", "g"),
    check(
      "password",
      "Please enter a password with 8 or more characters"
    ).isLength({ min: 8 }),
    // .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i")
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // console.log(errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, mobile, cnic, connectid } = req.body;

    try {
      let hotelRep = await HotelRep.findOne({ email });

      if (hotelRep) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      hotelRep = new HotelRep({
        name,
        email,
        password,
        mobile,
        cnic,
        connectid,
      });

      const salt = await bcrypt.genSalt(10);

      hotelRep.password = await bcrypt.hash(password, salt);

      await hotelRep.save();

      const payload = {
        user: {
          id: hotelRep.id,
          userType: "1",
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

//@route    PUT api/hotelRep/:id
//@desc     update HotelReps
//@access   Private
router.put("/:id", auth, async (req, res) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty())
  //   return res.status(400).json({ errors: errors.array() });
  // console.log(req.body);

  const { name, email, password, mobile, cnic } = req.body;

  // Build contact object
  const hotelRepFields = {};
  if (email) hotelRepFields.email = email;
  if (name) hotelRepFields.name = name;
  if (password) {
    hotelRepFields.password = password;
    const salt = await bcrypt.genSalt(10);

    hotelRepFields.password = await bcrypt.hash(password, salt);
  }
  if (mobile) hotelRepFields.mobile = mobile;
  if (cnic) hotelRepFields.cnic = cnic;
  // console.log(hotelRepFields);
  try {
    let hotelRep = await HotelRep.findById(req.params.id);

    if (!hotelRep) return res.status(404).json({ msg: "Hotel Rep not found" });

    // Make sure user owns hotelRep
    if (hotelRep.id.toString() !== req.user.id)
      return res.status(401).json({ msg: "Not authorized" });

    hotelRep = await HotelRep.findByIdAndUpdate(
      req.params.id,
      { $set: hotelRepFields },
      { new: true }
    );

    res.json(hotelRep);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route    POST api/hotelRep/createHotelProfile
// @desc     Create Hotel Profile
// @access   Private
router.post("/createHotelProfile", auth, async (req, res) => {
  const {
    name,
    address,
    city,
    description,
    wifi,
    parking,
    smoking,
    food,
    facilities,
    HouseRules,
    FoodNames,
    activities,
    cleaning,
    general,
    ActivitiesName,
    CleaningFacilities,
    GeneralFacilities,
    CheckInTime,
    CheckOutTime,
    HotelImages,
  } = req.body;

  // console.log("Body=");
  console.log(req.body);
  // Build contact object
  const hotelFields = {};
  if (name) hotelFields.hotelName = name;
  if (address) hotelFields.address = address;
  if (city) hotelFields.city = city;
  if (description) hotelFields.description = description;
  hotelFields.extras = {};
  if (food) {
    hotelFields.extras.foods = FoodNames.split(",").map((food) => food.trim());
  }
  hotelFields.extras.facilities = {};
  if (activities) {
    hotelFields.extras.facilities.Activities = ActivitiesName.split(
      ","
    ).map((activity) => activity.trim());
  }
  if (cleaning) {
    hotelFields.extras.facilities.Cleaning = CleaningFacilities.split(
      ","
    ).map((clean) => clean.trim());
  }
  if (general) {
    hotelFields.extras.facilities.general = GeneralFacilities.split(
      ","
    ).map((gen) => gen.trim());
  }
  hotelFields.extras.wifi = wifi;
  hotelFields.extras.parking = parking;
  hotelFields.houseRules = {};
  if (CheckInTime) hotelFields.houseRules.checkIn = CheckInTime;
  if (CheckOutTime) hotelFields.houseRules.checkOut = CheckOutTime;
  if (smoking) hotelFields.houseRules.Smoking = smoking;

  console.log("hotelFields=");
  console.log(hotelFields);

  let HotelProfileImages = [];
  let HotelImagesArray = [];
  HotelImagesArray = HotelImages.split(",");

  if (HotelImagesArray.length > 0) {
    HotelImagesArray.forEach((HotelImage) => {
      HotelProfileImages.push(HotelImage);
    });
  }

  hotelFields.hotelImages = HotelProfileImages;

  try {
    let hotelRep = await HotelRep.findById(req.user.id);
    if (!hotelRep) return res.status(401).json({ msg: "Not authorized" });
    let hotel = await Hotel.findOneAndUpdate(
      { hotelRep: req.user.id },
      { $set: hotelFields },
      { new: true, upsert: true }
    );
    res.json(hotel);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    POST api/hotelRep/addNewRoom
// @desc     Add New Room
// @access   Private
router.post("/addNewRoom", auth, async (req, res) => {
  const { roomType, roomMaxOccupancy, NoOfRooms, rent } = req.body;

  try {
    // Using upsert option (creates new doc if no match is found):

    //find the hotel against the hotelRep ID
    let hotel = await Hotel.findOne({ hotelRep: req.user.id });
    if (!hotel) return res.json({ msg: "Not authorized" });

    let RoomFields = {};
    console.log(
      roomType + " " + roomMaxOccupancy + " " + NoOfRooms + " " + rent
    );
    RoomFields.hotelId = ObjectId(hotel.id);
    RoomFields.roomType = roomType;
    RoomFields.rent = rent;
    RoomFields.roomMaxOccupancy = roomMaxOccupancy;
    RoomFields.NoOfRooms = NoOfRooms;
    console.log("RoomFields");
    console.log(RoomFields);
    let roomObj = await Room.findOneAndUpdate(
      { hotelId: ObjectId(hotel.id), roomType: roomType },
      { $set: RoomFields },
      { upsert: true, new: true }
    );
    res.json(roomObj);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    POST api/hotelRep/uniquerooms
// @desc     Get Unique Rooms of a Hotel
// @access   Private
router.post("/uniquerooms", auth, async (req, res) => {
  try {
    let HotelRepId = ObjectId(req.user.id);

    await Hotel.aggregate(
      [
        {
          $match: {
            hotelRep: HotelRepId,
          },
        },
        {
          $lookup: {
            from: "hotelreps",
            as: "HotelRep",
            let: {
              hotelRep: "$hotelRep",
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      {
                        $eq: ["$_id", HotelRepId],
                      },
                    ],
                  },
                },
              },
            ],
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
          $unwind: "$Room",
        },
        {
          $replaceRoot: {
            newRoot: "$Room",
          },
        },
      ],
      (err, response) => {
        if (err) res.status(400).json({ err });
        console.log(response);
        res.json(response);
      }
    );
  } catch (err) {
    console.log("ERROR MESSAGE=");
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    POST api/hotelRep/saveHotelBooking
// @desc     Save a Hotel Booking of Rooms
// @access   Private
router.post("/saveHotelBooking", auth, async (req, res) => {
  try {
    const {
      PaymentID,
      HotelID,
      Adult,
      Children,
      NoOfRoom,
      RoomType,
      fromDate,
      toDate,
      hotelRep,
      RoomId,
      NoOfRooms,
    } = req.body;
    console.log(RoomId);
    let NewhotelBooking = new HotelBooking({
      paymentId: ObjectId(PaymentID),
      RoomId: ObjectId(RoomId.toString().trim()),
      hotelId: ObjectId(HotelID),
      customerId: ObjectId(req.user.id),
      NoOfRooms: NoOfRooms,
      fromDate: new Date(fromDate),
      toDate: new Date(toDate),
      status: "active",
    });
    let hotelbooking = await NewhotelBooking.save();
    // var date = new Date(2020, 5, 23, 00, 30, 0);
    var date = new Date(toDate);
    console.log(date);
    console.log(hotelbooking._id);
    let HotelRepres = await HotelRep.findById(ObjectId(hotelRep));
    let paymentRes = await Payment.findById(ObjectId(PaymentID));
    let amount = paymentRes.amount;
    let comission = paymentRes.commission;
    let amountToTransfer = amount - comission;
    amountToTransfer = Math.ceil((amountToTransfer / 160) * 100); //Convert to USD
    let connectid = HotelRepres.connectid;
    let BookingId = hotelbooking._id.toString();

    var j = schedule.scheduleJob(BookingId, date, async function () {
      const transfer = await stripe.transfers.create({
        amount: amountToTransfer,
        currency: "USD",
        destination: connectid,
      });
      console.log(transfer);
      const updateFields = {};
      updateFields.status = "completed";
      console.log(updateFields);
      let booking = await HotelBooking.findByIdAndUpdate(
        ObjectId(BookingId),
        {
          $set: updateFields,
        },
        { new: true }
      );
      console.log("Stripe PAyment hit");
      console.log(booking);
    });

    res.json({ hotelbooking });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    POST api/hotelRep/cancelBooking
// @desc     Cancel a Hotel Booking of Rooms
// @access   Private
router.post("/cancelBooking", auth, async (req, res) => {
  const { bookingId } = req.body;
  // let bookingId = data.bookingId;
  const updateFields = {};
  updateFields.status = "cancelled";
  updateFields.cancelDate = new Date();
  let booking = await HotelBooking.findByIdAndUpdate(ObjectId(bookingId), {
    $set: updateFields,
  });
  res.json({ booking });
});

// @route    POST api/hotelRep/addFeedback
// @desc     Customer Gives Feedback to a Hotel
// @access   Private
router.post("/addFeedback", auth, async (req, res) => {
  try {
    const { HotelId, BookingId, starRating, feedback } = req.body;
    let HotelResp = await HotelBooking.findByIdAndUpdate(
      ObjectId(BookingId),
      {
        $set: {
          ...(starRating && { starRating: parseInt(starRating) }),
          ...(feedback && { feedback }),
        },
      },
      { new: true }
    );
    let ratingAverage = await HotelBooking.aggregate(
      [
        {
          $match: {
            hotelId: ObjectId(HotelId),
          },
        },
        {
          $group: {
            _id: null,
            starRatingAverage: {
              $avg: "$starRating",
            },
          },
        },
      ],
      async (err, AverageResponse) => {
        console.log(AverageResponse);
        let HotelRatingAverage = AverageResponse[0].starRatingAverage;
        let HotelRatingResp = await Hotel.findByIdAndUpdate(ObjectId(HotelId), {
          $set: {
            starRating: HotelRatingAverage,
          },
        });
        res.json({ HotelResp, AverageResponse, HotelRatingResp });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});
// @route    POST api/hotelRep/hotelBooking
// @desc     List of Customers who have made Booking to a Hotel
// @access   Private
router.get("/hotelBooking", auth, async (req, res) => {
  try {
    await HotelRep.aggregate(
      [
        {
          $match: {
            _id: ObjectId(req.user.id),
          },
        },
        {
          $lookup: {
            from: "hotels",
            localField: "_id",
            foreignField: "hotelRep",
            as: "Hotel",
          },
        },
        {
          $lookup: {
            from: "hotelbookings",
            localField: "Hotel._id",
            foreignField: "hotelId",
            as: "HotelBooking",
          },
        },
        {
          $lookup: {
            from: "rooms",
            localField: "HotelBooking.RoomId",
            foreignField: "_id",
            as: "Rooms",
          },
        },
        {
          $lookup: {
            from: "customers",
            localField: "HotelBooking.customerId",
            foreignField: "_id",
            as: "Customer",
          },
        },
        {
          $lookup: {
            from: "payments",
            localField: "HotelBooking.paymentId",
            foreignField: "_id",
            as: "Payment",
          },
        },
        {
          $project: {
            Booking: {
              $map: {
                input: {
                  $zip: {
                    inputs: [
                      "$HotelBooking",
                      "$Customer",
                      "$Payment",
                      "$Rooms",
                    ],
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
                  Payment: {
                    $arrayElemAt: ["$$el", 2],
                  },
                  Rooms: {
                    $arrayElemAt: ["$$el", 3],
                  },
                },
              },
            },
          },
        },
        {
          $unwind: "$Booking",
        },
      ],
      (error, response) => {
        if (error) res.status(500).send("Server Error");
        res.json(response);
        console.log(response);
      }
    );
  } catch (error) {
    res.status(500).send("Server Erorr");
    console.log(error);
  }
});

router.post("/roomAvailability", async (req, res) => {
  try {
    let { RoomId, startDate, endDate, roomType } = req.body;
    console.log(RoomId + " " + startDate + " " + endDate + " " + roomType);
    console.log(RoomId);
    await HotelBooking.aggregate(
      [
        {
          $match: {
            $expr: {
              $and: [
                {
                  $eq: ["$RoomId", ObjectId(RoomId)],
                },
                {
                  $eq: ["$status", "active"],
                },
                {
                  $gte: ["$fromDate", new Date(startDate)],
                },
                {
                  $lte: ["$toDate", new Date(endDate)],
                },
              ],
            },
          },
        },
        {
          $lookup: {
            from: "rooms",
            as: "Room",
            let: {},
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      {
                        $eq: ["$roomType", roomType],
                      },
                    ],
                  },
                },
              },
            ],
          },
        },
        {
          $group: {
            _id: null,
            total: {
              $sum: "$NoOfRooms",
            },
          },
        },
      ],
      (err, response) => {
        if (err) res.status(400).json({ err });
        res.json({ response });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
