const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "customer",
    },
    text: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  }
  // { discriminatorKey: "kind" }
);
module.exports = mongoose.model("message", MessageSchema);
// const Message = mongoose.model("message", MessageSchema);
// module.exports = {
//   Guide: Message.discriminator(
//     "Guide",
//     new mongoose.Schema({
//       guideId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "guide",
//       },
//     })
//   ),
//   Driver: Message.discriminator(
//     "Driver",
//     new mongoose.Schema({
//       guideId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "guide",
//       },
//     })
//   ),
// };
// const GuideObject = Messages.discriminator(
//   "Guide",
//   new Schema({
//     guideId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "guide",
//     },
//   })
// );
// const DriverObject = Messages.discriminator(
//   "Driver",
//   new Schema({
//     driverId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "driver",
//     },
//   })
// );
