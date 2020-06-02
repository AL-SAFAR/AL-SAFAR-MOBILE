const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");

const SupportAssistant = require("../models/UserManagment/SupportAssistant");

// @route    POST api/SupportAssistant
// @desc     Register SupportAssistant
// @access   Public
router.post(
  "/",
  [
    check("name", "full Name is required")
      .not()
      .isEmpty(),
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
    ).isLength({ min: 8}),
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

    const {
      name,
      email,
      password,
      mobile,
      cnic
    } = req.body;
    // if (Number(serviceCharges) < 1000) {
    //   return res.json({
    //     errors: [{ msg: "Charges should be greater than 1000" }]
    //   });
    // }
    try {
      let supportAssistant = await SupportAssistant.findOne({ email });

      if (supportAssistant) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      supportAssistant = new SupportAssistant({
        name,
        email,
        password,
        mobile,
        cnic
      });

      const salt = await bcrypt.genSalt(10);

      supportAssistant.password = await bcrypt.hash(password, salt);
      await supportAssistant.save();

      const payload = {
        user: {
          id: supportAssistant.id,
          userType: "5"
        }
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

module.exports = router;
