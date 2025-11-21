const db = require('../config/db');

const Product = {

    getAllProducts: (callback) => {
        const sql = 'SELECT * FROM produtoNovo';

        db.query(sql, (err, results) => {
            if (err) throw err;
            callback(results);

        });
    },

    getProductById: (id, callback) => {
        const sql = `SELECT * FROM produtoNovo WHERE id = ?`;
        db.query(sql, [id], (err, result) => {
            if (err) throw err;
            callback(result[0]);
        })
    },
    
    addProduct: (callback, produto) => {
        const sql = 'INSERT INTO produtoNovo SET ?';

        db.query(sql, produto, (err, results) => {
            if (err) throw err;
            callback(results);
        })
    }
};

module.exports = Product;