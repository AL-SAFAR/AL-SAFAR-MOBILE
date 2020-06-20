const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const fetch = require("node-fetch");
const FormData = require("form-data");
const config = require("config");
const { ObjectId } = require("mongodb");
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const schedule = require("node-schedule");
const Stripe = require("stripe");
const stripe = new Stripe("sk_test_hqcxEpMNto862mGujgGpONho004USKiy2K");
const Guide = require("../models/UserManagment/Guide");
const GuideProfile = require("../models/UserManagment/guideProfile");
const GuideBooking = require("../models/Booking/GuideBooking");
const Payment = require("../models/Payment/Payment");
const Customer = require("../models/UserManagment/Customer");
// @route    POST api/guide
// @desc     Register guide
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
    // check("serviceCharges", "Charges should be greater than 1000").isLength({
    //   min: 3
    // })
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, mobile, cnic, connectid } = req.body;
    try {
      let guide = await Guide.findOne({ email });

      if (guide) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      guide = new Guide({
        name,
        email,
        password,
        mobile,
        cnic,
        connectid,
      });

      const salt = await bcrypt.genSalt(10);

      guide.password = await bcrypt.hash(password, salt);

      await guide.save();

      const payload = {
        user: {
          id: guide.id,
          userType: "2",
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

// @route    POST api/guide/updateProfile
// @desc     Update Guide Profile
// @access   Public
router.post("/updateProfile", auth, async (req, res) => {
  let { name, email, cnic, mobile, Image } = req.body;

  // let file = req.files.Image;
  // let fileName =
  //   file.name.split(".")[0] + req.user.id + "." + file.name.split(".")[1];
  const guideFields = {};
  if (name) guideFields.name = name;
  if (email) guideFields.email = email;
  if (cnic) guideFields.cnic = cnic;
  if (mobile) guideFields.mobile = mobile;
  if (Image) guideFields.Image = Image;

  // console.log(req.user.id);
  let guide = await Guide.findById(req.user.id);

  if (guide.email !== email) {
    let guideEmail = await Guide.findOne({ email });
    console.log(guideEmail);
    if (guideEmail) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Provided Email is in Use" }] });
    }
  }

  await Guide.findByIdAndUpdate(
    req.user.id,
    { $set: guideFields },
    { new: true }
  );
  file.mv("client/src/images/TravelGuideProfile/" + fileName, (err) => {
    if (err) {
      // res.send(err);
      console.error(err);
    }
  });
  res.json({ msg: "Profile Updated Successfully" });

  console.log(guide);
});

// @route    POST api/guideprofile
// @desc     Create Guide Profile
// @access   Public
router.post("/guideprofile", auth, async (req, res) => {
  try {
    let {
      address,
      city,
      serviceCharges,
      description,
      placeNames,
      placeImages,
    } = req.body;
    console.log(req.user);
    console.log("Request Body=");
    console.log(req.body);
    // placenames = placenames[1].split(",");
    const guideFields = {};
    if (address) guideFields.address = address;
    if (city) guideFields.city = city;
    if (serviceCharges) guideFields.serviceCharges = serviceCharges;
    if (description) guideFields.description = description;
    let counter = 0;
    let places = [];
    placeNames = placeNames.split(",");
    placeImages = placeImages.split(",");
    if (placeNames.length > 0) {
      placeNames.forEach((placeName) => {
        places.push({
          placeName: placeNames[counter],
          placeImage: placeImages[counter],
        });
        ++counter;
      });
      guideFields.places = places;
    }
    // if (req.files) {
    //   let places = [];
    //   let counter = 0;
    //   let fileKeys = Object.keys(req.files);
    //   fileKeys.forEach(async function (key) {
    //     let file = req.files[key];
    //     const data = new FormData();
    //     file = file.createReadStream(file);
    //     data.append("file", file);
    //     data.append("upload_preset", "TravelGuide");
    //     const CloudinaryResp = await fetch(
    //       " https://api.cloudinary.com/v1_1/al-safar435/image/upload",
    //       {
    //         method: "POST",
    //         body: data,
    //       }
    //     );
    //     const fileURL = await CloudinaryResp.json();
    //     console.log(fileURL);
    //     let fileName = fileURL.secure_url;
    //     console.log("FILE URL=");
    //     console.log(fileName);
    //     //   file.name.split(".")[0] + req.user.id + "." + file.name.split(".")[1];
    //     places.push({ placeName: placenames[counter], placeImage: fileName });
    //     ++counter;
    //     // file.mv("client/src/images/TravelGuidePlaces/" + fileName, (err) => {
    //     //   if (err) {
    //     //     // res.send(err);
    //     //     console.error(err);
    //     //   }
    //     // });
    //   });
    //   guideFields.places = places;

    //   let GuideRep = await Guide.findById(req.user.id);
    //   if (!GuideRep) return res.status(401).json({ msg: "Not authorized" });
    //   let guideprofile = await GuideProfile.findOneAndUpdate(
    //     { guide: req.user.id },
    //     { $set: guideFields },
    //     { new: true, upsert: true }
    //   );
    //   // res.json(guideprofile);
    // }
    let GuideRep = await Guide.findById(req.user.id);
    if (!GuideRep) return res.status(401).json({ msg: "Not authorized" });
    let guideprofile = await GuideProfile.findOneAndUpdate(
      { guide: req.user.id },
      { $set: guideFields },
      { new: true, upsert: true }
    );
    // console.clear();
    // console.log(guideFields);

    res.json({ msg: "Guide Profile Added Successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route    POST api/guideDetails
// @desc     GuideProfile Along with Guides User Profile
// @access   Public
router.get("/guidedetails", async (req, res) => {
  try {
    let GuideDetails = [];
    Guide.aggregate(
      [
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
      ],
      function (error, response) {
        if (error) res.status(500).send("Server Error");
        res.json(response);
        console.log(response);
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route    POST api/guideprofile
// @desc     Save Guide Booking
// @access   Private
router.post("/guideBooking", auth, async (req, res) => {
  try {
    const { GuideID, PaymentID, startDate, endDate } = req.body;
    let newBooking = new GuideBooking({
      paymentId: PaymentID,
      guideId: GuideID,
      customerId: req.user.id,
      status: "active",
      startDate,
      endDate,
    });
    let BookingResp = await newBooking.save();
    // var date = new Date(2020, 5, 15, 20, 15, 0);
    var date = new Date(endDate);
    console.log(date);
    console.log(BookingResp._id);
    let Guideres = await Guide.findById(ObjectId(GuideID));
    console.log(Guideres);
    let paymentRes = await Payment.findById(ObjectId(PaymentID));
    console.log(paymentRes);
    let amount = paymentRes.amount;
    let comission = paymentRes.commission;
    let amountToTransfer = amount - comission;
    amountToTransfer = (amountToTransfer / 160) * 100; //Convert to USD
    let connectid = Guideres.connectid;
    let BookingId = BookingResp._id.toString();
    console.log({ BookingId, amountToTransfer, connectid });
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
      let booking = await GuideBooking.findByIdAndUpdate(
        ObjectId(BookingId),
        {
          $set: updateFields,
        },
        { new: true }
      );
      console.log(booking);
    });
    console.log(BookingResp);
    res.json({ BookingResp });
  } catch (error) {
    console.log(error);
  }
});

router.get("/guideBookings", auth, async (req, res) => {
  // console.log(req.user.id);
  // res.json({ user: req.user.id });
  await GuideBooking.aggregate(
    [
      {
        $match: {
          guideId: ObjectId(req.user.id),
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
          from: "customers",
          localField: "payment.customerId",
          foreignField: "_id",
          as: "customer",
        },
      },
      {
        $unwind: "$customer",
      },
    ],
    (error, response) => {
      if (error) res.status(500).send("Server Error");
      res.json(response);
      console.log(response);
    }
  );
});

router.post("/cancelBookingRequest", auth, async (req, res) => {
  const { bookingId } = req.body;
  // let bookingId = data.bookingId;
  const updateFields = {};
  updateFields.status = "cancelled";
  let booking = await GuideBooking.findByIdAndUpdate(ObjectId(bookingId), {
    $set: updateFields,
  });
  console.log(booking);
  res.json({ booking });
  // console.log(req.body);
  // console.log(data.customer);
});

router.post("/addFeedback", auth, async (req, res) => {
  const { GuideId, BookingId, starRating, feedback } = req.body;
  console.log(starRating);

  let GuideResp = await GuideBooking.findByIdAndUpdate(
    ObjectId(BookingId),
    {
      $set: {
        ...(starRating && { starRating: parseInt(starRating) }),
        ...(feedback && { feedback }),
      },
    },
    { new: true }
  );
  let ratingAverage = await GuideBooking.aggregate(
    [
      {
        $match: {
          guideId: ObjectId(GuideId),
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
      let GuideRatingAverage = AverageResponse[0].starRatingAverage;
      let GuideRatingResp = await Guide.findByIdAndUpdate(ObjectId(GuideId), {
        $set: {
          starRating: GuideRatingAverage,
        },
      });
      res.json({ GuideResp, AverageResponse, GuideRatingResp });
    }
  );
});

module.exports = router;
