require('dotenv').config();
const express = require('express');
const fs = require('fs');
const https = require('https');
const recipesRoutes = require('./routes/recipes');

const app = express();
app.use(express.json());
app.use(express.static('public')); // Serve os arquivos estáticos da pasta 'public'

// Define a rota para receitas
app.use('/api/recipes', recipesRoutes);

const PORT = process.env.PORT || 3000;

// Configuração SSL
const sslServer = https.createServer(
  {
    key: fs.readFileSync('./ssl/selfsigned.key'),
    cert: fs.readFileSync('./ssl/selfsigned.crt'),
  },
  app
);

sslServer.listen(PORT, () => {
  console.log(`Servidor rodando em https://localhost:${PORT}`);
});
