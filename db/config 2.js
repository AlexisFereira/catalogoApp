const mongoose = require("mongoose");

const conection = async () => {
  try {
    await mongoose.connect(process.env.DB_CONECTION, (result) => {
      console.log("Datbase connected.");
    });
  } catch (e) {
    console.log(`Error conecting database: ${e}`);
  }
};

module.exports = conection;
