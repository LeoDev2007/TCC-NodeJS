const pool = require('../config/db');  // Importa o pool de conexões

// Listar todos os produtos
exports.getAllProducts = async () => {
  const sql = 'SELECT * FROM produtoNovo';  // Consulta para pegar todos os produtos
  try {
    const [results] = await pool.query(sql);  // Espera a consulta ser resolvida
    return results;  // Retorna os produtos
  } catch (err) {
    console.error('Erro ao buscar produtos:', err);
    throw err;  // Lança o erro para ser tratado no controlador
  }
};

// Selecionar um produto por ID
exports.getProductById = async (id) => {
  const sql = 'SELECT * FROM produtoNovo WHERE id = ?';  // Consulta para buscar produto por ID
  try {
    const [result] = await pool.query(sql, [id]);  // Espera a consulta ser resolvida
    return result[0];  // Retorna o primeiro produto (se existir)
  } catch (err) {
    console.error('Erro ao buscar produto por ID:', err);
    throw err;  // Lança o erro para ser tratado no controlador
  }
};

// Adicionar um novo produto
exports.addProduct = async (produto) => {
  const sql = 'INSERT INTO produtoNovo SET ?';  // Consulta para adicionar um novo produto
  try {
    const [result] = await pool.query(sql, produto);  // Espera a consulta ser resolvida
    return result;  // Retorna o resultado da inserção
  } catch (err) {
    console.error('Erro ao adicionar produto:', err);
    throw err;  // Lança o erro para ser tratado no controlador
  }
};
