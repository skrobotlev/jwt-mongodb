const { Schema, model } = require("mongoose");

const ContactSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  number: { type: String, required: true },
});

module.exports = model("Contact", ContactSchema);
