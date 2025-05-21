//Cria uma função que retorna a leitura de todos os clientes armazenados na tabela no banco de dados.
const lerTodos = () => {
    return 'SELECT * FROM Clientes;'
}

//Criando a variavel que retorna o email digitado e a senha. Apenas se conter no banco de dados.
const Logar = (model) =>{
    return `SELECT * FROM Clientes WHERE email='${model.email}' AND senha='${model.senha}'`
}

//Cria uma função que retorna a leitura das tabela de clientes, filtrando pelo id do qual deseja ser vizualizado.
const LerClientePeloId = (model) =>{
    return `SELECT * FROM Clientes WHERE id_cliente=${model.id_cliente};`
}

//Cria uma função que retorna a leitura da tabela de cliente filtrando pelo nome
const LerClientePeloNome = (model) =>{
    return `SELECT * FROM Clientes WHERE nome=${model.nome};`
}

//Cria uma função que possibilita a criação de novos clientes.
const criarCliente = (model) =>{
    return `INSERT INTO Clientes VALUES(default, '${model.nome}','${model.telefone}','${model.logradouro}',${model.numero},'${model.complemento}','${model.bairro}','${model.cidade}', '${model.estado}', ${model.cep}, '${model.referencia}')`
}



//Exporta as funções criadas nesse arquivo.
module.exports = {
    lerTodos,
    Logar,
    LerClientePeloId,
    LerClientePeloNome,
    criarCliente
}