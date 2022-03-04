const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const email = new Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  GraduationYear: { type: Number, required: true },
  Sec: { type: Number, required: true },
  BN: { type: Number, required: true },
});

module.exports = mongoose.model("Email", email);
