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
      data:Buffer,
      contentType:String
    },
    description:{
        type: String,
        required: true,
    },
   
  });
  const Event = mongoose.model("Event", eventSchema);
  module.exports = Event
  