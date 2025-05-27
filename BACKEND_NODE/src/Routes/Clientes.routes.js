//Defindo uma variavel e atribuindo o express a ela
const express = require('express')
//Defininfo uma variavel que atraves do express, chama o ROuter
const router = express.Router()

//Criando uma variaval que herda as funções do arquivo todo
const clientes = require('../Controllers/Clientes.controller.js')

//Criando uma variavel que herda a funções do arquivo middleware
const Middle = require('../Middleware/Middleware');

//Definindo o corpo da URL, para puxr todos os clientes.
router.get("/clientes", clientes.LerClientes)

//Definindo o corpo da URL para puxar clientes filtrados pelo id
router.get("/clientes/:id_cliente", clientes.LerClientesFiltradoId)

//Definindo o corpo da URL para que o usuario possa logar
router.post('/logar', clientes.Logar)

//Definindo o corpo da url para que o usuario possa ler suas informações
router.get("/usuario/informacoes", Middle.Autenticar, clientes.LerInformacoesPessoais)

//Definindo o corpo da URL para criar um cliente novo
router.post("/clientes", clientes.CriarCliente)

//Definindo o corpo da URL para alterar dados pessoais
router.put("/usuario/alterar", Middle.Autenticar,  clientes.AlterarDadosPessoais)

//Definindo o corpo da URL para deletar cadastro
router.delete("/usuario/deletar", Middle.Autenticar,  clientes.DeletarCadastro)

//Exportando o router para ser usado no url
module.exports = router;
