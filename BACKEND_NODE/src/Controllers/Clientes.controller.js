//Importando o arquivo do models, atraves de uma variavel
const clientes = require('../models/Clientes.model.js')

//Importando o arquivo do DAO, atraves de uma variavel
const conexao = require('../dao/pizzaria.dao.js')

//Importando a varicel do bcrypt para codificar a senha
const bcrypt = require('bcrypt')

//Importando a variacel do crypto para decodifiar a senha.
const crypto = require('crypto-js')

//Criando a variavel que define quantas vezes a senha vai ser randorizda.
const saltRounds = 10

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



//Criando uma variavel que cria um novo cliente
const criandoNovoCliente = async (req, res) => {
    //Tratramento de erro, 'tente'
    try{
    //Atribui a senha vque foi digitada e armazena na variavel senha
    const senha = req.body.senha
    //Gera um hash seguro da senha
    const hash = await bcrypt.hash(senha, saltRounds)
    //Atualiza a senha ao cadastrar ja usando o hash
    req.body.senha = hash
    //Criada a variavel que hospeda a função que ira ser usada
    let string = clientes.criarCliente(req.body)

    //Criado a conexão com o banco de dados
    conexao.query(string, (err, result) => {
        //Criado uma condicional para verificar se houve algum erro, caso não haja, a condicional exibira o resultado
        if (err == null) {
            //Status 201 significa que a requisição fo bem sucedida e um novo cliente foi criado no banco de dados.
            res.status(201).json(result).end()
        } else {
            console.error("Erro no banco", err)
            res.status(400).json(result).end()
        }
    })
    //Tratamento de erro
    } catch (error){
        //Caso de erro no hash ou qualquer outro erro no try.
        console.error("Erro ao gerar hash: ", error )
        //Status 500 significa erro interno
        res.status(500).json({erro: 'Erro interno ao processar a senha.'})
    }
}

//Exportando as funções para que sejam usadas em outro arquivo;
module.exports ={
     lerTodos,
    Logar,
    criandoNovoCliente
}
