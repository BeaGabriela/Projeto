// Carrega as variáveis de ambiente do .env
require('dotenv').config();

// Importa o mysql
const mysql = require('mysql');

// Cria um pool de conexões
const pool = mysql.createPool({
    connectionLimit: process.env.DB_CONNECTION_LIMIT || 10,  // Limite de conexões simultâneas
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Faz um teste de conexão ao iniciar o projeto (opcional, mas recomendado)
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Erro ao conectar no banco de dados:', err);
    } else {
        console.log('Conexão com o banco de dados estabelecida com sucesso.');
        connection.release();  // Libera a conexão
    }
});

// Exporta o pool para ser usado nas queries
module.exports = pool;
