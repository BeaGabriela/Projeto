//definindo uma variavel que ira chamar o mysql instalado
const mysql = require('mysql')

//Criando uma função de conexao entre o usuario, o localhost e o banco de dados
const conexao = mysql.createConnection({
    user:'root',
    host:'localhost',
    database: 'pizzaria'
})


//Exportando a função criada acima
module.exports = conexao;