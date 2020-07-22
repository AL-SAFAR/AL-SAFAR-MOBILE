const express = require("express");
const connectDB = require("./config/db");
const path = require("path");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const socket_io = require("socket.io");
const io = socket_io();
const chat = require("./routes/chat");
//Connect Database
connectDB();

//Init Middleware
app.use(express.json({ extended: false }));

// enable files upload
app.use(
  fileUpload({
    createParentPath: true,
  })
);

app.get("/", (req, res) => res.json({ msg: "ALSAFAR Travel " }));

//add other middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

//Define Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/hotelRep", require("./routes/hotelRep"));
app.use("/api/guide", require("./routes/guide"));
app.use("/api/travelAgent", require("./routes/travelAgent"));
app.use("/api/driver", require("./routes/driver"));
app.use("/api/admin", require("./routes/admin"));
app.use("/api/supportAssistant", require("./routes/supportAssistant"));
app.use("/api/payment", require("./routes/payment"));
app.use("/api/recom", require("./routes/recom"));

//Serve static assets in production
// if (process.env.NODE_ENV === "production") {
//   //Set static folder
//   app.use(express.static("client/build"));
//   app.get("*", (req, res) =>
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
//   );
// }

const PORT = process.env.PORT || 5000;

//Views
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "ejs");
// app.engine("html", require("ejs").renderFile);
io.listen(
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
);

app.io = io.on("connection", (socket) => {
  console.log("Socket connected:" + socket.id);
  // io.emit("ping", { data: new Date() / 1 });
  socket.on("action", async (action) => {
    if (action.type === "server/chat") {
      const { reciever, sender } = action.data;
      const response = await chat.findOrCreateConversation(sender, reciever);
      // console.log(response);
      // socket.emit("action", { type: "GOT_MESSAGES", payload: response });
      io.emit("action", { type: "GOT_MESSAGES", payload: response });
    } else if (action.type === "server/message") {
      console.log("msg");
      const { reciever, sender, text, type } = action.data;
      const response = await chat.addMessage(text, sender, reciever, type);
      // console.log(response);
      // socket.emit("action", { type: "GOT_NEW_MESSAGE", payload: response });
      io.emit("action", { type: "GOT_NEW_MESSAGE", payload: response });
    }
  });
});
