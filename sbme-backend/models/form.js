const mongoose = require("mongoose");

const schema = mongoose.Schema;

const form = new schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  questions: [{ type: String }],
});

module.exports = mongoose.model("Form", form);
