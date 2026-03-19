const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

// Conexão MongoDB Atlas
const mongoURI = process.env.MONGO_URI || "sua_string_mongodb_aqui";
mongoose.connect(mongoURI)
  .then(() => console.log("MongoDB conectado!"))
  .catch((err) => console.error("Erro ao conectar:", err));

// Rotas
const authRouter = require("./routes/auth");
const ganhosRouter = require("./routes/ganhos");
const gastoRouter = require("./routes/gasto");

app.use("/auth", authRouter);
app.use("/ganhos", ganhosRouter);
app.use("/gasto", gastoRouter);

// Rota principal
app.get("/", (req, res) => res.sendFile(__dirname + "/public/index.html"));

// Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));