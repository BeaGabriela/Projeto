//Defindo uma variavel e atribuindo o express a ela
const express = require('express')
//Defininfo uma variavel que atraves do express, chama o ROuter
const router = express.Router()

//Criando uma variaval que herda as funções do arquivo todo
const funcionarios = require('../Controllers/Funcionarios.controller.js')

//Criando uma variavel que herda a funções do arquivo middleware
const verificaPermissao = require('../Middleware/Middleware_cargo.js');

const Middle = require('../Middleware/Middleware');

//Definindo o corpo da URL, para puxr todos os funcionarois.
router.get("/funcionarios", funcionarios.MostrarFuncionarios)

//Definindo o corpo da URL para puxar funcionarios filtrados pelo id
router.get("/funcionarios/:id_funcionario", funcionarios.MonstrarFuncionarioID)

//Definindo o corpo da URL para que o funcionario possa logar
router.post('/funcionario/logar',funcionarios.Logar)

//Definindo o corpo da URL para criar um funcioario novo, de acordo com o funcionario logado
router.post("/funcionario", Middle.Autenticar, verificaPermissao(['Gerente', 'Lider']), funcionarios.CriarFuncionario)

//Definindo o corpo da URL para alterar dados pessoais,de acordo com o funcionario logado
router.put("/funcionario/alterar", Middle.Autenticar, verificaPermissao(['Gerente', 'Lider']), funcionarios.AlterarDadosFuncionario)

//Definindo o corpo da URL para deletar cadastro, de acordo com o funcionario logado
router.delete("/funcionario/deletar",  Middle.Autenticar, verificaPermissao(['Gerente', 'Lider']),funcionarios.DeletarFuncionario)

//Exportando o router para ser usado no url
module.exports = router;
