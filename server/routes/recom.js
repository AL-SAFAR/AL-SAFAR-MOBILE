const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { ObjectId } = require("mongodb");
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const recommendation = require("./recomFunction");

const Customer = require("../models/UserManagment/Customer");
const Hotel = require("../models/HotelManagment/Hotel");
const HotelBooking = require("../models/HotelManagment/HotelBooking");
const Room = require("../models/HotelManagment/Room");
const Chat = require("./chat");
const GuideBooking = require("../models/Booking/GuideBooking");
const { response } = require("express");

router.post("/", async (req, res) => {
  // const res
  try {
    let { budget, days, needHotel, needGuide, city } = req.body;
    console.log(budget);
    let filteredHotels,
      hotels,
      budgetForHotelperDay,
      budgetForGuideperDay,
      filteredGuides,
      guides,
      filteredData;
    if (needHotel && !needGuide) {
      console.log("needHotel");
      budgetForHotelperDay = budget / days;
      hotels = await recommendation.getHotels();

      filteredHotels = hotels.filter((hotel) =>
        hotel.Room.some((room) => room.rent <= budgetForHotelperDay)
      );
      filteredHotels = filteredHotels.filter((hotel) => hotel.city === city);
      //   console.log(filteredHotels);
      filteredData = {
        hotels: filteredHotels,
      };
      res.send(filteredData);
    } else if (needGuide && !needHotel) {
      budgetForGuideperDay = budget / days;
      guides = await recommendation.getGuides();

      filteredGuides = guides.filter((guide) =>
        guide.UserProfile.some(
          (UP) => UP.serviceCharges <= budgetForGuideperDay && UP.city === city
        )
      );

      console.log(filteredGuides);
      filteredData = {
        guides: filteredGuides,
      };
      res.send(filteredData);
    } else if (needGuide && needHotel) {
      budgetForHotelperDay = (budget * 0.7) / days;
      budgetForGuideperDay = (budget * 0.3) / days;
      hotels = await recommendation.getHotels();

      filteredHotels = hotels.filter((hotel) =>
        hotel.Room.some((room) => room.rent <= budgetForHotelperDay)
      );
      filteredHotels = filteredHotels.filter((hotel) => hotel.city === city);
      //   console.log(filteredHotels);
      guides = await recommendation.getGuides();
      filteredGuides = guides.filter((guide) =>
        guide.UserProfile.some(
          (UP) => UP.serviceCharges <= budgetForGuideperDay && UP.city === city
        )
      );
      console.log(filteredGuides);
      filteredData = {
        hotels: filteredHotels,
        guides: filteredGuides,
      };
      res.send(filteredData);
    }
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
