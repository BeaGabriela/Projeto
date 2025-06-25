//Importando o arquivo do models, atraves de uma variavel
const item = require('../Models/Historico_status.model.js')

//Importando o arquivo do DAO, atraves de uma variavel
const conexao = require('../Dao/pizzaria.dao.js')

//Criando função que retornara a leitura de todos os sattus
const MostrarHistorico = (req, res) => {
    //Atribuindo a variavel string a função lerTodos
    let string = item.MostrarhisoricoStatus(req.body)
    //executa uma consulta no banco de dados, que esta no return do 'lerTodos()', e em seguida passa dois paramentros, um de erro e outro de resultado
    conexao.query(string, (err, result) => {
        //Caso não haja erro, o programa teve uma consulta bem-sucedida.
        if (err == null) {
            //Com isso, o status 200 significa que foi bem sucedido
            res.status(200).json(result).end()
        } else {
            //Caso contrario, aparecera o status 400 que indica que a requisição enviada esta incorreta ou malformada. 
            res.status(400).end()
        }
    })
}

//Criando uma variavel que cria um novo status
const criarStatus = async (req, res) => {
    //Criada a variavel que hospeda a função que ira ser usada
    let string = item.criarStatus(req.body)

    //Criado a conexão com o banco de dados
    conexao.query(string, (err, result) => {
        //Criado uma condicional para verificar se houve algum erro, caso não haja, a condicional exibira o resultado
        if (err == null) {
            //Cria e altera o backup
            //Status 201 significa que a requisição fo bem sucedida e um novo cliente foi criado no banco de dados.
            res.status(201).json(result).end()
        } else {
            console.error("Erro no banco", err)
            res.status(400).json(result).end()
        }
    })
}



//Exposta as funções
module.exports = {
    MostrarHistorico,
    criarStatus
}