//Importando o arquivo do models, atraves de uma variavel
const pedidos = require('../Models/Pedidos.model.js')

//Importando o arquivo do DAO, atraves de uma variavel
const conexao = require('../Dao/pizzaria.dao.js')

//Cria uma variavel que armazena a função do backup
const { exportarPedidos } = require("../Utils/backup.js");

//Criando função que retornara a leitura de todas os pedidos
const MostrarPedidos = (req, res) => {
    //Atribuindo a variavel string a função lerTodos
    let string = pedidos.MostrarPedidos()
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

//Criada função que retorna a leitura do pedido, filtando pelo id do cliente
const MonstrarPedidoFiltradaIDCliente = (req, res) => {
    //Atribuindo a variavel string a função lerTodos
    let string = pedidos.MonstrarPedidoFiltradaIDCliente(req.body)
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

//Criando uma variavel que cria um novo pedido
const CriarPedido = async (req, res) => {
    //Criada a variavel que hospeda a função que ira ser usada
    let string = pedidos.CriarPedido(req.body)

    //Criado a conexão com o banco de dados
    conexao.query(string, (err, result) => {
        //Criado uma condicional para verificar se houve algum erro, caso não haja, a condicional exibira o resultado
        if (err == null) {
            //Cria e altera o backup
            exportarPedidos()
            //Status 201 significa que a requisição fo bem sucedida e um novo cliente foi criado no banco de dados.
            res.status(201).json(result).end()
        } else {
            console.error("Erro no banco", err)
            res.status(400).json(result).end()
        }
    })
}

//Criando uma variavel que cria um novo pedido local
const CriarPedidoLocal = async (req, res) => {
    //Criada a variavel que hospeda a função que ira ser usada
    let string = pedidos.CriarPedidoLocal(req.body)

    //Criado a conexão com o banco de dados
    conexao.query(string, (err, result) => {
        //Criado uma condicional para verificar se houve algum erro, caso não haja, a condicional exibira o resultado
        if (err == null) {
            //Cria e altera o backup
            exportarPedidos()
            //Status 201 significa que a requisição fo bem sucedida e um novo cliente foi criado no banco de dados.
            res.status(201).json(result).end()
        } else {
            console.error("Erro no banco", err)
            res.status(400).json(result).end()
        }
    })
}

// Criada uma função para alterar o status do pedido
const AlterarStatusPedidos = async (req, res) => {
    //Atribuindo a variavel string a função alterar
    let string = pedidos.AlterarStatusPedido(req.body)
    //executa uma consulta no banco de dados, que esta no return do 'lerTodos()', e em seguida passa dois paramentros, um de erro e outro de resultado
    conexao.query(string, (err, result) => {
        //Caso não haja erro, o programa teve uma consulta bem-sucedida e alterou os dados
        if (err == null) {
            //Cria e altera o backup
            exportarPedidos()
            //Com isso, o status 200 significa que foi bem sucedido.
            res.status(200).json(result, { result: "Dados alterados com sucesso" }).end()
        } else {
            //Caso contrario, aparecera o status 400 que indica que a requisição enviada esta incorreta ou malformada. 
            res.status(400).end()
        }
    })
}

const AlterarDataConclusaoPedido = async (req, res) => {
    //Atribuindo a variavel string a função alterar
    let string = pedidos.AlterarDataConclusaoPedido(req.body)
    //executa uma consulta no banco de dados, que esta no return do 'lerTodos()', e em seguida passa dois paramentros, um de erro e outro de resultado
    conexao.query(string, (err, result) => {
        //Caso não haja erro, o programa teve uma consulta bem-sucedida e alterou os dados
        if (err == null) {
            //Cria e altera o backup
            exportarPedidos()
            //Com isso, o status 200 significa que foi bem sucedido.
            res.status(200).json(result, { result: "Dados alterados com sucesso" }).end()
        } else {
            //Caso contrario, aparecera o status 400 que indica que a requisição enviada esta incorreta ou malformada. 
            res.status(400).end()
        }
    })
}

//Função criada para que seja possivel cancelar um pedido
const CancelarPedido = (req, res) => {
    //Criando uma variavel para chamar o return no banco de dados
    let string = pedidos.CancelarPedido(req.body)
    //Criando conexão com o banco de dados
    conexao.query(string, (err, result) => {
        //Se não houver erro, aparece o status 200 e a mensagem.
        if (err == null) {
            //Cria e altera o backup
            exportarPedidos()
            res.status(200).json("Pedido cancelado com sucesso").end()
            //Se houver erro, retorna o erro 400, que é erro de digitação/solicitação corrompiada e uma mensagem
        } else {
            res.status(400).json({ erro: "Erro ao cancelar pedido." })
        }
    })
}


//Exposta as funções
module.exports = {
    MostrarPedidos,
    MonstrarPedidoFiltradaIDCliente,
    CriarPedido,
    CriarPedidoLocal,
    AlterarStatusPedidos,
    CancelarPedido,
    AlterarDataConclusaoPedido
}