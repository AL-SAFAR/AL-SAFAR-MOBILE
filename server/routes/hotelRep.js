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

const async = require("async");

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

    const { name, email, password, mobile, cnic } = req.body;

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

//@route    put api/hotelRep/:id
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

// @route    post api/hotelRep/createHotelProfile
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
  } = req.body;

  // console.log("Body=");
  console.log(req.body);
  console.log("File=");
  console.log(req.files);
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

  if (req.files) {
    var fileNamesArray = [];
    var fileKeys = Object.keys(req.files);

    fileKeys.forEach(function (key) {
      // fileNames.push(req.files[key]);

      let file = req.files[key];
      fileName =
        file.name.split(".")[0] + req.user.id + "." + file.name.split(".")[1];
      fileNamesArray.push(fileName);
      file.mv("client/src/images/HotelProfile/" + fileName, (err) => {
        if (err) {
          // res.send(err);
          console.error(err);
        }
      });
    });
    hotelFields.hotelImages = fileNamesArray;
  }
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

// @route    post api/hotelRep/addNewRoom
// @desc     Add New Room
// @access   Private
router.post("/addNewRoom", auth, async (req, res) => {
  const { roomType, roomMaxOccupancy, isAvailable, NoOfRooms, rent } = req.body;

  try {
    // Using upsert option (creates new doc if no match is found):

    //find the hotel against the hotelRep ID
    let hotel = await Hotel.findOne({ hotelRep: req.user.id });
    if (!hotel) return res.status(401).json({ msg: "Not authorized" });

    let roomObj = await Room.findOne({ hotelId: hotel.id, roomType });
    if (!roomObj) {
      for (let i = 0; i < NoOfRooms; i++) {
        let room = new Room({
          hotelId: hotel.id,
          rent,
          roomType,
          NoOfRooms,
          roomMaxOccupancy,
          ...(isAvailable && isAvailable),
        });
        await room.save();
        //
      }
      res.json({
        hotelId: hotel.id,
        rent,
        roomType,
        NoOfRooms,
        roomMaxOccupancy,
        ...(isAvailable && isAvailable),
      });
      return;
    }

    if (roomObj.NoOfRooms <= NoOfRooms) {
      let RoomToAdd = roomObj.NoOfRooms - NoOfRooms;
      for (let i = 0; i < RoomToAdd; i++) {
        let room = new Room({
          hotelId: hotel.id,
          rent,
          roomType,
          NoOfRooms,
          roomMaxOccupancy,
          ...(isAvailable && isAvailable),
        });

        await room.save();
      }
      await Room.updateMany(
        { hotelId: hotel.id, roomType },
        {
          $set: {
            hotelId: hotel.id,
            rent,
            roomType,
            NoOfRooms,
            roomMaxOccupancy,
            ...(isAvailable && isAvailable),
          },
        },
        { new: true }
      );
      res.json({
        hotelId: hotel.id,
        rent,
        roomType,
        NoOfRooms,
        roomMaxOccupancy,
        ...(isAvailable && isAvailable),
      });
      return;
    } else {
      let NoOfRoomToDelete = NoOfRooms - roomObj.NoOfRooms;
      let ListOfRoom = await Room.find({ hotelId: hotel.id, roomType });
      var RoomToDelete = ListOfRoom.slice(NoOfRoomToDelete);
      RoomToDelete.forEach(async function (room) {
        await Room.findByIdAndDelete(room._id);
      });
      res.json({
        hotelId: hotel.id,
        rent,
        roomType,
        NoOfRooms,
        roomMaxOccupancy,
        ...(isAvailable && isAvailable),
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    get api/hotelRep/uniquerooms
// @desc     Get Unique Rooms
// @access   Private
router.post("/uniquerooms", auth, async (req, res) => {
  try {
    // let { id } = req.body;
    console.log("req.user.id=");
    console.log(req.user.id);
    let uniquerooms = [];
    let hotel = await Hotel.findOne({ hotelRep: req.user.id });
    if (!hotel) return res.status(401).json({ msg: "Hotel Not Found" });
    console.log(hotel._id);
    let Economy = await Room.findOne({
      hotelId: hotel._id,
      roomType: "Economy",
    });
    console.log(Economy);
    if (Economy) {
      console.log("Economy=");
      console.log(Economy);
      uniquerooms.push(Economy);
    }
    let Luxury = await Room.findOne({ hotelId: hotel._id, roomType: "Luxury" });
    console.log(Luxury);
    if (Luxury) uniquerooms.push(Luxury);
    let Deluxe = await Room.findOne({
      hotelId: hotel._id,
      roomType: "Delexue",
    });
    console.log(Deluxe);
    if (Deluxe) uniquerooms.push(Deluxe);
    res.json(uniquerooms);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
