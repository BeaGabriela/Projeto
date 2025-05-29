//Cria uma função que ira monstar todos os funcionarios cadastradas.
const MostrarFuncionarios = () =>{
    return `SELECT * FROM Funcionarios`
}

//Cria uma função que mostra o funcioario filtradao pelo id
const MonstrarFuncionarioID = (model) =>{
    return `SELECT * FROM Funcionarios WHERE id_funcionario = ${model.id_funcionario}`
}

//Criando a variavel que retorna o cpf digitado e a senha. Apenas se conter no banco de dados.
const Logar = () => {
    return "SELECT * FROM Funcionarios WHERE cpf = ?";
};


//Função que adiciona ao banco de dados novos funcionarios
const NovoFuncionario = (model) =>{
    return `INSERT INTO Funcionarios VALUES(default, '${model.nome}', ${model.cpf}, '${model.senha}', '${model.cargo}')`
}

//Criando uma funçãp para que seja possivel alterar os dados dos funcioarios criados.
const AlterarDadosFuncionario = (model) => {
    //Cria um vetor que coloca apenas os atribuitos a serem alterados, permitindno que altere apenas um elemento
    let updates =  []
    //Criado varias condicioanis para verificar se aquele atrbuto vai ser ou nao modificado.
    if(model.nome) updates.push(`nome = '${model.nome}'`)
    if(model.cpf) updates.push(`cpf = ${model.cpf}`)
    if(model.senha) updates.push(`senha = '${model.senha}'`)
    if(model.cargo) updates.push(`cargo = '${model.cargo}'`)
    //caso seja, ele alterara apenas o atributo desejado.
    return `UPDATE Funcionarios SET ${updates.join(', ')} WHERE id_funcionario = ${model.id_funcionario};`;
}

//Função criada para que seja possivel deletar um funcionario
const DeletarFuncionario = (model) => {
    return `DELETE FROM Funcionarios WHERE id_funcionario = ${model.id_funcionario}`
}

//Exposta as funções
module.exports = {
    MostrarFuncionarios,
    MonstrarFuncionarioID,
    Logar,
    NovoFuncionario,
    AlterarDadosFuncionario,
    DeletarFuncionario
}