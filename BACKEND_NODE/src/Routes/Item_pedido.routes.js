//Defindo uma variavel e atribuindo o express a ela
const express = require('express')

//Defininfo uma variavel que atraves do express, chama o ROuter
const router = express.Router()

//Criando uma variaval que herda as funções do arquivo todo
const item = require('../Controllers/Item_Pedido.controller.js')

//Criando uma variavel que herda a funções do arquivo middleware
const Middle = require('../Middleware/Middleware');

//Definindo o corpo da URL, para puxr todas os pedidos.
router.get("/item_Entrega", item.MostrarItensPedidosEntrega)

//Definindo o corpo da URL para puxar pedidos filtrados pelo id do cliente
router.get("/item_Retirada", item.MonstrarItensPedidosRetirada)

//Definindo o corpo da URL para criar um pedido novo
router.post("/item", item.CriarItemPedido)

//Exportando o router para ser usado no url
module.exports = router;
