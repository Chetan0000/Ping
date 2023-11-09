const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const coon = await mongoose.connect(process.env.MONGO_URI, {});

    console.log(`connected to MOngoDb : ${coon.connection.host}`);
  } catch (error) {
    console.log(`Error in connecting to Data Base: ${error.message}`);
    process.exit();
  }
};

module.exports = connectDb;
