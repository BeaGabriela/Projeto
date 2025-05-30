//Defindo uma variavel e atribuindo o express a ela
const express = require('express')
//Defininfo uma variavel que atraves do express, chama o ROuter
const router = express.Router()

//Criando uma variaval que herda as funções do arquivo todo
const pizzas = require('../Controllers/Pizzas.controller.js')

//Verificando o nivel do cargo para editar/criar/excluir
const verificaPermissao = require('../Middleware/Middleware_cargo.js');

//Definindo o corpo da URL, para puxr todas as pizzas.
router.get("/pizzas", pizzas.MostrarPizzas)

//Definindo o corpo da URL para puxar pizzas filtradas pelo id
router.get("/pizzas/:id_pizza", pizzas.MonstrarPizzaFiltradaID)

//Definindo o corpo da URL para criar uma pizza nova
router.post("/pizzas", verificaPermissao, pizzas.CriarPizza)

//Definindo o corpo da URL para alterar dados das pizzas
router.put("/pizzas/alterar", verificaPermissao, pizzas.AlterarPizza)

//Definindo o corpo da URL para deletar cadastro
router.delete("/pizzas/deletar", verificaPermissao, pizzas.DeletarPizza)

//Exportando o router para ser usado no url
module.exports = router;
