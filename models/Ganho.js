const mongoose = require("mongoose");

const ganhoSchema = new mongoose.Schema({
  data: Date,
  app: String,
  valor: Number,
  motorista: { type: mongoose.Schema.Types.ObjectId, ref: "Motorista" },
});

module.exports = mongoose.model("Ganho", ganhoSchema);