const mysql = require('mysql2');

// Criando o pool de conexões
const pool = mysql.createPool({
  host: 'trolley.proxy.rlwy.net',
  user: 'root',
  password: 'yziSqqleyeiDoRqbfxCGpnpyFIrYYEbL',
  database: 'railway',
  port: 25429,
  ssl: {
    rejectUnauthorized: false,  // Permite conexões SSL
  }
});

// Exporta o pool para ser usado em outros arquivos
module.exports = pool.promise();  // Usando pool com promessas (async/await)
