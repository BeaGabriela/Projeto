//Defindo uma variavel e atribuindo o express a ela
const express = require('express')

//Defininfo uma variavel que atraves do express, chama o ROuter
const router = express.Router()

//Criando uma variaval que herda as funções do arquivo todo
const status = require('../Controllers/Historico_status.controller.js')

//Criando uma variavel que herda a funções do arquivo middleware
const Middle = require('../Middleware/Middleware');


/** Criando a documentação da rota de listar os historico de status
 *@swagger
 * /status:
 *   get:
 *     summary: Lista todos os status
 *     tags:
 *       - Histórico de Status
 *     responses:
 *       200:
 *         description: Lista de status retornado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   status_anterior:
 *                     type: varchar
 *                     example: 'Em preparo'
 *                   status_novo:
 *                     type: varchar
 *                     example: 'Concluido'
 *                   data_alteracao:
 *                     type: datetime
 *                     example: 2025-05-02 12:02:00
 *                   pedido_id:
 *                     type: int
 *                     example: 1
 * 
 */

//Definindo o corpo da URL, para puxr todas os pedidos.
router.get("/historico", status.MostrarHistorico)

/** Criando a documentação da rota de listar os historico de status
 *@swagger
 * /status:
 *   post:
 *     summary: Cadastra status
 *     tags:
 *       - Histórico de Status
 *     responses:
 *       201:
 *         description: Status cadastrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   status_anterior:
 *                     type: varchar
 *                     example: 'Em preparo'
 *                   status_novo:
 *                     type: varchar
 *                     example: 'Concluido'
 *                   data_alteracao:
 *                     type: datetime
 *                     example: 2025-05-02 12:02:00
 *                   pedido_id:
 *                     type: int
 *                     example: 1
 * 
 */
//Definindo o corpo da URL para criar um pedido novo
router.post("/historico", status.criarStatus)

//Exportando o router para ser usado no url
module.exports = router;
