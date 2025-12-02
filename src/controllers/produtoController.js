const Product = require('../models/produtoModel');

// Listar todos os produtos
exports.listarProdutos = async (req, res) => {
    try {
        const produtos = await Product.getAllProducts();
        res.status(200).json(produtos);  // Retorna os produtos
    } catch (err) {
        console.error('Erro ao listar produtos:', err);
        res.status(500).json({ error: 'Erro ao listar produtos' });  // Retorna erro se falhar
    }
}

// Selecionar um produto por ID
exports.getProductById = async (req, res) => {
    const productId = req.params.id;
    try {
        const produto = await Product.getProductById(productId);
        if (!produto) {
            return res.status(404).json({ error: 'Produto não encontrado' });  // Retorna 404 se não encontrado
        }
        res.status(200).json(produto);  // Retorna o produto encontrado
    } catch (err) {
        console.error('Erro ao buscar produto por ID:', err);
        res.status(500).json({ error: 'Erro ao buscar produto' });  // Retorna erro se falhar
    }
}

// Adicionar um novo produto
exports.adicionarProduto = async (req, res) => {
    const novoProduto = req.body;
    try {
        const result = await Product.addProduct(novoProduto);
        res.status(201).json({ id: result.insertId, ...novoProduto });  // Retorna o novo produto com ID
    } catch (err) {
        console.error('Erro ao adicionar produto:', err);
        res.status(500).json({ error: 'Erro ao adicionar produto' });  // Retorna erro se falhar
    }
}
