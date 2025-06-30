//Defindo uma variavel e atribuindo o express a ela
const express = require('express')

//Defininfo uma variavel que atraves do express, chama o ROuter
const router = express.Router()

//Criando uma variaval que herda as funções do arquivo todo
const item = require('../Controllers/Item_Pedido.controller.js')

//Criando uma variavel que herda a funções do arquivo middleware
const Middle = require('../Middleware/Middleware');


/** Criando a documentação da rota de listar os itens do pedido
 *@swagger
 * /Itens_pedido:
 *   get:
 *     summary: Listar itens do pedido
 *     tags:
 *       - Itens do pedido
 *     responses:
 *       200:
 *         description: Itens do pedido retornado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   pedido_id:
 *                     type: integer
 *                     example: 1
 *                   id_pizza:
 *                     type: integer
 *                     example: 1
 *                   quantidade:
 *                     type: int
 *                     example: 2
 *                   modo_entrega:
 *                     type: enum('Entrega', "Retirada")
 *                     example: "Entrega"
 * 
 */

//Definindo o corpo da URL, para puxr todas os pedidos.
router.get("/item_Entrega", item.MostrarItensPedidosEntrega)

//Definindo o corpo da URL para puxar pedidos filtrados pelo id do cliente
router.get("/item_Retirada", item.MonstrarItensPedidosRetirada)


/** Criando a documentação da rota de cadastrar os itens do pedido
 *@swagger
 * /Itens_pedido:
 *   post:
 *     summary: Cadastra itens do pedido
 *     tags:
 *       - Itens do pedido
 *     responses:
 *       201:
 *         description: itens cadastrados com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   pedido_id:
 *                     type: integer
 *                     example: 1
 *                   id_pizza:
 *                     type: integer
 *                     example: 1
 *                   quantidade:
 *                     type: int
 *                     example: 2
 *                   modo_entrega:
 *                     type: enum('Entrega', "Retirada")
 *                     example: "Entrega"
 * 
 */
//Definindo o corpo da URL para criar um pedido novo
router.post("/item", item.CriarItemPedido)

//Exportando o router para ser usado no url
module.exports = router;
