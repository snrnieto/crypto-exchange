const mongoose = require("mongoose");

const userScheme = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  wallets: [{ type: Schema.Types.ObjectId, ref: "Wallet" }],
});

module.exports = mongoose.model("User", userScheme);
