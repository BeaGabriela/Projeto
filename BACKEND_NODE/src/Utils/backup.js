//Criando uma variavel que tera o modulo fs do node para salvar dados
const fs = require("fs")

//Criando a variavel que armazenara a conexão com o banco de dados
const conexao = require("../Dao/pizzaria.dao.js")

function exportarFuncionarios(){
    //Cria a linha que será rodada no banco de dados
    const sql = "SELECT * FROM Funcionarios"

    //Criando a conxeão com o banco de dados, atraves da query e rodando com sql
    conexao.query(sql, (err, results) =>{
        //Criando uma condicional, caso der erro, mostra um amensagem e o erro.    
        if(err){
            console.error("Erro ao buscar funcionários", err)
            return
        }
        
        //Salva o resultado no arquivo.json    Formata o json com o resultado
        fs.writeFile("dados/backup_funcionarios.json", JSON.stringify(results, null, 2), (err) =>{
            //Se apresentar erro, mostra a mensagem de erro
            if(err){
                console.error("Erro ao salvar o arquivo de backup de funcionarios", err)
            //Caso dê certo, a mensagem a aparecer será no console log, de sucesso. 
            }else{
                console.log("Backup criado com sucesso em backup_funcionarios.json")
            }

        })
    })
}

function exportarClientes(){
   //Cria a linha que será rodada no banco de dados
    const sql = "SELECT * FROM Clientes"

    //Criando a conxeão com o banco de dados, atraves da query e rodando com sql
    conexao.query(sql, (err, results) =>{
        //Criando uma condicional, caso der erro, mostra um amensagem e o erro.    
        if(err){
            console.error("Erro ao buscar Clientes", err)
            return
        }
        //Salva o resultado no arquivo.json    Formata o json com o resultado
        fs.writeFile("dados/backup_clientes.json", JSON.stringify(results, null, 2), (err) =>{
            //Se apresentar erro, mostra a mensagem de erro
            if(err){
                console.error("Erro ao salvar o arquivo de backup de clientes", err)
            //Caso dê certo, a mensagem a aparecer será no console log, de sucesso. 
            }else{
                console.log("Backup criado com sucesso em backup_clientes.json")
            }

        })
    })

}

function exportarPizzas(){
   //Cria a linha que será rodada no banco de dados
    const sql = "SELECT * FROM Pizzas"

    //Criando a conxeão com o banco de dados, atraves da query e rodando com sql
    conexao.query(sql, (err, results) =>{
        //Criando uma condicional, caso der erro, mostra um amensagem e o erro.    
        if(err){
            console.error("Erro ao buscar Pizzas", err)
            return
        }
        //Salva o resultado no arquivo.json    Formata o json com o resultado
        fs.writeFile("dados/backup_pizzas.json", JSON.stringify(results, null, 2), (err) =>{
            //Se apresentar erro, mostra a mensagem de erro
            if(err){
                console.error("Erro ao salvar o arquivo de backup das pizzas", err)
            //Caso dê certo, a mensagem a aparecer será no console log, de sucesso. 
            }else{
                console.log("Backup criado com sucesso em backup_pizzas.json")
            }

        })
    })

}

function exportarPedidos(){
   //Cria a linha que será rodada no banco de dados
    const sql = "SELECT * FROM Pedidos"

    //Criando a conxeão com o banco de dados, atraves da query e rodando com sql
    conexao.query(sql, (err, results) =>{
        //Criando uma condicional, caso der erro, mostra um amensagem e o erro.    
        if(err){
            console.error("Erro ao buscar Pedidos", err)
            return
        }
        //Salva o resultado no arquivo.json    Formata o json com o resultado
        fs.writeFile("dados/backup_pedidos.json", JSON.stringify(results, null, 2), (err) =>{
            //Se apresentar erro, mostra a mensagem de erro
            if(err){
                console.error("Erro ao salvar o arquivo de backup de pedidos", err)
            //Caso dê certo, a mensagem a aparecer será no console log, de sucesso. 
            }else{
                console.log("Backup criado com sucesso em backup_pedidos.json")
            }

        })
    })

}

function exportarItem_Pedido(){
   //Cria a linha que será rodada no banco de dados
    const sql = "SELECT * FROM Item_pedido"

    //Criando a conxeão com o banco de dados, atraves da query e rodando com sql
    conexao.query(sql, (err, results) =>{
        //Criando uma condicional, caso der erro, mostra um amensagem e o erro.    
        if(err){
            console.error("Erro ao buscar Itens", err)
            return
        }
        //Salva o resultado no arquivo.json    Formata o json com o resultado
        fs.writeFile("dados/backup_itens_pedidos.json", JSON.stringify(results, null, 2), (err) =>{
            //Se apresentar erro, mostra a mensagem de erro
            if(err){
                console.error("Erro ao salvar o arquivo de backup de itens", err)
            //Caso dê certo, a mensagem a aparecer será no console log, de sucesso. 
            }else{
                console.log("Backup criado com sucesso em backup_itens_pedidos.json")
            }

        })
    })

}
function exportarImagem(){
   //Cria a linha que será rodada no banco de dados
    const sql = "SELECT * FROM Imagens"

    //Criando a conxeão com o banco de dados, atraves da query e rodando com sql
    conexao.query(sql, (err, results) =>{
        //Criando uma condicional, caso der erro, mostra um amensagem e o erro.    
        if(err){
            console.error("Erro ao buscar imagens", err)
            return
        }
        //Salva o resultado no arquivo.json    Formata o json com o resultado
        fs.writeFile("dados/backup_imagens.json", JSON.stringify(results, null, 2), (err) =>{
            //Se apresentar erro, mostra a mensagem de erro
            if(err){
                console.error("Erro ao salvar o arquivo de backup de imagens", err)
            //Caso dê certo, a mensagem a aparecer será no console log, de sucesso. 
            }else{
                console.log("Backup criado com sucesso em backup_imagens.json")
            }

        })
    })

}

module.exports={
     exportarFuncionarios,
     exportarClientes,
     exportarPizzas,
     exportarPedidos,
     exportarItem_Pedido,
     exportarImagem
     
}