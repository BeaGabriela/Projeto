//Cria uma funcão que ira mostrar todos os pedidos feitos.
const MostrarPedidos =  () =>{
    return 'SELECT * FROM Pedidos'
}

//Cria uma função que mostra os pedidos filtrados pelo id do cliente
const MonstrarPedidoFiltradaIDCliente = (model) =>{
    return `SELECT * FROM Pedidos WHERE cliente_id = ${model.cliente_id}`
}

//Função que adiciona ao banco de dados novos pedidos feito através de dispositivo movel
const CriarPedido = (model) => {
    const dataConclusao = model.data_conclusao ? `'${model.data_conclusao}'` : 'NULL';

    return `INSERT INTO Pedidos (valor, data_pedido, status, data_conclusao, forma_pagamento, observacoes, cliente_id) 
            VALUES (${model.valor}, NOW(), '${model.status}', ${dataConclusao}, '${model.forma_pagamento}', '${model.observacoes}', ${model.cliente_id})`;
}


//Função que adiciona ao banco de dados novos pedidos feito no local
const CriarPedidoLocal = (model) => {
    return `INSERT INTO Pedidos (valor, data_pedido, status, data_conclusao, forma_pagamento, observacoes, nomeCliente) 
            VALUES (${model.valor}, NOW(), '${model.status}', NULL, '${model.forma_pagamento}', '${model.observacoes}', '${model.nomeCliente}')`;
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
    CriarPedidoLocal,
    AlterarStatusPedido,
    AlterarDataConclusaoPedido,
    CancelarPedido
}