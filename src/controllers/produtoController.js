const Product = require('../models/produtoModel');

// listar todos os produtos
exports.listarProdutos = (req, res) => {
    Product.getAllProducts((product) => {
        res.status(200).json(product);
    });
}

// selecionar um produto
exports.getProductById = (req, res) => {
    const productId = req.params.id;
    Product.getProductById(productId, (produto) =>{
        res.status(201).json(produto)
    })
}

// adicionar um produto
exports.adicionarProduto = (req, res) => {
    const novoProduto = req.body;
    Product.addProduct((result) => {
        res.status(201).json({ id: result.insertId, ...novoProduto });
    }, novoProduto);
}
