//Requeirindo o dotenv e configurando ele
require('dotenv').config()
//Criando uma variavel chamada PORT e atribuindo a ela o.env e o respectivo arquivo ou, caso haja problema com o docuemnto, a porta escolhida sera a 5000
const PORT = process.env.PORT || 5000
//Criando uma variavel para hospedar o express
const express = require("express")
//Criando uma bariavel para armazenar o mecanismo de segurança conhecido como cors.
const cors = require('cors')

//Criando uma variavel que armazenara todo o meu arquivo clientes.routes, e com ele eu posso acessar as funções
const clientes = require('./src/Routes/Clientes.routes.js')

//Criando uma variavel que armazenara todo o meu arquivo pizzas.routes, e com ele eu posso acessar as funções
const pizzas = require('./src/Routes/Pizzas.routes.js')

//Criando uma variavel que armazenara todo o meu arquivo funcionarios.routes, e com ele eu posso acessar as funções
const funcionarios = require('./src/Routes/Funcionarios.routes.js')

//Criando a chamada de todos os mecanismos e dependencias a serem usada, inclusive a variavel setada para acessar o clientes.routes
const app = express()
    .use(express.json())
    .use(cors())
    .use(clientes)
    .use(pizzas)
    .use(funcionarios)


//Chamando o app e atribuindo a ele a porta a ser executada,e  tambem um console log, que mostrara no console em qual porta o serviço está sendo executado.
app.listen(PORT, () => {
    console.log("Serviço em execução na porta " + PORT )
})


