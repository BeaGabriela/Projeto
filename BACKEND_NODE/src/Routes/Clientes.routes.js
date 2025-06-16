//Defindo uma variavel e atribuindo o express a ela
const express = require('express')
//Defininfo uma variavel que atraves do express, chama o ROuter
const router = express.Router()

//Criando uma variaval que herda as funções do arquivo todo
const clientes = require('../Controllers/Clientes.controller.js')

//Criando uma variavel que herda a funções do arquivo middleware
const Middle = require('../Middleware/Middleware');


/** Criando docuemntação
 * @swagger
 * /clientes:
 *   get:
 *     summary: Lista os clientes com informações de contato e endereço
 *     tags:
 *       - Clientes
 *     responses:
 *       200:
 *         description: Lista de clientes retornada com sucesso
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
 *                   telefone:
 *                     type: string
 *                     example: "(61) 99999-1234"
 *                   logradouro:
 *                     type: string
 *                     example: "Rua das Flores"
 *                   numero:
 *                     type: integer
 *                     example: 123
 *                   complemento:
 *                     type: string
 *                     example: "Apto 101"
 *                   bairro:
 *                     type: string
 *                     example: "Centro"
 *                   cidade:
 *                     type: string
 *                     example: "Brasília"
 *                   estado:
 *                     type: string
 *                     example: "DF"
 *                   cep:
 *                     type: string
 *                     example: "70000-000"
 *                   referencia:
 *                     type: string
 *                     example: "Próximo à padaria"
 */

//Definindo o corpo da URL, para puxr todos os clientes.
router.get("/clientes", clientes.LerClientes)

//Definindo o corpo da URL para puxar clientes filtrados pelo id
router.get("/clientes/:id_cliente", clientes.LerClientesFiltradoId)


//Definindo o corpo da URL para que o usuario possa logar
router.post('/logar', clientes.Logar)

//Definindo o corpo da url para que o usuario possa ler suas informações
router.get("/usuario/informacoes", Middle.Autenticar, clientes.LerInformacoesPessoais)


/**
 * @swagger
 * /clientes:
 *   post:
 *     summary: Cria novos clientes
 *     tags:
 *       - Clientes
 *     responses:
 *       201:
 *         description: Novo cliente criado com sucesso
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
 *                   telefone:
 *                     type: string
 *                     example: "(61) 99999-1234"
 *                   logradouro:
 *                     type: string
 *                     example: "Rua das Flores"
 *                   numero:
 *                     type: integer
 *                     example: 123
 *                   complemento:
 *                     type: string
 *                     example: "Apto 101"
 *                   bairro:
 *                     type: string
 *                     example: "Centro"
 *                   cidade:
 *                     type: string
 *                     example: "Brasília"
 *                   estado:
 *                     type: string
 *                     example: "DF"
 *                   cep:
 *                     type: string
 *                     example: "70000-000"
 *                   referencia:
 *                     type: string
 *                     example: "Próximo à padaria"
 */
//Definindo o corpo da URL para criar um cliente novo
router.post("/clientes", clientes.CriarCliente)


/**
 * @swagger
 * /clientes:
 *   put:
 *     summary: Altera dados dos clientes
 *     tags:
 *       - Clientes
 *     responses:
 *       200:
 *         description: Dados alterados com sucesso
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
 *                   telefone:
 *                     type: string
 *                     example: "(61) 99999-1234"
 *                   logradouro:
 *                     type: string
 *                     example: "Rua das Flores"
 *                   numero:
 *                     type: integer
 *                     example: 123
 *                   complemento:
 *                     type: string
 *                     example: "Apto 101"
 *                   bairro:
 *                     type: string
 *                     example: "Centro"
 *                   cidade:
 *                     type: string
 *                     example: "Brasília"
 *                   estado:
 *                     type: string
 *                     example: "DF"
 *                   cep:
 *                     type: string
 *                     example: "70000-000"
 *                   referencia:
 *                     type: string
 *                     example: "Próximo à padaria"
 */
//Definindo o corpo da URL para alterar dados pessoais
router.put("/usuario/alterar", Middle.Autenticar,  clientes.AlterarDadosPessoais)


/**
 * @swagger
 * /clientes:
 *   delete:
 *     summary: Deleta cliente 
 *     tags:
 *       - Clientes
 *     responses:
 *       200:
 *         description: Cliente deletado com sucesso
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
 *                   telefone:
 *                     type: string
 *                     example: "(61) 99999-1234"
 *                   logradouro:
 *                     type: string
 *                     example: "Rua das Flores"
 *                   numero:
 *                     type: integer
 *                     example: 123
 *                   complemento:
 *                     type: string
 *                     example: "Apto 101"
 *                   bairro:
 *                     type: string
 *                     example: "Centro"
 *                   cidade:
 *                     type: string
 *                     example: "Brasília"
 *                   estado:
 *                     type: string
 *                     example: "DF"
 *                   cep:
 *                     type: string
 *                     example: "70000-000"
 *                   referencia:
 *                     type: string
 *                     example: "Próximo à padaria"
 */
//Definindo o corpo da URL para deletar cadastro
router.delete("/usuario/deletar", Middle.Autenticar,  clientes.DeletarCadastro)

//Exportando o router para ser usado no url
module.exports = router;
