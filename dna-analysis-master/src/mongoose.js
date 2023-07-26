const mongoose = require("mongoose");
// TODO:: replace connection string and dbname with env.process variables
const uri =
  "mongodb+srv://app:mIMb5UIIBdArNOKI@ashleynmusick.dlovtkx.mongodb.net/?retryWrites=true&w=majority";
const options = {
  dbname: "dna_analysis_cloud",
  bufferCommands: false, // Disable mongoose buffering
};

let connection;
const connectDB = async () => {
  connection = await mongoose.connect(uri, options).then((conn) => {
    console.log("MongoDB connected...");
    return conn;
  });
  return connection;
};

const getConnection = () => {
  return connection || mongoose; // TODO:: mock getConnection function properly in unit tests, || added as patch
};

module.exports = { connectDB, getConnection };
