const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const { ObjectId } = require("mongodb");
const Customer = require("../models/UserManagment/Customer");
const TravelAgent = require("../models/UserManagment/TravelAgent");
const AgentProfile = require("../models/TravelAgent/AgentProfile");
const AgentBooking = require("../models/Booking/AgentBooking");
const Stripe = require("stripe");
const stripe = new Stripe("sk_test_hqcxEpMNto862mGujgGpONho004USKiy2K");

// @route    POST api/travelAgent
// @desc     Register TravelAgent
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
    // if (Number(serviceCharges) < 1000) {
    //   return res.json({
    //     errors: [{ msg: "Charges should be greater than 1000" }]
    //   });
    // }
    try {
      let agent = await TravelAgent.findOne({ email });

      if (agent) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      agent = new TravelAgent({
        name,
        email,
        password,
        mobile,
        cnic,
        connectid,
      });

      const salt = await bcrypt.genSalt(10);

      agent.password = await bcrypt.hash(password, salt);
      await agent.save();

      const payload = {
        user: {
          AgentId: agent.id,
          userType: "3",
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

// @route    POST api/travelAgent/addAgentProfile
// @desc     Add Travel Agency Profile
// @access   Private
router.post("/addAgentProfile", auth, async (req, res) => {
  try {
    console.log(req.user);
    const {
      AgencyName,
      AgencyCharges,
      AgencyLocation,
      AgencyDescription,
      AgencyLogo,
      AgentHotel,
      AgentGuide,
    } = req.body;
    let AgentId = req.user.AgentId;
    let AgentFields = {};
    if (AgentId) AgentFields.AgentId = AgentId;
    if (AgencyName) AgentFields.AgencyName = AgencyName;
    if (AgencyCharges) AgentFields.AgencyCharges = AgencyCharges;
    if (AgencyLocation) AgentFields.AgencyLocation = AgencyLocation;
    if (AgencyDescription) AgentFields.AgencyDescription = AgencyDescription;
    if (AgencyLogo) AgentFields.AgencyLogo = AgencyLogo;
    AgentFields.services = {
      hotel: AgentHotel,
      guide: AgentGuide,
    };
    console.log(
      AgentHotel +
        " " +
        AgentGuide +
        " " +
        AgencyName +
        " " +
        AgencyCharges +
        " " +
        AgencyLocation +
        " " +
        AgencyDescription +
        " " +
        AgencyLogo
    );
    let AgentResp = await AgentProfile.findOneAndUpdate(
      { AgentId: req.user.AgentId },
      { $set: AgentFields },
      { new: true, upsert: true }
    );
    res.json({ AgentResp });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

// @route    POST api/travelAgent/getAgentProfiles
// @desc     Get all Travel Agency Profile
// @access   Public
router.get("/getAgentProfiles", async (req, res) => {
  try {
    console.log("Agent Profile");
    await AgentProfile.aggregate(
      [
        {
          $lookup: {
            from: "travelagents",
            localField: "AgentId",
            foreignField: "_id",
            as: "Agent",
          },
        },
        {
          $unwind: "$Agent",
        },
        {
          $lookup: {
            from: "agentbookings",
            localField: "_id",
            foreignField: "agentProfileId",
            as: "AgentBookings",
          },
        },
        {
          $lookup: {
            from: "customers",
            localField: "AgentBookings.customerId",
            foreignField: "_id",
            as: "customer",
          },
        },
        {
          $project: {
            Feedback: {
              $map: {
                input: {
                  $zip: {
                    inputs: ["$AgentBookings", "$customer"],
                  },
                },
                as: "el",
                in: {
                  AgentBookings: {
                    $arrayElemAt: ["$$el", 0],
                  },
                  Customer: {
                    $arrayElemAt: ["$$el", 1],
                  },
                },
              },
            },
            Agent: "$Agent",
          },
        },
        {
          $lookup: {
            from: "agentprofiles",
            localField: "_id",
            foreignField: "_id",
            as: "AgentProfiles",
          },
        },
        {
          $unwind: "$AgentProfiles",
        },
        {
          $set: {
            "AgentProfiles.Agent": "$Agent",
            "AgentProfiles.Feedback": "$Feedback",
          },
        },
        {
          $replaceWith: "$AgentProfiles",
        },
      ],
      (err, resp) => {
        console.log(resp);

        if (err) res.status(400).json({ err });
        res.json({ resp });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

// @route    POST api/travelAgent/saveAgentBooking
// @desc     Customer Books a Travel agent
// @access   Private
router.post("/saveAgentBooking", auth, async (req, res) => {
  try {
    const { agentProfile, PaymentID } = req.body;
    let CustomerId = ObjectId(req.user.id);
    console.log(agentProfile + " " + PaymentID + " " + CustomerId);
    let newAgentBooking = new AgentBooking({
      agentProfileId: ObjectId(agentProfile),
      paymentId: ObjectId(PaymentID),
      customerId: CustomerId,
    });
    let AgentBookingResp = await newAgentBooking.save();
    res.json({ AgentBookingResp });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

router.get("/getCustomerBookings", auth, async (req, res) => {
  try {
    let AgentId = ObjectId(req.user.AgentId);
    console.log(AgentId);
    await TravelAgent.aggregate(
      [
        {
          $match: {
            _id: AgentId,
          },
        },
        {
          $lookup: {
            from: "agentprofiles",
            localField: "_id",
            foreignField: "AgentId",
            as: "agentprofile",
          },
        },
        {
          $unwind: "$agentprofile",
        },
        {
          $lookup: {
            from: "agentbookings",
            localField: "agentprofile._id",
            foreignField: "agentProfileId",
            as: "agentbooking",
          },
        },
        {
          $unwind: "$agentbooking",
        },

        {
          $lookup: {
            from: "payments",
            localField: "agentbooking.paymentId",
            foreignField: "_id",
            as: "Payment",
          },
        },
        {
          $unwind: "$Payment",
        },
        {
          $lookup: {
            from: "customers",
            localField: "agentbooking.customerId",
            foreignField: "_id",
            as: "Customer",
          },
        },
        {
          $unwind: "$Customer",
        },
      ],
      (err, response) => {
        if (err) res.status(400).json({ err });
        console.log(response);
        res.json(response);
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

router.post("/LoginCustomer", auth, async (req, res) => {
  try {
    const { email } = req.body;
    let user = await Customer.findOne({ email });
    const payload = {
      user: {
        id: user.id,
        userType: "0",
      },
    };

    jwt.sign(payload, config.get("jwtSecret"), {}, (err, token) => {
      if (err) throw err;
      if (token) res.json({ token });
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/addHotelBooking", auth, async (req, res) => {
  try {
    const {
      HotelRepEmail,
      HotelId,
      hotelRep,
      reserveFromDate,
      reserveToDate,
      reserveAdult,
      reserveChildren,
      reserveRoom,
      reserveRoomId,
    } = req.body;

    let AgentProfileResp = await AgentProfile.findOne({
      AgentId: ObjectId(req.user.AgentId),
    });
    let AgentProfileId = AgentProfileResp._id;

    console.log("Agent Profile Resp=");
    console.log(AgentProfileResp);
    console.log("Agent Profile Id=");

    AgentProfileId = ObjectId(AgentProfileId);
    console.log(AgentProfileId);
    // res.json(AgentProfileId)
    let AgentBookingFields = {};

    AgentBookingFields.HotelBooking = {};
    AgentBookingFields.HotelBooking.HotelRepEmail = HotelRepEmail;
    AgentBookingFields.HotelBooking.HotelId = HotelId;
    AgentBookingFields.HotelBooking.hotelRep = hotelRep;
    AgentBookingFields.HotelBooking.reserveFromDate = reserveFromDate;
    AgentBookingFields.HotelBooking.reserveToDate = reserveToDate;
    AgentBookingFields.HotelBooking.reserveAdult = reserveAdult;
    AgentBookingFields.HotelBooking.reserveChildren = reserveChildren;
    AgentBookingFields.HotelBooking.reserveRoom = reserveRoom;
    AgentBookingFields.HotelBooking.reserveRoomId = ObjectId(reserveRoomId);
    console.log("ReserveRoomId=");
    console.log(reserveRoomId);
    let AgentBookingResp = await AgentBooking.updateOne(
      { agentProfileId: AgentProfileId },
      { $set: AgentBookingFields },
      { new: true }
    );

    res.json(AgentBookingResp);
    // res.json({ msg: "Working" })
  } catch (error) {
    console.error(error);
  }
});

router.post("/addGuideBooking", auth, async (req, res) => {
  try {
    const { startDate, endDate, email, GuideId } = req.body;
    let AgentProfileResp = await AgentProfile.findOne({
      AgentId: ObjectId(req.user.AgentId),
    });
    let AgentProfileId = ObjectId(AgentProfileResp._id);
    let AgentBookingFields = {};

    AgentBookingFields.GuideBooking = {};
    AgentBookingFields.GuideBooking.GuideId = ObjectId(GuideId);
    AgentBookingFields.GuideBooking.email = email;
    AgentBookingFields.GuideBooking.startDate = startDate;
    AgentBookingFields.GuideBooking.endDate = endDate;
    let AgentBookingResp = await AgentBooking.updateOne(
      { agentProfileId: AgentProfileId },
      { $set: AgentBookingFields },
      { new: true }
    );

    res.json(AgentBookingResp);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

router.post("/completeAgentBooking", auth, async (req, res) => {
  try {
    const { AgentId, AgentBookingId, Amount, Comission } = req.body;
    console.log(
      AgentId + " " + AgentBookingId + " " + Amount + " " + Comission
    );
    let amountToTransfer = Amount - Comission;
    amountToTransfer = Math.ceil((amountToTransfer / 160) * 100);
    let agent = await TravelAgent.findById(ObjectId(AgentId));
    console.log(agent);
    let connectid = agent.connectid;
    const transfer = await stripe.transfers.create({
      amount: amountToTransfer,
      currency: "USD",
      destination: connectid,
    });
    console.log(transfer);
    const updateFields = {};
    updateFields.status = "completed";
    console.log(updateFields);
    let booking = await AgentBooking.findByIdAndUpdate(
      ObjectId(AgentBookingId),
      {
        $set: updateFields,
      },
      { new: true }
    );
    console.log(booking);
    res.json({ booking });
    console.log();
  } catch (error) {
    console.log(error);
  }
});

router.post("/addFeedback", auth, async (req, res) => {
  const { AgentId, AgentProfileId, BookingId, starRating, feedback } = req.body;
  console.log(starRating);

  let AgentResp = await AgentBooking.findByIdAndUpdate(
    ObjectId(BookingId),
    {
      $set: {
        ...(starRating && { starRating: parseInt(starRating) }),
        ...(feedback && { feedback }),
      },
    },
    { new: true }
  );
  let ratingAverage = await AgentBooking.aggregate(
    [
      {
        $match: {
          agentProfileId: ObjectId(AgentProfileId),
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
      let AgentRatingAverage = AverageResponse[0].starRatingAverage;
      let AgentRatingResp = await TravelAgent.findByIdAndUpdate(
        ObjectId(AgentId),
        {
          $set: {
            starRating: AgentRatingAverage,
          },
        }
      );
      res.json({ AgentResp, AverageResponse, AgentRatingResp });
    }
  );
});

router.post("/cancelBooking", auth, async (req, res) => {
  const { bookingId } = req.body;
  // let bookingId = data.bookingId;
  const updateFields = {};
  updateFields.status = "cancelled";
  let booking = await AgentBooking.findByIdAndUpdate(
    ObjectId(bookingId),
    {
      $set: updateFields,
    },
    { new: true }
  );
  console.log(booking);
  res.json({ booking });
  // console.log(req.body);
  // console.log(data.customer);
});

module.exports = router;
