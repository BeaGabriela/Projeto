//Defindo uma variavel e atribuindo o express a ela
const express = require('express')
//Defininfo uma variavel que atraves do express, chama o ROuter
const router = express.Router()

//Criando uma variaval que herda as funções do arquivo todo
const funcionarios = require('../Controllers/Funcionarios.controller.js')

//Criando uma variavel que herda a funções do arquivo middleware
const verificaPermissao = require('../Middleware/Middleware_cargo.js');

const Middle = require('../Middleware/Middleware');


/** Criando docuemntação
 * @swagger
 * /funcionarios:
 *   get:
 *     summary: Lista os funcionarios
 *     tags:
 *       - Funcionarios
 *     responses:
 *       200:
 *         description: Lista de funcionarios retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   nome:
 *                     type: string
 *                     example: João Silva
 *                   cpf:
 *                     type: string
 *                     example: "11111111-55"
 *                   senha:
 *                     type: string
 *                     example: "123"
 *                   cargo:
 *                     type: string
 *                     example: "Operadora"
 */


//Definindo o corpo da URL, para puxr todos os funcionarois.
router.get("/funcionarios", funcionarios.MostrarFuncionarios)

//Definindo o corpo da URL para puxar funcionarios filtrados pelo id
router.get("/funcionarios/:id_funcionario", funcionarios.MonstrarFuncionarioID)

//Definindo o corpo da URL para que o funcionario possa logar
router.post('/funcionario/logar',funcionarios.Logar)


/** Criando docuemntação
 * @swagger
 * /funcionarios:
 *   post:
 *     summary: Cria novos funcionarios
 *     tags:
 *       - Funcionarios
 *     responses:
 *       201:
 *         description: Funcionario criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   nome:
 *                     type: string
 *                     example: João Silva
 *                   cpf:
 *                     type: string
 *                     example: "11111111-55"
 *                   senha:
 *                     type: string
 *                     example: "123"
 *                   cargo:
 *                     type: string
 *                     example: "Operadora"
 */
//Definindo o corpo da URL para criar um funcioario novo, de acordo com o funcionario logado
router.post("/funcionario", Middle.Autenticar, verificaPermissao(['Gerente', 'Lider']), funcionarios.CriarFuncionario)


/** Criando docuemntação
 * @swagger
 * /funcionarios:
 *   put:
 *     summary: Altera dados do funcionario
 *     tags:
 *       - Funcionarios
 *     responses:
 *       200:
 *         description: Dados so funcionario alterado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   nome:
 *                     type: string
 *                     example: João Silva
 *                   cpf:
 *                     type: string
 *                     example: "11111111-55"
 *                   senha:
 *                     type: string
 *                     example: "123"
 *                   cargo:
 *                     type: string
 *                     example: "Operadora"
 */

//Definindo o corpo da URL para alterar dados pessoais,de acordo com o funcionario logado
router.put("/funcionario/alterar", Middle.Autenticar, verificaPermissao(['Gerente', 'Lider']), funcionarios.AlterarDadosFuncionario)


/** Criando docuemntação
 * @swagger
 * /funcionarios:
 *   delete:
 *     summary: Deleta um funcionario
 *     tags:
 *       - Funcionarios
 *     responses:
 *       200:
 *         description: Funcionario deleatdo com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   nome:
 *                     type: string
 *                     example: João Silva
 *                   cpf:
 *                     type: string
 *                     example: "11111111-55"
 *                   senha:
 *                     type: string
 *                     example: "123"
 *                   cargo:
 *                     type: string
 *                     example: "Operadora"
 */
//Definindo o corpo da URL para deletar cadastro, de acordo com o funcionario logado
router.delete("/funcionario/deletar",  Middle.Autenticar, verificaPermissao(['Gerente', 'Lider']),funcionarios.DeletarFuncionario)

//Exportando o router para ser usado no url
module.exports = router;
