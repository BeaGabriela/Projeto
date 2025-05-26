//Defindo uma variavel e atribuindo o express a ela
const express = require('express')
//Defininfo uma variavel que atraves do express, chama o ROuter
const router = express.Router()

//Criando uma variaval que herda as funções do arquivo todo
const clientes = require('../Controllers/Clientes.controller.js')

//Criando uma variavel que herda a funções do arquivo middleware
const Middle = require('../Middleware/Middleware');

//Definindo o corpo da URL, para puxr todos os clientes.
router.get("/clientes", clientes.lerTodos)
//Definindo o corpo da URL para logar
router.post('/logar', Middle.Autenticar, clientes.Logar)
//Definindo o corpo da URL para puxar clientes filtrados pelo id
// router.get("/clientes/:id_cliente", clientes.lerClientesId)
//Definindo o corpo da URL para criar um cliente novo
router.post("/clientes", clientes.criandoNovoCliente)

//Exportando o router para ser usado no url
module.exports = router;
