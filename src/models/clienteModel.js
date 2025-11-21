const db = require('../config/db');
const bcrypt = require('bcrypt');

const Client = {

    getAllClients: (callback) => {
        const sql = 'SELECT * FROM cliente';
        db.query(sql, (err, results) => {
            if (err) throw err;
            callback(results);
        });
    },

    getClienteById: (id, callback) => {
        const sql = 'SELECT * FROM cliente WHERE id = ?';
        db.query(sql, [id], (err, result) => {
            if (err) throw err;
            callback(result[0]);
        });
    },

    addClient: (client, callback) => {
        const sql = 'INSERT INTO cliente SET ?';

        // Gera hash da senha antes de salvar
        bcrypt.hash(client.senha, 10, (err, hash) => {
            if (err) throw err;

            client.senha = hash; // substitui a senha original pelo hash

            db.query(sql, client, (err, results) => {
                if (err) throw err;
                callback(results);
                console.log(client.senha)
            });
        });
    },

    login: (loginInput, senha, callback) => {
        const sql = 'SELECT * FROM cliente WHERE email = ? OR username = ?';
        db.query(sql, [loginInput, loginInput], (err, results) => {
            if (err) throw err;

            if (results.length === 0) {
                return callback(null); // usuário não encontrado
            }

            const user = results[0];

            // Compara a senha informada com o hash salvo
            bcrypt.compare(senha, user.senha, (err, isMatch) => {
                if (err) throw err;

                if (isMatch) {
                    callback(user); // senha correta
                } else {
                    callback(null); // senha incorreta
                }
            });
        });
    }
};

module.exports = Client;
