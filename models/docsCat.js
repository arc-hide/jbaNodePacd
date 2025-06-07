const mongoose = require("mongoose");

//@document category and total of all documents requested by the client

const docStorageSchema = mongoose.Schema({
  typeOfPriority: {
    type: String,
  },
  birthCert: {
    type: Number,
  },
  cenCert: {
    type: Number,
  },
  marCert: {
    type: Number,
  },
  deatCert: {
    type: Number,
  },
});

module.exports = mongoose.model("docStorage", docStorageSchema);
