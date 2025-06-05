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
                console.error("Erro ao salvar o arquivo de backup", err)
            //Caso dê certo, a mensagem a aparecer será no console log, de sucesso. 
            }else{
                console.log("Backup criado com sucesso em backup_funcionarios.json")
            }

        })
    })
}

module.exports={
     exportarFuncionarios
}