//Defindo uma variavel e atribuindo o express a ela
const express = require('express')

//Defininfo uma variavel que atraves do express, chama o ROuter
const router = express.Router()

//Criando uma variaval que herda as funções do arquivo todo
const pedidos = require('../Controllers/Pedidos.controller.js')

//Criando uma variavel que herda a funções do arquivo middleware
const Middle = require('../Middleware/Middleware');


/** Criando a documentação da rota de listar os pedidos
 *@swagger
 * /pedidos:
 *   get:
 *     summary: Lista todos os pedidos
 *     tags:
 *       - Pedidos
 *     responses:
 *       200:
 *         description: Lista de pedidos retornado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   pedido_id:
 *                     type: integer
 *                     example: 3
 *                   valor:
 *                     type: decimal
 *                     example: 50.00
 *                   data_pedido:
 *                     type: datetime
 *                     example: 2025-06-12 14:27:20
 *                   cliente_id:
 *                     type: int
 *                     example: 3
 * 
 */
//Definindo o corpo da URL, para puxr todas os pedidos.
router.get("/pedidos", pedidos.MostrarPedidos)

//Definindo o corpo da URL para puxar pedidos filtrados pelo id do cliente
router.get("/pedidos/", pedidos.MonstrarPedidoFiltradaIDCliente)


/** Criando a documentação da rota de criar os pedidos
 *@swagger
 * /pedidos:
 *   post:
 *     summary: Criar pedido
 *     tags:
 *       - Pedidos
 *     responses:
 *       201:
 *         description: Pedido criado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   pedido_id:
 *                     type: integer
 *                     example: 3
 *                   valor:
 *                     type: decimal
 *                     example: 50.00
 *                   data_pedido:
 *                     type: datetime
 *                     example: 2025-06-12 14:27:20
 *                   cliente_id:
 *                     type: int
 *                     example: 3
 * 
 */
//Definindo o corpo da URL para criar um pedido novo
router.post("/pedido", Middle.Autenticar, pedidos.CriarPedido)


router.post("/pedidoLocal", pedidos.CriarPedidoLocal)


/** Criando a documentação da rota de alterar os pedidos
 *@swagger
 * /pedidos:
 *   put:
 *     summary: Altera o status do pedido
 *     tags:
 *       - Pedidos
 *     responses:
 *       200:
 *         description: Pedido alterado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   pedido_id:
 *                     type: integer
 *                     example: 3
 *                   valor:
 *                     type: decimal
 *                     example: 50.00
 *                   data_pedido:
 *                     type: datetime
 *                     example: 2025-06-12 14:27:20
 *                   cliente_id:
 *                     type: int
 *                     example: 3
 * 
 */
//Definindo o corpo da URL para alterar o status dos pedidos
router.put("/pedido/alterar/status", pedidos.AlterarStatusPedidos)

//Definindo o corpo da URL para alterar data do pdido
router.put("/pedido/alterar/data_conclusao", Middle.Autenticar, pedidos.AlterarDataConclusaoPedido)


/** Criando a documentação da rota de deletar os pedidos
 *@swagger
 * /pedidos:
 *   delete:
 *     summary: Deleta/Conclui o pedido
 *     tags:
 *       - Pedidos
 *     responses:
 *       200:
 *         description: Pedido deletado/concluido com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   pedido_id:
 *                     type: integer
 *                     example: 3
 *                   valor:
 *                     type: decimal
 *                     example: 50.00
 *                   data_pedido:
 *                     type: datetime
 *                     example: 2025-06-12 14:27:20
 *                   cliente_id:
 *                     type: int
 *                     example: 3
 * 
 */
//Definindo o corpo da URL para cancelar pedido
router.delete("/pedido/deletar", Middle.Autenticar, pedidos.CancelarPedido)

//Exportando o router para ser usado no url
module.exports = router;
