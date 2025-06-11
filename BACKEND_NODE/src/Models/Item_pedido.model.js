//Cria uma funcão que ira mostrar todos os itens pedidos se for para entregar.
const MostrarItensPedidosEntrega =  (model) =>{
    return `SELECT * FROM vw_pedido_cliente_entrega WHERE id_cliente = ${model.id_cliente}`
}

//Cria uma função que mostra os pedidos filtrados pelo id do cliente
const MonstrarItensPedidosRetirada = (model) =>{
    return `SELECT * FROM vw_pedido_cliente_retirada WHERE id_cliente = ${model.id_cliente}`
}

//Função que adiciona ao banco de dados novos itens pedidos
const CriarItemPedido = (model) =>{
    return `INSERT INTO item_pedido VALUES(${model.pedido_id}, ${model.id_pizza}, ${model.quantidade}, ${model.modo_entrega})`
}


//Exposta as funções
module.exports = {
    MostrarItensPedidosEntrega,
    MonstrarItensPedidosRetirada,
    CriarItemPedido
}