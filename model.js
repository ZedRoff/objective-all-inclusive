const mongoose = require("mongoose");

const proc = new mongoose.Schema({
  foreign: String,
  liste_non_inclusif: Array,
  liste_inclusif: Array
})

module.exports = mongoose.model("Word", proc)