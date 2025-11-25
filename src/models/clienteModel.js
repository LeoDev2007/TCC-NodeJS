const pool = require('../config/db');
const bcrypt = require('bcrypt');

const Client = {

    // Listar todos os clientes
    getAllClients: async () => {
        const sql = 'SELECT * FROM cliente';
        try {
            const [results] = await pool.query(sql);  // Espera a consulta de clientes
            return results;  // Retorna os clientes
        } catch (err) {
            console.error('Erro ao listar clientes:', err);
            throw err;  // Lança o erro para ser tratado no controlador
        }
    },

    // Buscar um cliente pelo ID
    getClienteById: async (id) => {
        const sql = 'SELECT * FROM cliente WHERE id = ?';
        try {
            const [result] = await pool.query(sql, [id]);  // Espera a consulta por ID
            return result[0];  // Retorna o cliente encontrado
        } catch (err) {
            console.error('Erro ao buscar cliente por ID:', err);
            throw err;
        }
    },

    // Adicionar um novo cliente com senha criptografada
    addClient: async (client) => {
        const sql = 'INSERT INTO cliente SET ?';
        try {
            // Gera o hash da senha
            const hash = await bcrypt.hash(client.senha, 10);
            client.senha = hash;  // Substitui a senha original pelo hash

            const [result] = await pool.query(sql, client);  // Insere o cliente no banco
            return result;  // Retorna o resultado da inserção
        } catch (err) {
            console.error('Erro ao adicionar cliente:', err);
            throw err;
        }
    },

    // Login de cliente
    login: async (loginInput, senha) => {
        const sql = 'SELECT * FROM cliente WHERE email = ? OR username = ?';
        try {
            const [results] = await pool.query(sql, [loginInput, loginInput]);  // Busca o cliente
            if (results.length === 0) {
                return null;  // Usuário não encontrado
            }

            const user = results[0];
            const isMatch = await bcrypt.compare(senha, user.senha);  // Compara a senha informada com o hash
            return isMatch ? user : null;  // Se a senha for correta, retorna o usuário, caso contrário, retorna null
        } catch (err) {
            console.error('Erro ao fazer login:', err);
            throw err;  // Lança o erro para ser tratado no controlador
        }
    }
};

module.exports = Client;
