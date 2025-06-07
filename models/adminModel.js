const mongoose = require("mongoose");

//@admin schema

const adminSchema = mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true, "fullname is required"],
    },
    email: {
      type: String,
      required: [true, "please provide valid email"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AdminUser", adminSchema);
