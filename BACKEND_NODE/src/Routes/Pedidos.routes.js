//Defindo uma variavel e atribuindo o express a ela
const express = require('express')

//Defininfo uma variavel que atraves do express, chama o ROuter
const router = express.Router()

//Criando uma variaval que herda as funções do arquivo todo
const pedidos = require('../Controllers/Pedidos.controller.js')

//Criando uma variavel que herda a funções do arquivo middleware
const Middle = require('../Middleware/Middleware');

//Definindo o corpo da URL, para puxr todas os pedidos.
router.get("/pedidos", pedidos.MostrarPedidos)

//Definindo o corpo da URL para puxar pedidos filtrados pelo id do cliente
router.get("/pedidos", pedidos.MonstrarPedidoFiltradaIDCliente)

//Definindo o corpo da URL para criar um pedido novo
router.post("/pedido", Middle.Autenticar, pedidos.CriarPedido)

//Definindo o corpo da URL para alterar dados dos pedidos
router.put("/pedido/alterar", Middle.Autenticar, pedidos.AlterarPedidos)

//Definindo o corpo da URL para cancelar pedido
router.delete("/pedido/deletar", Middle.Autenticar, pedidos.CancelarPedido)

//Exportando o router para ser usado no url
module.exports = router;
