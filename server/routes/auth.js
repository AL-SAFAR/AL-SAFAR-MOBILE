const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");

const { check, validationResult } = require("express-validator");
const Customer = require("../models/UserManagment/Customer");
const HotelRep = require("../models/UserManagment/HotelRep");
const Guide = require("../models/UserManagment/Guide");
const Driver = require("../models/UserManagment/Driver");
const TravelAgent = require("../models/UserManagment/TravelAgent");
const SupportAssistant = require("../models/UserManagment/SupportAssistant");

//@route    GET api/auth
//@desc     Get logged in customer
//@access   Private
router.get("/", auth, async (req, res) => {
  try {
    if (req.user.userType === "0") {
      const customer = await Customer.findById(req.user.id).select("-password");
      res.json(customer);
    } else if (req.user.userType === "1") {
      const hotelRep = await HotelRep.findById(req.user.id).select("-password");
      res.json(hotelRep);
    } else if (req.user.userType === "2") {
      const guide = await Guide.findById(req.user.id).select("-password");
      res.json(guide);
    } else if (req.user.userType === "4") {
      const driver = await Driver.findById(req.user.id).select("-password");
      res.json(driver);
    }
    // else if (req.type === "2") {
    //   const guide = await HotelRep.findById(req.Guide.id).select(
    //     "-password"
    //   );
    //   res.json(hotelRep);
    // } else if (req.type === "3") {
    //   const hotelRep = await HotelRep.findById(req.hotelRep.id).select(
    //     "-password"
    //   );
    //   res.json(hotelRep);
    // }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//@route    POST api/auth
//@desc     LogIn customer & Get token
//@access   Public
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, type } = req.body;
    try {
      let user;
      console.log("email=" + email);
      console.log("password=" + password);
      console.log("type=" + type);
      if (type === "0") user = await Customer.findOne({ email });
      else if (type === "1") user = await HotelRep.findOne({ email });
      else if (type === "2") user = await Guide.findOne({ email });
      else if (type === "3") user = await TravelAgent.findOne({ email });
      else if (type === "4") user = await Driver.findOne({ email });
      else if (type === "5") user = await Admin.findOne({ email });
      else if (type === "6") user = await SupportAssistant.findOne({ email });

      // console.log(user);

      if (!user) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }
      if (type !== "3") {
        const payload = {
          user: {
            id: user.id,
            userType: type,
          },
        };

        jwt.sign(
          payload,
          config.get("jwtSecret"),
          {
            expiresIn: 360000,
          },
          (err, token) => {
            if (err) throw err;
            if (token) res.json({ token });
          }
        );
      } else {
        const payload = {
          user: {
            AgentId: user.id,
            userType: type,
          },
        };

        jwt.sign(
          payload,
          config.get("jwtSecret"),
          {
            expiresIn: 360000,
          },
          (err, token) => {
            if (err) throw err;
            if (token) res.json({ token });
          }
        );
      }
    } catch (err) {
      console.error(err.mesaage);
      res.status(500).send("Server error");
    }
  }
);

//@route    POST api/auth/changePass
//@desc     change password
//@access   Private

router.get(
  "/changePass",
  [
    check(
      "password",
      "Please enter a password with 8 or more characters"
    ).isLength({ min: 8 }),
    check(
      "password",
      "Password should contain at least 8 characters which include uppercase,lowercase and a number"
    ).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i"),
  ],
  auth,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let user;
      let userFields = {};
      let { password } = req.body;
      let { id, userType } = req.user;

      const salt = await bcrypt.genSalt(10);

      // await agent.save();

      if (userType === "0") {
        password = await bcrypt.hash(password, salt);
        console.log(id);
        console.log(password);
        user = await Customer.findOneAndUpdate(
          { _id: id },
          { $set: { password } },
          { new: true }
        );
        res.send("Password Updated");
      }
      if (userType === "1") {
        password = await bcrypt.hash(password, salt);
        console.log(id);
        console.log(password);
        user = await HotelRep.findOneAndUpdate(
          { _id: id },
          { $set: { password } },
          { new: true }
        );
        res.send("Password Updated");
      } else if (userType === "2") {
        password = await bcrypt.hash(password, salt);
        console.log(id);
        console.log(password);
        user = await Guide.findOneAndUpdate(
          { _id: id },
          { $set: { password } },
          { new: true }
        );
        res.send("Password Updated");
      } else if (userType === "3") {
        password = await bcrypt.hash(password, salt);
        console.log(id);
        console.log(password);
        user = await TravelAgent.findOneAndUpdate(
          { _id: id },
          { $set: { password } },
          { new: true }
        );
        res.send("Password Updated");
      } else if (userType === "4") {
        password = await bcrypt.hash(password, salt);
        console.log(id);
        console.log(password);
        user = await Driver.findOneAndUpdate(
          { _id: id },
          { $set: { password } },
          { new: true }
        );
        res.send("Password Updated");
      } else if (userType === "5") {
        password = await bcrypt.hash(password, salt);
        console.log(id);
        console.log(password);
        user = await Admin.findOneAndUpdate(
          { _id: id },
          { $set: { password } },
          { new: true }
        );
        res.send("Password Updated");
      } else if (userType === "6") {
        password = await bcrypt.hash(password, salt);
        console.log(id);
        console.log(password);
        user = await SupportAssistant.findOneAndUpdate(
          { _id: id },
          { $set: { password } },
          { new: true }
        );
        res.send("Password Updated");
      }
    } catch (error) {
      console.log(error);
    }
  }
);
module.exports = router;
