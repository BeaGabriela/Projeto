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
    return `INSERT INTO Pedidos VALUES(default, '${model.valor}', now(), '${model.status}',  ${model.data_conclusao}, '${model.forma_pagamento}',"${model.observacoes}")`
}

//Criando uma funçãp para que seja possivel alterar o status dos pedidos criados
const AlterarStatusPedido = (model) => {
    let updates = [];

    if(model.status) updates.push(`status = '${model.status}'`);

    return `UPDATE Pedidos SET ${updates.join(', ')} WHERE pedido_id = ${model.pedido_id};`;
}

//Criando uma funçãp para que seja possivel alterar a data dos pedidos criados
const AlterarDataConclusaoPedido = (model) => {
    let updates = [];

    // Sempre que chamar, define a data de conclusão como o momento atual
    updates.push(`data_conclusao = NOW()`);

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
    AlterarStatusPedido,
    AlterarDataConclusaoPedido,
    CancelarPedido
}