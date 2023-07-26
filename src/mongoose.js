const mongoose = require("mongoose");
// TODO:: replace connection string and dbname with env.process variables
const uri = "" //TODO:put db string
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
  return connection;
};

module.exports = { connectDB, getConnection };
