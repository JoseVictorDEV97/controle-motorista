const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const motoristaSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true }
});

// Criptografa senha antes de salvar
motoristaSchema.pre("save", async function() {
  if (this.isModified("senha")) {
    this.senha = await bcrypt.hash(this.senha, 10);
  }
});

// Método para comparar senha
motoristaSchema.methods.compararSenha = async function(senha) {
  return await bcrypt.compare(senha, this.senha);
};

module.exports = mongoose.model("Motorista", motoristaSchema);