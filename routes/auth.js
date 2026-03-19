const express = require("express");
const router = express.Router();
const Motorista = require("../models/Motorista");
const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET || "supersecretkey"; // Melhor colocar em .env

// Middleware auth
const auth = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ erro: "Token não fornecido" });
  try {
    const decoded = jwt.verify(token, SECRET);
    req.motoristaId = decoded.id;
    next();
  } catch {
    res.status(401).json({ erro: "Token inválido" });
  }
};

// Registro
router.post("/register", async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    if (!nome || !email || !senha) return res.status(400).json({ erro: "Todos os campos são obrigatórios" });
    if (await Motorista.findOne({ email })) return res.status(400).json({ erro: "Email já cadastrado" });

    const motorista = new Motorista({ nome, email, senha });
    await motorista.save();
    res.json({ message: "Motorista cadastrado com sucesso!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro interno" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, senha } = req.body;
    if (!email || !senha) return res.status(400).json({ erro: "Email e senha obrigatórios" });

    const motorista = await Motorista.findOne({ email });
    if (!motorista) return res.status(400).json({ erro: "Motorista não encontrado" });

    const senhaValida = await motorista.compararSenha(senha);
    if (!senhaValida) return res.status(400).json({ erro: "Senha incorreta" });

    const token = jwt.sign({ id: motorista._id }, SECRET, { expiresIn: "1d" });
    res.json({ token, nome: motorista.nome });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro interno" });
  }
});

module.exports = router;
module.exports.auth = auth;