//Cria uma funcão que ira mostrar todos os pedidos feitos.
const MostrarPedidos =  () =>{
    return 'SELECT * FROM Pedidos'
}

//Cria uma função que mostra os pedidos filtrados pelo id do cliente
const MonstrarPedidoFiltradaIDCliente = (model) =>{
    return `SELECT * FROM Pedidos WHERE cliente_id = ${model.cliente_id}`
}

//Função que adiciona ao banco de dados novos pedidos
const CriarPedido = (model) =>{
    return `INSERT INTO Pedidos VALUES(default, '${model.valor}', now(), ${model.cliente_id})`
}

//Criando uma funçãp para que seja possivel alterar os dados dos pedidos criados
const AlterarPedidos = (model) => {
    //Cria um vetor que coloca apenas os atribuitos a serem alterados, permitindno que altere apenas um elemento
    let updates =  []
    //Criado varias condicioanis para verificar se aquele atrbuto vai ser ou nao modificado.
    if(model.valor) updates.push(`valor = '${model.valor}'`)
    if(model.data_pedido) updates.push(`data_pedido = now()`)
    if(model.cliente_id) updates.push(`cliente_id = ${model.cliente_id}`)
    //caso seja, ele alterara apenas o atributo desejado.
    return `UPDATE Pedidos SET ${updates.join(', ')} WHERE pedido_id = ${model.pedido_id};`;
}


//Função criada para que seja possivel cancelar um pedido
const CancelarPedido = (model) => {
    return `DELETE FROM Pedidos WHERE pedido_id = ${model.pedido_id}`
}



//Exposta as funções
module.exports = {
    MostrarPedidos,
    MonstrarPedidoFiltradaIDCliente,
    CriarPedido,
    AlterarPedidos,
    CancelarPedido
}