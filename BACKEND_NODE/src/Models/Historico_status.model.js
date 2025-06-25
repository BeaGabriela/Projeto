//Cria uma funcão que ira mostrar todos os status
const MostrarhisoricoStatus =  (model) =>{
    return `SELECT * FROM vw_historico_status WHERE pedido_id = ${model.pedido_id}`
}


//Função que adiciona ao banco de dados novos status
const criarStatus = (model) =>{
    return `INSERT INTO item_pedido VALUES(default, '${model.status_anterior}', '${model.status_novo}', now(), ${model.pedido_id})`
}


//Exposta as funções
module.exports = {
    MostrarhisoricoStatus,
    criarStatus
}