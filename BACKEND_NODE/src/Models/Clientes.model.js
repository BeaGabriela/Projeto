//Cria uma função que retorna a leitura de todos os clientes armazenados na tabela no banco de dados.
const LerClientes = () => { //Usado pela pizzaria, mas apenas as informações que realemnte são encessarias;
    return 'SELECT nome, telefone, logradouro, numero, complemento, bairro, cidade, estado, cep, referencia, preferencia_entrega FROM Clientes;'
}

const LerClientesFiltradoId = (model) => { //Usado pela pizzaria, mas apenas as informações que realemnte são encessarias puxada atraves do id;
    return `SELECT nome, telefone, logradouro, numero, complemento, bairro, cidade, estado, cep, referencia, preferencia_entrega FROM Clientes WHERE id_cliente = ${model.id_cliente};`
}

//Criando a variavel que retorna o email digitado e a senha. Apenas se conter no banco de dados.
const Logar = () => {
    return "SELECT * FROM clientes WHERE email = ?";
};

//Criada a função para que o usuario leia suas informações pessoais, ao cadastra-las no aplicativo
const LerInformacoesPessoais = (model) => {
    return `SELECT * FROM Clientes WHERE id_cliente = ${model.id_cliente};`
}

//Cria uma função que possibilita a criação de novos clientes.
const CriarCliente = (model) => {
    return `INSERT INTO Clientes VALUES(default, '${model.email}', '${model.senha}', '${model.cpf}', '${model.nome}','${model.telefone}','${model.logradouro}',${model.numero},'${model.complemento}','${model.bairro}','${model.cidade}', '${model.estado}', ${model.cep}, '${model.referencia}', now(), '${model.preferencia_entrega}' );`
}

//Funçao criada para alterar dados pessoais.
const AlterarDadosPessoais = (model) => {
    //Criado um vetor
    let updates = [];
    //Criado varias condicioanis para verificar se aquele atrbuto vai ser ou nao modificado.
    if (model.email) updates.push(`email = '${model.email}'`);
    if (model.senha) updates.push(`senha = '${model.senha}'`);
    if (model.cpf) updates.push(`cpf = '${model.cpf}'`);
    if (model.nome) updates.push(`nome = '${model.nome}'`);
    if (model.telefone) updates.push(`telefone = '${model.telefone}'`);
    if (model.logradouro) updates.push(`logradouro = '${model.logradouro}'`);
    if (model.numero) updates.push(`numero = '${model.numero}'`);
    if (model.complemento) updates.push(`complemento = '${model.complemento}'`);
    if (model.bairro) updates.push(`bairro = '${model.bairro}'`);
    if (model.cidade) updates.push(`cidade = '${model.cidade}'`);
    if (model.estado) updates.push(`estado = '${model.estado}'`);
    if (model.cep) updates.push(`cep = '${model.cep}'`);
    if (model.referencia) updates.push(`referencia = '${model.referencia}'`);
    if (model.data_cadastro) updates.push(`data_cadastro = '${model.data_cadastro}'`);
    if (model.preferencia_entrega) updates.push(`preferencia_entrega = '${model.preferencia_entrega}'`);
    //caso seja, ele alterara apenas o atributo desejado.
    return `UPDATE Clientes SET ${updates.join(', ')} WHERE id_cliente = ${model.id_cliente};`;
}



//Função criada para, caso o usuario queira, deletar sua conta
const DeletarCadastro = (model) => {
    return `DELETE FROM Clientes WHERE id_cliente = ${model.id_cliente} `
}



//Exporta as funções criadas nesse arquivo.
module.exports = {
    LerClientes,
    LerClientesFiltradoId,
    Logar,
    LerInformacoesPessoais,
    CriarCliente,
    AlterarDadosPessoais,
    DeletarCadastro
}