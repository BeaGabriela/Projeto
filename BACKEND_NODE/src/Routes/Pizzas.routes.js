//Defindo uma variavel e atribuindo o express a ela
const express = require('express')
//Defininfo uma variavel que atraves do express, chama o ROuter
const router = express.Router()

//Criando uma variaval que herda as funções do arquivo todo
const pizzas = require('../Controllers/Pizzas.controller.js')

//Verificando o nivel do cargo para editar/criar/excluir
const verificaPermissao = require('../Middleware/Middleware_cargo.js');

//Criando uma variavel que herda a funções do arquivo middleware
const Middle = require('../Middleware/Middleware');


/** Criando a documentação da rota de listar as pizzas
 *@swagger
 * /pizzas:
 *   get:
 *     summary: Lista todas as pizzas cadastradas
 *     tags:
 *       - Pizzas
 *     responses:
 *       200:
 *         description: Lista de pizzas retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_pizza:
 *                     type: integer
 *                     example: 1
 *                   nome:
 *                     type: string
 *                     example: Calabresa
 *                   preco:
 *                     type: number
 *                     example: 29.99
 */

//Definindo o corpo da URL, para puxr todas as pizzas.
router.get("/pizzas", pizzas.MostrarPizzas)

//Definindo o corpo da URL para puxar pizzas filtradas pelo id
router.get("/pizzas/:id_pizza", pizzas.MonstrarPizzaFiltradaID)



/** Criando a documentação de criar uma pizza nova
 * @swagger
 * /pizzas:
 *   post:
 *     summary: Cadastra uma nova pizza
 *     tags:
 *       - Pizzas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Margherita
 *               preco:
 *                 type: number
 *                 example: 34.90
 *     responses:
 *       201:
 *         description: Pizza criada com sucesso
 *       400:
 *         description: Erro ao cadastrar a pizza
 */
router.post("/pizzas", pizzas.CriarPizza);

//Definindo o corpo da URL para criar uma pizza nova, de aordo com o funconario logado e com o cargo dele.
router.post("/pizzas", Middle.Autenticar, verificaPermissao(['Gerente', 'Lider']), pizzas.CriarPizza)


/** Criando a documentação de alteração de uma pizza
 * @swagger
 * /pizzas:
 *   put:
 *     summary: Altera os dados de uma pizza
 *     tags:
 *       - Pizzas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Margherita
 *               preco:
 *                 type: number
 *                 example: 34.90
 *     responses:
 *       200:
 *         description: Dados da pizza alterados com sucesso
 *       400:
 *         description: Erro ao alterar dados da pizza
 */

//Definindo o corpo da URL para alterar dados das pizzas de aordo com o funconario logado e com o cargo dele.
router.put("/pizzas/alterar", Middle.Autenticar, verificaPermissao(['Gerente', 'Lider']), pizzas.AlterarPizza)



/** Criando a documentação de deletar uma pizza
 * @swagger
 * /pizzas:
 *   delete:
 *     summary: Deleta uma pizza
 *     tags:
 *       - Pizzas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Margherita
 *               preco:
 *                 type: number
 *                 example: 34.90
 *     responses:
 *       200:
 *         description: Pizza deletada com sucesso
 *       400:
 *         description: Erro ao deletar pizza
 */

//Definindo o corpo da URL para deletar cadastro de aordo com o funconario logado e com o cargo dele.
router.delete("/pizzas/deletar", Middle.Autenticar, verificaPermissao(['Gerente', 'Lider']), pizzas.DeletarPizza)

//Exportando o router para ser usado no url
module.exports = router;
