const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  content: {
    type: String,
    required: [true, "Content can't be blank"],
  },
  date: {
    type: String,
    required: [true, "Content can't be blank"],
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

articleSchema.set("toJSON",{
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model("Article", articleSchema);
