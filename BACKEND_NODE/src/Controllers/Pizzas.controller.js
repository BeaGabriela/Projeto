//Importando o arquivo do models, atraves de uma variavel
const pizzas = require('../Models/Pizzas.model.js')

//Importando o arquivo do DAO, atraves de uma variavel
const conexao = require('../dao/pizzaria.dao.js')

//Criando função que retornara a leitura de todas as pizzas
const MostrarPizzas = (req, res) => {
    //Atribuindo a variavel string a função lerTodos
    let string = pizzas.MostrarPizzas()
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

//Criada função que retorna a leitura da pizza, filtando pelo id
const MonstrarPizzaFiltradaID = (req, res) => {
    //Atribuindo a variavel string a função lerTodos
    let string = pizzas.MonstrarPizzaFiltradaID(req.params)
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

//Criando uma variavel que cria uma nova pizza
const CriarPizza = async (req, res) => {
        //Criada a variavel que hospeda a função que ira ser usada
        let string = pizzas.CriarPizza(req.body)

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
}

// Criada uma função para alterar as pizzas
const AlterarPizza = async (req, res) => {
    //Atribuindo a variavel string a função alterar
    let string = pizzas.AlterarPizza(req.body)
    //executa uma consulta no banco de dados, que esta no return do 'lerTodos()', e em seguida passa dois paramentros, um de erro e outro de resultado
    conexao.query(string, (err, result) => {
        //Caso não haja erro, o programa teve uma consulta bem-sucedida e alterou os dados
        if (err == null) {
            //Com isso, o status 200 significa que foi bem sucedido.
            res.status(200).json(result, {result: "Dados alterados com sucesso"}).end()
        } else {
            //Caso contrario, aparecera o status 400 que indica que a requisição enviada esta incorreta ou malformada. 
            res.status(400).end()
        }
    })
}

//Função para deletar pizza
const DeletarPizza = (req, res) => {
    //Criando uma variavel para chamar o return no banco de dados
    let string = pizzas.DeletarPizza(req.body)
    //Criando conexão com o banco de dados
    conexao.query(string, (err, result) =>{
        //Se não houver erro, aparece o status 200 e a mensagem.
        if(err == null){
            res.status(200).json("Pizza deletada com sucesso").end()
        //Se houver erro, retorna o erro 400, que é erro de digitação/solicitação corrompiada e uma mensagem
        }else{
            res.status(400).json({erro: "Erro ao deletar pizza"})
        }
    })
}


module.exports = {
    MostrarPizzas,
    MonstrarPizzaFiltradaID,
    CriarPizza,
    AlterarPizza,
    DeletarPizza
}