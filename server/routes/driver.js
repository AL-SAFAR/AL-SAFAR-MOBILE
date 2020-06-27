const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");

const Driver = require("../models/UserManagment/Driver");
const CarBooking = require("../models/Booking/CarBooking");
const DriverLocation = require("../models/Transport/DriverLocation");

// @route    get api/Driver
// @desc     ejs View
// @access   Public
router.get("/", async (req, res) => {
  res.render("index.html");
});

// @route    POST api/Driver/register
// @desc     Register Driver
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

    const {
      name,
      email,
      password,
      mobile,
      cnic,
      vehicle,
      city,
      profilePic,
    } = req.body;

    // if (Number(serviceCharges) < 1000) {
    //   return res.json({
    //     errors: [{ msg: "Charges should be greater than 1000" }]
    //   });
    // }
    try {
      let driver = await Driver.findOne({ email });

      if (driver) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      driver = new Driver({
        name,
        email,
        password,
        mobile,
        cnic,
        vehicle,
        city,
        profilePic,
      });

      const salt = await bcrypt.genSalt(10);

      driver.password = await bcrypt.hash(password, salt);
      await driver.save();

      const payload = {
        user: {
          id: driver.id,
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

// @route    Get api/Driver/:id
// @desc     get driver by id
// @access   Public
router.get("/driver/:id", async (req, res) => {
  Driver.findById(req.params.id, (err, driver) => {
    if (err) {
      res.send(err);
    }
    console.log(driver);
    res.send(driver);
  });
  // res.send("Bookings Route");
});

// @route    Get api/Driver/carBooking
// @desc     get bookings
// @access   Public
router.get("/carBooking", async (req, res) => {
  CarBooking.find((err, booking) => {
    if (err) {
      res.send(err);
    }
    res.send(booking);
  });
  // res.send("Bookings Route");
});

// @route    POST api/Driver/carBooking
// @access   Public
// @desc     create booking
router.post("/carBooking", async (req, res) => {
  const {
    customerId,
    userName,
    pickUp,
    dropOff,
    isPending,
    fare,
    nearByDriver,
  } = req.body;
  const io = req.app.io;
  console.log(customerId);
  try {
    if (!userName) {
      res.status(400);
      res.json({
        error: "Bad data",
      });
    } else {
      let booking = new CarBooking({
        customerId,
        userName,
        pickUp,
        dropOff,
        isPending,
        fare,
      });
      await booking.save();
      res.send(booking);
      let driver = await DriverLocation.findOne({
        customerId: nearByDriver.customerId,
      });
      if (driver.socketId) {
        console.log(driver.socketId);

        io.emit(driver.socketId + "driverRequest", booking);
        // io.emit("DRIVER_REQUEST", booking);
        // console.log(nearByDriver.socketId);
      } else {
        console.log("Driver not connected");
      }
    }
  } catch (error) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route    PUT api/Driver/carBooking/:idd
// @access   Public
// @desc     update booking done on driver side
router.put("/carBooking/:id", async (req, res) => {
  try {
    let io = req.app.io;
    const { isPending, driverId } = req.body;
    console.log(req.body);
    let status = JSON.parse(isPending);
    console.log(status);
    if (status) {
      res.status(400);
      res.json({
        error: "Bad data",
      });
    } else {
      const bookingFields = {};
      bookingFields.driverId = driverId;
      // console.log(status);
      bookingFields.isPending = status;
      console.log(bookingFields);
      let carBooking = await CarBooking.findById(req.params.id);
      // console.log(carBooking);

      if (!carBooking)
        return res.status(404).json({ msg: "Booking not found" });
      carBooking = await CarBooking.findByIdAndUpdate(
        req.params.id,
        { $set: bookingFields },
        { new: true },
        (err, updatedBooking) => {
          if (err) {
            res.send(err);
          }
          if (updatedBooking) {
            CarBooking.findById(req.params.id, (err, confirmedBooking) => {
              if (err) {
                res.send(err);
              }
              // console.log(confirmedBooking);

              res.send(confirmedBooking);
              console.log(confirmedBooking);
              // io.on("hello", () => {
              io.emit("action", {
                type: "BOOKING_CONFIRMED",
                payload: confirmedBooking,
              });
              // });
            });
          }
        }
      );
    }
  } catch (error) {
    console.log("catch: " + error);
  }
});

// @route    POST api/Driver/driverLocation
// @desc     booking
// @access   Public
router.post("/driverLocation", async (req, res) => {
  const { driverId, coordinate, socketId } = req.body;

  try {
    // let driver = await Driver.findOne({ _id: driverId });

    // if (driver) {
    //   return res
    //     .status(400)
    //     .json({ errors: [{ msg: "User location exists" }] });
    // }
    let driverLocation = new DriverLocation({
      driverId,
      coordinate,
      socketId,
    });
    await driverLocation.save();
    res.send(driverLocation);
  } catch (error) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route    get api/Driver/driverLocationSocket
// @desc     get single driver and emit track by user to driver
// @access   Public
router.get("/driverLocationSocket/:id", async (req, res) => {
  let io = req.app.io;
  await DriverLocation.findOne(
    {
      driverId: req.params.id,
    },
    (err, location) => {
      if (err) {
        res.send(err);
      }
      res.send(location);
      io.emit("trackDriver", location);
    }
  );
});

// @route    pUT api/Driver/driverLocationSocket
// @desc     update location by driver to user
// @access   Public
router.put("/driverLocationSocket/:id", async (req, res) => {
  let io = req.app.io;
  const location = req.body;
  const latitude = parseFloat(location.latitude);
  const longitude = parseFloat(location.longitude);
  // console.log(location);
  if (!location) {
    res.status(400);
    res.json({
      error: "Bad data",
    });
  } else {
    const LocationFields = {};
    if (location.socketId) LocationFields.socketId = location.socketId;
    if (latitude && longitude)
      LocationFields.coordinate = {
        type: "Point",
        coordinates: [longitude, latitude],
      };
    console.log(LocationFields);
    let driverLocation = await DriverLocation.findById(req.params.id);
    if (!driverLocation) console.log("driver not found");
    // return res.status(404).json({ msg: "Location not found" });
    driverLocation = await DriverLocation.findByIdAndUpdate(
      req.params.id,
      { $set: LocationFields },
      { new: true },
      (err, updateDetails) => {
        if (err) {
          console.log(err);
          res.send(err);
        }
        if (updateDetails) {
          DriverLocation.findById(req.params.id, (error, updatedLocation) => {
            if (error) {
              res.send(error);
            }
            res.send(updatedLocation);
            io.emit("action", {
              type: "UPDATE_DRIVER_LOCATION",
              payload: updatedLocation,
            });
          });
        }
      }
    );
  }
});

//get nearby Driver
router.get("/driverLocationSocket/", async (req, res) => {
  // console.log(req.query);
  try {
    const LocationFields = {};
    LocationFields.coordinate = {
      type: "Point",
      coordinates: [73.0596073, 33.6281604],
    };

    await DriverLocation.findByIdAndUpdate(
      "5eef4358a52e040940de48bf",
      { $set: LocationFields },
      { new: true }
    );
    await DriverLocation.ensureIndexes({ coordinate: "2dsphere" });
    await DriverLocation.find(
      {
        coordinate: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [
                parseFloat(req.query.lng),
                parseFloat(req.query.lat),
              ],
            },
            $maxDistance: parseFloat(5000),
          },
        },
      },
      (err, location) => {
        if (err) {
          res.send(err);
        } else {
          console.log(location);
          res.send(location);
        }
      }
    );
  } catch (error) {
    res.send("Server error");
  }
});

//delete cancelled booking
router.delete("/deleteBooking/:id", async (req, res) => {
  // console.log(req.query);
  try {
    const carBooking = await CarBooking.find({
      customerId: req.params.id,
    })
      .sort({ _id: -1 })
      .limit(1);
    if (!carBooking)
      return res.status(404).json({ msg: "Car Booking not found" });
    // res.json(carBooking);
    await CarBooking.findByIdAndRemove(carBooking._id);
    res.json({ msg: "carBooking removed" });
  } catch (error) {
    res.send("Server error");
  }
});
module.exports = router;
