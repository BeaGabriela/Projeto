//Cria uma função que i´ra monstar todas as pizzas cadastradas.
const MostrarPizzas = () =>{
    return `SELECT * FROM Pizzas`
}

//Cria uma função que mostra as pizzas filtradas pelo id
const MonstrarPizzaFiltradaID = (model) =>{
    return `SELECT * FROM Pizzas WHERE id_pizza = ${model.id_pizza}`
}

//Função que adiciona ao banco de dados novas pizzas
const CriarPizza = (model) =>{
    return `INSERT INTO Pizzas VALUES(default, '${model.nome}', '${model.descricao}', ${model.valor})`
}

//Criando uma funçãp para que seja possivel alterar os dados das pizzas criadas.
const AlterarPizza = (model) => {
    //Cria um vetor que coloca apenas os atribuitos a serem alterados, permitindno que altere apenas um elemento
    let updates =  []
    //Criado varias condicioanis para verificar se aquele atrbuto vai ser ou nao modificado.
    if(model.nome) updates.push(`nome = '${model.nome}'`)
    if(model.descricao) updates.push(`descricao = '${model.descricao}'`)
    if(model.valor) updates.push(`valor = '${model.valor}'`)
    //caso seja, ele alterara apenas o atributo desejado.
    return `UPDATE Pizzas SET ${updates.join(', ')} WHERE id_pizza = ${model.id_pizza};`;
}

//Função criada para que seja possivel deletar uma pizza
const DeletarPizza = (model) => {
    return `DELETE FROM Pizzas WHERE id_pizza = ${model.id_pizza}`
}

//Exposta as funções
module.exports = {
    MostrarPizzas,
    MonstrarPizzaFiltradaID,
    CriarPizza,
    AlterarPizza,
    DeletarPizza
}