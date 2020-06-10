const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");

const Guide = require("../models/UserManagment/Guide");
const GuideProfile = require("../models/UserManagment/guideProfile");

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

    const { name, email, password, mobile, cnic } = req.body;
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
  let { name, email, cnic, mobile } = req.body;

  let file = req.files.Image;
  let fileName =
    file.name.split(".")[0] + req.user.id + "." + file.name.split(".")[1];
  const guideFields = {};
  if (name) guideFields.name = name;
  if (email) guideFields.email = email;
  if (cnic) guideFields.cnic = cnic;
  if (mobile) guideFields.mobile = mobile;
  if (req.files) guideFields.Image = fileName;

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
    let { address, city, serviceCharges, description, placenames } = req.body;
    console.log(req.user);
    console.log("Request Body=");
    console.log(req.body);
    placenames = placenames[1].split(",");
    const guideFields = {};
    if (address) guideFields.address = address;
    if (city) guideFields.city = city;
    if (serviceCharges) guideFields.serviceCharges = serviceCharges;
    if (description) guideFields.description = description;

    if (req.files) {
      let places = [];
      let counter = 0;
      let fileKeys = Object.keys(req.files);
      fileKeys.forEach(function (key) {
        let file = req.files[key];
        let fileName =
          file.name.split(".")[0] + req.user.id + "." + file.name.split(".")[1];
        places.push({ placeName: placenames[counter], placeImage: fileName });
        ++counter;
        file.mv("client/src/images/TravelGuidePlaces/" + fileName, (err) => {
          if (err) {
            // res.send(err);
            console.error(err);
          }
        });
      });
      guideFields.places = places;

      let GuideRep = await Guide.findById(req.user.id);
      if (!GuideRep) return res.status(401).json({ msg: "Not authorized" });
      let guideprofile = await GuideProfile.findOneAndUpdate(
        { guide: req.user.id },
        { $set: guideFields },
        { new: true, upsert: true }
      );
      // res.json(guideprofile);
    }
    // console.clear();
    // console.log(guideFields);

    res.json({ msg: "Guide Profile Added Successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route    get api/guideprofile
// @desc     view Guide Profile
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

module.exports = router;
