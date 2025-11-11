const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

// Pasta para armazenar uploads temporários
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// Configuração do multer para upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

// Rota de teste
app.get("/", (req, res) => {
  res.send("Servidor de nuvem está online 🚀");
});

// Rota para receber arquivos
app.post("/upload", upload.single("file"), (req, res) => {
  console.log("Arquivo recebido:", req.file.originalname);
  res.send("Arquivo enviado com sucesso!");
});

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
