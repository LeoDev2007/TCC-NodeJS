📦 API de Gerenciamento de Clientes e Produtos — TCC (Resumo)

Backend desenvolvido com Node.js e Express.js para gerenciar clientes, endereços e produtos. Inclui autenticação segura com bcrypt, estrutura REST e persistência de dados usando MySQL.

Ideal para e-commerces, sistemas de cadastro ou qualquer aplicação que precise lidar com usuários e produtos de forma segura.

✨ Funcionalidades
👤 Clientes

Listar todos

Buscar por ID

Cadastro completo (dados pessoais + endereço)

Login com senha criptografada (bcrypt)

📦 Produtos

Listar todos

Buscar por ID

⚙️ Gerais

API totalmente REST

Banco MySQL

CORS habilitado

Configurações via .env

📚 Tecnologias

Node.js, Express.js

MySQL (mysql2)

bcrypt

dotenv, nodemon, CORS, body-parser

🚀 Instalação
Pré-requisitos

Node.js

MySQL

Passos

Clonar o repositório

git clone https://github.com/LeoDev2007/TCC-NodeJS.git
cd TCC-NodeJS


Instalar dependências

npm install


Criar o banco e tabelas

CREATE DATABASE railway;


Tabela cliente

CREATE TABLE cliente (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255),
  username VARCHAR(255) UNIQUE,
  email VARCHAR(255) UNIQUE,
  senha VARCHAR(255),
  idade INT,
  telefone VARCHAR(20),
  cep VARCHAR(10),
  numero VARCHAR(10),
  logradouro VARCHAR(255),
  bairro VARCHAR(255),
  cidade VARCHAR(255),
  uf VARCHAR(2)
);


Tabela produtonovo

CREATE TABLE produtonovo (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255),
  descricao TEXT,
  preco DECIMAL(10,2),
  estoque INT DEFAULT 0
);


Configurar o banco em src/config/db.js
Ajuste host, usuário, senha e porta conforme seu MySQL.

Criar arquivo .env

PORT=3000


Iniciar o servidor

npm start


Servidor disponível em:
http://localhost:3000

▶️ Endpoints
👤 Clientes (/clientes)

GET /clientes — lista todos

GET /clientes/:id — busca por ID

POST /clientes — cadastro completo (inclui endereço)

POST /clientes/login — login seguro com bcrypt

📦 Produtos (/produtos)

GET /produtos — lista produtos

🌐 Teste

GET / — verifica se o servidor está ativo
