//Defindo uma variavel e atribuindo o express a ela
const express = require('express')
//Defininfo uma variavel que atraves do express, chama o ROuter
const router = express.Router()

//Criando uma variaval que herda as funções do arquivo todo
const funcionarios = require('../Controllers/Funcionarios.controller.js')

//Criando uma variavel que herda a funções do arquivo middleware
const Middle = require('../Middleware/Middleware_cargo.js');

const ValidarToken = require('../Middleware/Middleware');

//Definindo o corpo da URL, para puxr todos os funcionarois.
router.get("/funcionarios", funcionarios.MostrarFuncionarios)

//Definindo o corpo da URL para puxar funcionarios filtrados pelo id
router.get("/funcionarios/:id_funcionario", funcionarios.MonstrarFuncionarioID)

//Definindo o corpo da URL para que o funcionario possa logar
router.post('/funcionario/logar', funcionarios.Logar)

//Definindo o corpo da URL para criar um funcioario novo
router.post("/funcionario", funcionarios.CriarFuncionario)

//Definindo o corpo da URL para alterar dados pessoais
router.put("/funcionario/alterar", funcionarios.AlterarDadosFuncionario)

//Definindo o corpo da URL para deletar cadastro
router.delete("/funcionario/deletar" ,funcionarios.DeletarFuncionario)

//Exportando o router para ser usado no url
module.exports = router;
