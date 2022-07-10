const mongoose = require('mongoose')
const eventSchema = mongoose.Schema({
    title: {
      type: String,
      required: [true, "Please include the Event"],
    },
    startDate: {
      type: String,
      required: [true, "Please include the product price"],
    },
    endDate: {
        type: String,
        required: [true, "Please include the product price"],
      },
   image: {
      type: String,
      required: true,
    },
    description:{
        type: String,
        required: true,
    },
   
  });
  const Upevent = mongoose.model("Upevent", eventSchema);
  module.exports = Upevent
  