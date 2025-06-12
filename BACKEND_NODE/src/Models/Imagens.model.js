//Cria uma funcão que ira mostrar todoas imagens
const MonstraImagem =  () =>{
    return `SELECT * FROM Imagens`
}

//Cria uma funcão que ira mostrar todos imagens filtrada por id_pizza
const MonstraImagemFiltradas =  (model) =>{
    return `SELECT * FROM Imagens WHERE id_pizza = ${model.id_pizza}`
}

//Função que adiciona ao banco de dados as imagens das pizzas
const CriarImagem = (model) =>{
    return `INSERT INTO Imagens VALUES(default,'${model.nome}', '${model.caminho}', now(), ${model.id_pizza})`
}


//Exposta as funções
module.exports = {
    MonstraImagem,
    MonstraImagemFiltradas,
    CriarImagem
}