const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true, "username is required"],
    },
    email: {
      type: String,
      required: [true, "please provide valid email"],
    },
    password: {
      type: String,
      required: [true, "email is reqired"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
