const clienteController = require('./src/controllers/clienteController');
const produtoController = require('./src/controllers/produtoController');
const express = require('express');
const cors = require('cors');
const app = express();

const corsOptions = {
    origin: '*', // Permitir todas as origens (ajuste conforme necessário para segurança)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

app.use(express.json());
require('dotenv').config();

const porta = process.env.PORT || 3000;
const rotaClientes = '/clientes';
const rotaProdutos = '/produtos';

// Rota Raiz
app.get("/", clienteController.teste);

// Rota de teste
app.post('/teste', (req, res) => {
  console.log('POST /teste recebido!', req.body);
  res.json({ ok: true, body: req.body });
});

// Rotas de Clientes
app.get(`${rotaClientes}`, clienteController.listarClientes);
app.get(`${rotaClientes}/:id`, clienteController.getClienteById);

// ✅ Cadastro unificado de cliente + endereço
app.post(`${rotaClientes}/cadastro`, clienteController.adicionarClienteComEndereco);

// Login
app.post(`${rotaClientes}/login`, clienteController.login);


// Rotas de Produtos
app.get(`${rotaProdutos}`, produtoController.listarProdutos);

// Escuta o servidor
app.listen(porta, () => {
    console.log('Servidor rodando em:');
    console.log(`http://localhost:${porta}`);
});
