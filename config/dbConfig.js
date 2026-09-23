const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI environment variable is not defined");
    }

    const connect = await mongoose.connect(process.env.MONGO_URI);

    console.log(
      "Database connected successfully",
      connect.connection.host,
      connect.connection.name
    );
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDb;