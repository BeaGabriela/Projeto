//Defindo uma variavel e atribuindo o express a ela
const express = require('express')

//Defininfo uma variavel que atraves do express, chama o ROuter
const router = express.Router()

//Criando uma variaval que herda as funções do arquivo todo
const status = require('../Controllers/Historico_status.controller.js')

//Criando uma variavel que herda a funções do arquivo middleware
const Middle = require('../Middleware/Middleware');

//Definindo o corpo da URL, para puxr todas os pedidos.
router.get("/historico", status.MostrarHistorico)

//Definindo o corpo da URL para criar um pedido novo
router.post("/historico", status.criarStatus)

//Exportando o router para ser usado no url
module.exports = router;
