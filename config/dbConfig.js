const mongoose = require("mongoose");
const connectDb = async () => {
  try {
    const connect = await mongoose.connect(
      "mongodb+srv://jewenellearchide:4NuUA2DRrGQlV3O9@cluster0.uexohwf.mongodb.net/YU-DEC19?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log(
      "Database connected successfuly",
      connect.connection.host,
      connect.connection.name
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
module.exports = connectDb;
