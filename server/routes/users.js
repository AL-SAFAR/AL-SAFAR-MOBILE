const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { ObjectId } = require("mongodb");
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");

const Customer = require("../models/UserManagment/Customer");
const Hotel = require("../models/HotelManagment/Hotel");
const HotelBooking = require("../models/HotelManagment/HotelBooking");
const Room = require("../models/HotelManagment/Room");

const GuideBooking = require("../models/Booking/GuideBooking");
const { response } = require("express");
const chat = require("./chat");
// @route    POST api/customers
// @desc     Register customer
// @access   Public
router.post(
  "/",
  [
    check("name", "full Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 8 or more characters"
    ).isLength({ min: 8 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let customer = await Customer.findOne({ email });

      if (customer) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      customer = new Customer({
        name,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);

      customer.password = await bcrypt.hash(password, salt);

      await customer.save();

      const payload = {
        user: {
          id: customer.id,
          userType: "0",
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

//@route    put api/customer/:id
//@desc     update Customer
//@access   Private
router.put("/:id", auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  console.log(req.body);
  const { name, email, password } = req.body;

  // console.log(req.user.id);
  // Build contact object
  const customerFields = {};
  if (email) customerFields.email = email;
  if (name) customerFields.name = name;
  if (password) {
    customerFields.password = password;
    const salt = await bcrypt.genSalt(10);

    customerFields.password = await bcrypt.hash(password, salt);
  }
  try {
    let customer = await Customer.findById(req.params.id);

    if (!customer) return res.status(404).json({ msg: "User not found" });

    // console.log(req.user.id);
    // Make sure user owns customer
    if (customer.id.toString() !== req.user.id)
      return res.status(401).json({ msg: "Not authorized" });

    customer = await Customer.findByIdAndUpdate(
      req.params.id,
      { $set: customerFields },
      { new: true }
    );

    res.json(customer);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   Get api/users/viewHotels
// @desc     Viiew Hotels
// @access   Public
router.get("/viewHotels", async (req, res) => {
  try {
    Hotel.aggregate([
      {
        $lookup: {
          from: "rooms", // collection name in db
          localField: "_id",
          foreignField: "hotelId",
          as: "rooms",
        },
      },
      { $unwind: "$rooms" },
      { $match: { "rooms.roomType": "economy" } },
      {
        $project: {
          id: 1,
          hotelRep: 1,
          hotelName: 1,
          address: 1,
          starRating: 1,
          description: 1,
          hotelImages: 1,
          extras: 1,
          city: 1,
          houseRules: 1,
          roomType: "$rooms.roomType",
          rent: "$rooms.rent",
        },
      },
    ]).exec(function (err, hotel) {
      // students contain WorksnapsTimeEntries
      // console.log(students);
      // var ecorooms = rooms.filter((room) => {
      //   return room.roomType == "economy";
      // });
      // console.log(rooms);
      res.json(hotel);
    });
    // const hotels = await Hotel.find();
    // res.json(hotels);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    post api/Customer/BookRoom
// @desc     Book Room
// @access   Private
router.post("/BookRoom/:hotelid", auth, async (req, res) => {
  const { fromDate, toDate, roomType, roomMaxOccupancy } = req.body;

  try {
    // Using upsert option (creates new doc if no match is found):
    // let hotelRep = await HotelRep.findById(req.user.id);
    // if (!hotelRep.id)
    //   return res.status(401).json({ msg: "Not authorized" });

    //find the hotel against the hotelRep ID
    let hotel = await Hotel.findById(req.params.hotelid);
    if (!hotel) return res.status(401).json({ msg: "Hotel Not available" });

    let roomAvailable = await Rooms.findOne({
      hotelId: hotel.id,
      isAvailable: true,
      roomType: roomType,
      roomMaxOccupancy: roomMaxOccupancy,
    });
    let hotelAlreadyBooked = await HotelBooking.findOne({
      toDate: { $lte: fromDate },
      hotelId: hotel.id,
    });
    if (!roomAvailable) {
      return res.status(401).json({
        msg: "No Rooms Available Fully Booked please Contact Customer Support",
      });
    } else if (!hotelAlreadyBooked) {
      return res.status(401).json({
        msg: "No Rooms Available Fully Booked please Contact Customer Support",
      });
    }
    if (roomAvailable) {
      let hotelBooking = new HotelBooking({
        hotelId: hotel.id,
        roomId: roomAvailable.id,
        customerId: req.user.id,
        fromDate: fromDate,
        toDate: toDate,
      });

      await hotelBooking.save();

      let room = await Room.findOneAndUpdate(
        { hotelId: hotel.id },
        { $set: { isAvailable: false } },
        { new: true }
      );
      await room.save();
      res.json("You will recieve your booking confirmation sortly");
    } else if (hotelAlreadyBooked) {
      let hotelBooking = new HotelBooking({
        hotelId: hotel.id,
        roomId: roomAvailable.id,
        customerId: req.user.id,
        fromDate: fromDate,
        toDate: toDate,
      });
      await hotelBooking.save();
      res.json("You will recieve your booking confirmation sortly");
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    get api/users/uniquerooms
// @desc     Get Unique Rooms
// @access   Public
router.post("/uniqueroomshotel", async (req, res) => {
  try {
    let hotel = await Hotel.findOne({ _id: req.body.id });
    if (!hotel) return res.status(401).json({ msg: "Hotel Not Found" });

    let Economy = await Room.findOne({
      hotelId: hotel._id,
      roomType: "Economy",
    });

    if (Economy || Economy !== null) {
      res.json(Economy.rent);
      return;
    }
    let Luxury = await Room.findOne({ hotelId: hotel._id, roomType: "Luxury" });

    if (Luxury || Luxury !== null) {
      res.json(Luxury.rent);
      return;
    }
    let Deleuxe = await Room.findOne({
      hotelId: hotel._id,
      roomType: "Delexue",
    });

    if (Deleuxe || Deleuxe !== null) {
      res.json(Deleuxe.rent);
      return;
    }
    res.json("");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   Get api/users/GuideBookings
// @desc     Viiew Guide Bookings
// @access   Public
router.get("/guideBookings", auth, async (req, res) => {
  try {
    let user = req.user.id;

    await GuideBooking.aggregate(
      [
        {
          $match: {
            customerId: ObjectId(user),
          },
        },
        {
          $lookup: {
            from: "payments",
            localField: "paymentId",
            foreignField: "_id",
            as: "payment",
          },
        },
        {
          $unwind: "$payment",
        },
        {
          $lookup: {
            from: "guides",
            localField: "payment.SPEmail",
            foreignField: "email",
            as: "guide",
          },
        },
        {
          $unwind: "$guide",
        },
      ],
      (error, response) => {
        if (error) res.status(500).send("Server Error");
        console.log(response);
        res.json(response);
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/conversation", async (req, res) => {
  const { sender, reciever } = req.body;
  const response = await chat.findOrCreateConversation(sender, reciever);
  res.send(response);
});

router.post("/addMessage", async (req, res) => {
  const { sender, reciever, text, type } = req.body;
  const response = await chat.addMessage(text, sender, reciever, type);
  res.send(response);
});
module.exports = router;
