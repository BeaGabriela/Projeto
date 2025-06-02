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

//Definindo o corpo da URL, para puxr todas as pizzas.
router.get("/pizzas", pizzas.MostrarPizzas)

//Definindo o corpo da URL para puxar pizzas filtradas pelo id
router.get("/pizzas/:id_pizza", pizzas.MonstrarPizzaFiltradaID)

//Definindo o corpo da URL para criar uma pizza nova, de aordo com o funconario logado e com o cargo dele.
router.post("/pizzas", Middle.Autenticar, verificaPermissao(['Gerente', 'Lider']), pizzas.CriarPizza)

//Definindo o corpo da URL para alterar dados das pizzas de aordo com o funconario logado e com o cargo dele.
router.put("/pizzas/alterar", Middle.Autenticar, verificaPermissao(['Gerente', 'Lider']), pizzas.AlterarPizza)

//Definindo o corpo da URL para deletar cadastro de aordo com o funconario logado e com o cargo dele.
router.delete("/pizzas/deletar", Middle.Autenticar, verificaPermissao(['Gerente', 'Lider']), pizzas.DeletarPizza)

//Exportando o router para ser usado no url
module.exports = router;
