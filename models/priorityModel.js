const mongoose = require("mongoose");

const prioritySchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "firstname is required"],
    },
    middleName: {
      type: String,
    },
    lastName: {
      type: String,
      required: [true, "lastname is required"],
    },
    idNumber: {
      type: String,
      required: [true, "id Number is required"],
    },
    typeOfPriority: {
      type: String,
      required: [true, "type is required"],
    },
    birth: {
      type: Number,
      required: [true, "birth is required"],
    },
    cenomar: {
      type: Number,
      required: [true, "birth is required"],
    },
    marriage: {
      type: Number,
      required: [true, "marriage is required"],
    },
    death: {
      type: Number,
      required: [true, "death is required"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Priorities", prioritySchema);
