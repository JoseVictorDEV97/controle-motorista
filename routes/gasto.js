const express = require("express");
const router = express.Router();
const Gasto = require("../models/Gasto");
const { auth } = require("./auth");

// Criar gasto
router.post("/", auth, async (req, res) => {
  try {
    const gasto = new Gasto({ ...req.body, motorista: req.motoristaId });
    await gasto.save();
    res.json(gasto);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// Listar gastos
router.get("/", auth, async (req, res) => {
  try {
    const gastos = await Gasto.find({ motorista: req.motoristaId });
    res.json(gastos);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// Deletar gasto
router.delete("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await Gasto.findOneAndDelete({ _id: id, motorista: req.motoristaId });
    if (!resultado) return res.status(404).json({ erro: "Gasto não encontrado" });
    res.json({ message: "Gasto deletado com sucesso!" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

module.exports = router;