//Defindo uma variavel e atribuindo o express a ela
const express = require('express')

//Defininfo uma variavel que atraves do express, chama o ROuter
const router = express.Router()

//Criando uma variaval que herda as funções do arquivo todo
const imagem = require('../Controllers/Imagens.controller.js')

//Criando uma variavel que herda a funções do arquivo middleware
const verificaPermissao = require('../Middleware/Middleware_cargo.js');

//Criando uma variavel que herda a funções do arquivo middleware
const Middle = require('../Middleware/Middleware');

//Definindo o corpo da URL, para puxr todas as imgs.
router.get("/imagem", imagem.MostraImagem)

//Definindo o corpo da URL para puxar pedidos filtrados pelo id do cliente
router.get("/Imagem/filtro", imagem.MostraImagemFiltradas)

//Definindo o corpo da URL para criar um pedido novo
router.post("/imagem", Middle.Autenticar, verificaPermissao(['Gerente', 'Lider']), imagem.CriarImagem)

//Exportando o router para ser usado no url
module.exports = router;
