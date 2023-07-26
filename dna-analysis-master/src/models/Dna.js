// External Dependancies
const mongoose = require("mongoose");
const { getConnection } = require("../mongoose");
const conn = getConnection();
const ObjectId = mongoose.Schema.Types.ObjectId;

const dnaSchema = new mongoose.Schema({
  dna_id: ObjectId,
  has_mutation: Boolean,
  dna_matrix: [[String]],
});

module.exports = conn.model("Dna", dnaSchema);
