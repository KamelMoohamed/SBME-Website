const mongoose = require("mongoose");

const schema = mongoose.Schema;

const form = new schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  email: { type: String, required: true },
  questions: [{ type: String }],
  user: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
});

module.exports = mongoose.model("Form", form);
