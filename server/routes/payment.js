const express = require("express");
const router = express.Router();
const path = require("path");
const Stripe = require("stripe");
const fs = require("fs");
const Guide = require("../models/UserManagment/Guide");
const HotelRep = require("../models/UserManagment/HotelRep");
const stripe = new Stripe("sk_test_hqcxEpMNto862mGujgGpONho004USKiy2K");
const auth = require("../middleware/auth");
const TravelAgent = require("../models/UserManagment/TravelAgent");
const Payment = require("../models/Payment/Payment");

router.get("/", async (req, res) => {
  res.json({ msg: "Payment is Running" });
});

router.post("/checkcustomer", async (req, res) => {
  try {
    console.log("CHECK CUSTOMER REQ BODY=");
    console.log(req.body);
    let { CustomerEmail } = req.body;
    stripe.customers.list(function (err, customers) {
      // asynchronously called
      console.log("THE ERROR=");
      console.log(err);
      let data = customers.data;
      let found = false;
      let FoundCustomer = null;
      data.map((customer) => {
        if (customer.email === CustomerEmail) {
          found = true;
          FoundCustomer = customer;
        }
      });
      if (found) {
        console.log("FOUND CUSTOMER=");
        console.log(FoundCustomer);
        return res.json(FoundCustomer);
      } else {
        return res.json({ NOTFOUND: "NOTFOUND" });
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
});

router.post("/charge", async (req, res) => {
  const { TokenID, CustomerID, Amount } = req.body;
  console.log(req.body);
  let PaymentAmount = Math.floor(Amount * 100);
  try {
    const payment = await stripe.paymentIntents.create({
      amount: PaymentAmount,
      currency: "USD",
      description: "We did it boss",
      payment_method_data: {
        type: "card",
        card: {
          token: TokenID,
        },
      },
      receipt_email: "jenny.rosen@example.com",
      customer: CustomerID,
      confirm: true,
    });

    console.log(payment);

    return res.status(200).json({
      confirm: payment,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: error.message,
    });
  }
});

router.post("/createCustomer", async (req, res) => {
  const { name, email, description } = req.body;
  console.log(req.body);
  try {
    let customer = await stripe.customers.create({
      name,
      email,
      description,
    });
    // console.log({ customer });
    console.log("Customer ID=");
    // console.clear();
    console.log(customer.id);
    res.json(customer.id);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
});

router.post("/transfer", async (req, res) => {
  try {
    console.log("TRANSFER=");
    const { AccountID, amount } = req.body;
    const transfer = await stripe.transfers.create({
      amount,
      currency: "USD",
      destination: AccountID,
    });
    res.send(transfer);
  } catch (error) {
    res.send(error);
  }
});
router.post("/createBankAccount", async (req, res) => {
  const { account_holder_name } = req.body;
  stripe.tokens.create(
    {
      bank_account: {
        country: "US",
        currency: "USD",
        account_holder_name,
        account_holder_type: "individual",
        routing_number: "110000000",
        account_number: "000123456789",
      },
    },
    function (err, token) {
      // asynchronously called
      console.log("Error=");
      console.log(err);
      console.log("Token=");
      console.log(token);
      res.send(token);
    }
  );
});
router.post("/createAccount", async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    BankAccountID,
    Representative,
  } = req.body;
  const Day = "25";
  const Month = "5";
  const Year = "1996";

  const fp = fs.readFileSync(
    path.resolve(__dirname, `../client/src/images/SellerIDCard/IDCardFront.jpg`)
  );
  const upload = await stripe.files.create({
    file: {
      data: fp,
      name: "file.jpg",
      type: "application.octet-stream",
    },
    purpose: "identity_document",
  });

  const fp1 = fs.readFileSync(
    path.resolve(__dirname, `../client/src/images/SellerIDCard/IDCardBack.jpg`)
  );
  const upload1 = await stripe.files.create({
    file: {
      data: fp1,
      name: "file1.jpg",
      type: "application.octet-stream",
    },
    purpose: "identity_document",
  });
  stripe.accounts.create(
    {
      type: "custom",
      country: "US",
      email: email,
      requested_capabilities: ["card_payments", "transfers"],
      business_type: "individual",
      individual: {
        dob: { day: Day, month: Month, year: Year },
        first_name,
        last_name,
        id_number: "006-20-8311",
        phone: "605-628-6049",
        address: {
          city: "Half Way",
          line1: "2467  Twin House Lane",
          postal_code: "65663",
          state: "MO",
        },
        email,
        ssn_last_4: "8311",
        verification: {
          document: {
            front: upload.id,
            back: upload1.id,
          },
        },
      },
      business_profile: {
        mcc: "4722",
        url: "http://www.baoisne.com",
      },
      tos_acceptance: {
        date: Math.floor(Date.now() / 1000),
        ip: req.connection.remoteAddress, // Assumes you're not using a proxy
      },
    },
    async function (err, account) {
      // asynchronously called
      console.log(err);
      console.log(account);
      const AccountID = account.id;
      stripe.accounts
        .createExternalAccount(
          AccountID,
          {
            external_account: BankAccountID,
          },
          function (err, bankAccount) {
            // asynchronously called
            console.log("Error=");
            console.log(err);
            console.log("Bank Account=");
            console.log(bankAccount);
          }
        )
        .catch((err) => {
          console.log(err);
        });

      res.json({ account: account });
    }
  );
});

router.post("/updateAccount", async (req, res) => {
  const {
    AccountID,
    Day,
    Month,
    Year,
    first_name,
    last_name,
    phone,
    email,
    BankAccountID,
  } = req.body;
  console.log("BankID");
  console.log(BankAccountID);
  console.log("Account ID=");
  console.log(AccountID);
  const fp = fs.readFileSync(
    path.resolve(__dirname, `../client/src/images/SellerIDCard/IDCardFront.jpg`)
  );
  const upload = await stripe.files.create({
    file: {
      data: fp,
      name: "file.jpg",
      type: "application.octet-stream",
    },
    purpose: "identity_document",
  });

  const fp1 = fs.readFileSync(
    path.resolve(__dirname, `../client/src/images/SellerIDCard/IDCardBack.jpg`)
  );
  const upload1 = await stripe.files.create({
    file: {
      data: fp1,
      name: "file1.jpg",
      type: "application.octet-stream",
    },
    purpose: "identity_document",
  });

  stripe.accounts.update(
    AccountID,
    {
      business_type: "individual",
      individual: {
        dob: { day: Day, month: Month, year: Year },
        first_name: first_name,
        last_name: last_name,
        id_number: "006-20-8311",
        phone: "605-628-6049",
        address: {
          city: "Half Way",
          line1: "2467  Twin House Lane",
          postal_code: "65663",
          state: "MO",
        },
        email,
        ssn_last_4: "8311",
        verification: {
          document: {
            front: upload.id,
            back: upload1.id,
          },
        },
      },
      business_profile: {
        mcc: "4722",
        url: "http://www.baoisne.com",
      },
      tos_acceptance: {
        date: Math.floor(Date.now() / 1000),
        ip: req.connection.remoteAddress, // Assumes you're not using a proxy
      },
    },
    function (err, account) {
      console.log(err);
      console.log(account);
    }
  );

  stripe.accounts.createExternalAccount(
    AccountID,
    {
      external_account: BankAccountID,
    },
    function (err, bankAccount) {
      // asynchronously called
      console.log("Error=");
      console.log(err);
      console.log("Bank Account=");
      console.log(bankAccount);
    }
  );
});
router.post("/checkEmail", async (req, res) => {
  const { Representative, email } = req.body;
  console.log(Representative + " " + email);
  let UserExists = false;
  if (Representative === "Hotel") {
    let Email = await HotelRep.findOne({ email });
    if (Email) UserExists = true;
  } else if (Representative === "Agent") {
    let Email = await TravelAgent.findOne({ email });
    if (Email) UserExists = true;
  } else {
    let Email = await Guide.findOne({ email });
    if (Email) UserExists = true;
  }
  return res.json({ msg: UserExists });
});

router.post("/savePayment", auth, async (req, res) => {
  const { Comission, TrasactionID, amount, Email, typeOfSP } = req.body;
  let user = req.user.id;
  console.log(req.body);
  let SPEmail = Email;
  try {
    let PaymentObj = {
      customerId: user,
      SPEmail,
      typeOfSP,
      amount: amount,
      transactionId: TrasactionID,
      commission: Comission,
    };
    console.log("PaymentObj=");
    console.log(PaymentObj);
    const newPayment = new Payment(PaymentObj);
    const resp = await newPayment.save();
    res.json({ resp });
    console.log(resp);
  } catch (error) {
    res.status(500).json({ msg: "Interval Server Error" });
    console.log(error);
  }
});

module.exports = router;
