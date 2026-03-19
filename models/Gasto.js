const mongoose = require("mongoose");

const gastoSchema = new mongoose.Schema({
  data: Date,
  tipo: String,
  valor: Number,
  motorista: { type: mongoose.Schema.Types.ObjectId, ref: "Motorista" },
});

module.exports = mongoose.model("Gasto", gastoSchema);