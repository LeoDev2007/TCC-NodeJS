const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'trolley.proxy.rlwy.net',
  user: 'root',
  password: 'yziSqqleyeiDoRqbfxCGpnpyFIrYYEbL',
  database: 'railway',
  port: 25429
});

connection.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conectado ao banco de dados!');
});

module.exports = connection;