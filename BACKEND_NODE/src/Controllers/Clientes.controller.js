//Importando o arquivo do models, atraves de uma variavel
const clientes = require('../models/Clientes.model.js')

//Importando o arquivo do DAO, atraves de uma variavel
const conexao = require('../dao/pizzaria.dao.js')

const lerTodos = (req, res) => {
    //Atribuindo a variavel string a função lerTodos
    let string = clientes.lerTodos()
    //executa uma consulta no banco de dados, que esta no return do 'lerTodos()', e em seguida passa dois paramentros, um de erro e outro de resultado
    conexao.query(string, (err, result) => {
        //Caso não haja erro, o programa teve uma consulta bem-sucedida.
        if (err == null) {
            //Com isso, o status 200 significa que foi bem sucedido, e em seguida todos os clientes aparecem em um json.
            res.status(200).json(result).end()
        } else {
            //Caso contrario, aparecera o status 400 que indica que a requisição enviada esta incorreta ou malformada. 
            res.status(400).end()
        }
    })
}
//Criando uma função que compara o email e a senha fornecida pelo usuario e a do banco de dados.
const Logar = (req, res) => {
    //Atribuindo a variavel string a função logar.
    let string = clientes.Logar(req.body)
    //Executa a funçaõ no banco de dados
    conexao.query(string,(err, result) => {
        //Se não houve erros, ela dá o status 201 de criado com sucesso e o json
        if(err == null){
            res.status(201).json(result).end()
            //Se nao, ela devolve o status 400, que é erro de digitação ou algo semelhante. 
        }else{
            res.status(400).end()
        }
    })

}

//Criando uma função que busca o cliente filtrando pelo id
const lerClientesId = (req, res) => {
    //Variavel criada para requisitar o numero do id, atraves do corpo do json. Assim o cliente será filtrado.
    let string = clientes.LerClientePeloId(req.params)
    //Executa uma consulta no banco de dados usando o retorno da função no model.
    conexao.query(string, (err, result) => {
        //verifica se não houve erro na requisição, e caso o erro for igual a null, ou seja, mão houver erro, então ele continua dentro do loop
        if (err == null) {
            //O status 200 que significa 'ok' aparece na tela em junção com o json e o resultado
            res.status(200).json(result).end()
        } else {
            //Caso haja erro, o status 400 que signifa que houve um erro de digitação ou algo semelhante.
            res.status(400).end()
        }
    })
}
//Criando uma variavel que cria um novo cliente
const criandoNovoCliente = (req, res) => {
    //Criada a variavel que hospeda a função que ira ser usada
    let string = clientes.criarCliente(req.body)
    //Criado a conexão com o banco de dados
    conexao.query(string, (err, result) => {
        //Criado uma condicional para verificar se houve algum erro, caso não haja, a condicional cexibira o resultado
        if (err == null) {
            //Status 201 significa que a requisição fo bem sucedida e um novo cliente foi criado no banco de dados.
            res.status(201).json(result).end()
        } else {
            res.status(400).end()
        }
    })

}

//Exportando as funções para que sejam usadas em outro arquivo;
module.exports ={
    lerTodos,
    Logar,
    lerClientesId,
    criandoNovoCliente
}
