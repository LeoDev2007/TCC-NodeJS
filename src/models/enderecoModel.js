const db = require('../config/db');

const Endereco = {
    getAllEndes: (callback) => {
        const sql = 'SELECT * FROM endereco';

        db.query(sql, (err, results) => {
            if (err) throw err;
            callback(results);
        });
    },
    getEndeById: (id, callback) => {
        const sql = `SELECT * FROM endereco WHERE id = ?`;
        db.query(sql, [id], (err, result) => {
            if (err) throw err;
            callback(result[0]);
        })
    },
    addEnde: (callback, ende) => {
        const sql = 'INSERT INTO endereco SET ?';
        db.query(sql, ende, (err, results) => {
            if (err) throw err;
            callback(results);
        })
    }
};

module.exports = Endereco;