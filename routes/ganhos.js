const express = require("express");
const router = express.Router();
const Ganho = require("../models/Ganho");
const { auth } = require("./auth");

// Criar ganho
router.post("/", auth, async (req, res) => {
  try {
    const ganho = new Ganho({ ...req.body, motorista: req.motoristaId });
    await ganho.save();
    res.json(ganho);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// Listar ganhos
router.get("/", auth, async (req, res) => {
  try {
    const ganhos = await Ganho.find({ motorista: req.motoristaId });
    res.json(ganhos);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// Deletar ganho
router.delete("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await Ganho.findOneAndDelete({ _id: id, motorista: req.motoristaId });
    if (!resultado) return res.status(404).json({ erro: "Ganho não encontrado" });
    res.json({ message: "Ganho deletado com sucesso!" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

module.exports = router;