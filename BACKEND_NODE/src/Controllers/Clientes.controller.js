//Importando o arquivo do models, atraves de uma variavel
const clientes = require('../Models/Clientes.model.js')

//Importando o arquivo do DAO, atraves de uma variavel
const conexao = require('../Dao/pizzaria.dao.js')

//Importando a varicel do bcrypt para codificar a senha
const bcrypt = require('bcrypt')

//Importando a variacel do crypto para decodifiar a senha.
const crypto = require('crypto-js')

//Criando uma varivel que armazena no token
const jwt = require("jsonwebtoken")

//Criando a variavel que define quantas vezes a senha vai ser randorizda.
const saltRounds = 10

//Cria uma variavel que armazena a função do backup
const { exportarClientes } = require("../Utils/backup.js");

//Criando função que retornara a leitura de todos os clientes
const LerClientes = (req, res) => {
    //Atribuindo a variavel string a função lerTodos
    let string = clientes.LerClientes()
    //executa uma consulta no banco de dados, que esta no return do 'lerTodos()', e em seguida passa dois paramentros, um de erro e outro de resultado
    conexao.query(string, (err, result) => {
        //Caso não haja erro, o programa teve uma consulta bem-sucedida.
        if (err == null) {
            //Com isso, o status 200 significa que foi bem sucedido, e em seguida todos os clientes aparecem em um json.
            res.status(200).json(result).end()
        } else {
            //Caso contrario, aparecera o status 400 que indica que a requisição enviada esta incorreta ou malformada. 
            res.status(400).end()
        }
    })
}
//Criada função que retorna a leitura do cliente, filtando pelo id
const LerClientesFiltradoId = (req, res) => {
    //Atribuindo a variavel string a função lerTodos
    let string = clientes.LerClientesFiltradoId(req.params)
    //executa uma consulta no banco de dados, que esta no return do 'lerTodos()', e em seguida passa dois paramentros, um de erro e outro de resultado
    conexao.query(string, (err, result) => {
        //Caso não haja erro, o programa teve uma consulta bem-sucedida.
        if (err == null) {
            //Com isso, o status 200 significa que foi bem sucedido, e em seguida todos os clientes aparecem em um json.
            res.status(200).json(result).end()
        } else {
            //Caso contrario, aparecera o status 400 que indica que a requisição enviada esta incorreta ou malformada. 
            res.status(400).end()
        }
    })
}

//Criando uma função que compara o email e a senha fornecida pelo usuario e a do banco de dados.
const Logar = async (req, res) => {
    //Definindo uma constante para armazenar o email e a senha digitada.
    const { email, senha } = req.body

    //Verifica se o email ou a senha estão vazios
    if (!email || !senha) {
        return res.status(400).json({ erro: "Email e senha são obrigatórios!" });
    }

    //Criando uma constante para armazenar a função que será chamada no banco de dados
    const string = clientes.Logar();
    //Criando conexão com o banco de dados, passando o email como paramentro.
    conexao.query(string, [email], async (err, result) => {
        //Criando uma verificação, se houver erro, trara o status 500, que é erro no servidor.
        if (err) {
            console.error("Erro ao consultar banco:", err);
            return res.status(500).json({ erro: "Erro no servidor" });
        }
        //Se o result retornar vazio, quer dizer que o email digitado, ou não existe ou foi digitado de uma forma diferente que está salvo no banco de dados,
        if (result.length === 0) {
            return res.status(404).json({ erro: "Usuário não encontrado" });
        }
        //Criando umma constate que armazena o result, filtrando pelo primeiro vetor. [0]
        const usuario = result[0];
        //Criando uma variavel que compara a senha digitada com a senha salva no banco de dados
        const confere = await bcrypt.compare(senha, usuario.senha);

        //Se as senhas forem iguais, então retornara status 200 de ok, e um status de login bem-sucedido.
        if (confere) {
            //Criando o token
            const token = jwt.sign(
                { id: usuario.id, email: usuario.email }, //Dados que vão dentro do token
                process.env.JWT_SECRET, //Chave que contem no arquivo .env
                { expiresIn: "1h" } // Tempo de expiração
            )
            //E retorna o token
            res.status(200).json({
                mensagem: "Login bem-sucedido",
                token: token,
                usuario: {id: usuario.id, nome: usuario.nome, email: usuario.email}
            });
            console.log(token)
            //Se não, o login de 401 apareceré na tela, dizendo que houve um erro de digitação, ou algo semelhante.
        } else {
            res.status(401).json({ erro: "Senha inválida" });
        }
    });
}

//Criando função que lê os dados pessoais da pessoa logada
const LerInformacoesPessoais = (req, res) => {
    //Atribuindo a variavel string a função LerDadosPessoais
    let string = clientes.LerInformacoesPessoais(req.body)
    //executa uma consulta no banco de dados, que esta no return do 'lerTodos()', e em seguida passa dois paramentros, um de erro e outro de resultado
    conexao.query(string, (err, result) => {
        //Caso não haja erro, o programa teve uma consulta bem-sucedida.
        if (err == null) {
            //Com isso, o status 200 significa que foi bem sucedido, e em seguida todos os clientes aparecem em um json.
            res.status(200).json(result).end()
        } else {
            //Caso contrario, aparecera o status 400 que indica que a requisição enviada esta incorreta ou malformada. 
            res.status(400).end()
        }
    })
}

//Criando uma variavel que cria um novo cliente
const CriarCliente = async (req, res) => {
    //Tratramento de erro, 'tente'
    try {
        //Atribui a senha vque foi digitada e armazena na variavel senha
        const senha = req.body.senha
        //Gera um hash seguro da senha
        const hash = await bcrypt.hash(senha, saltRounds)
        //Atualiza a senha ao cadastrar ja usando o hash
        req.body.senha = hash
        //Criada a variavel que hospeda a função que ira ser usada
        let string = clientes.CriarCliente(req.body)

        //Criado a conexão com o banco de dados
        conexao.query(string, (err, result) => {
            //Criado uma condicional para verificar se houve algum erro, caso não haja, a condicional exibira o resultado
            if (err == null) {
                //Editada o backup quando adiionados novos clientes.
                exportarClientes()
                //Status 201 significa que a requisição fo bem sucedida e um novo cliente foi criado no banco de dados.
                res.status(201).json(result).end()

            } else {
                console.error("Erro no banco", err)
                res.status(400).json(result).end()
            }
        })
        //Tratamento de erro
    } catch (error) {
        //Caso de erro no hash ou qualquer outro erro no try.
        console.error("Erro ao gerar hash: ", error)
        //Status 500 significa erro interno
        res.status(500).json({ erro: 'Erro interno ao processar a senha.' })
    }
}

// Criada uma função para alterar os dados pessoais do usuário logado
const AlterarDadosPessoais = async (req, res) => {
    // Se a senha foi informada, gera o hash
    if (req.body.senha) {
        try {
            const hash = await bcrypt.hash(req.body.senha, saltRounds);
            req.body.senha = hash;
        } catch (err) {
            return res.status(500).json({ erro: "Erro ao criptografar a senha" });
        }
    }

    // Definindo uma variável para armazenar a função que irá ser chamada no banco de dados
    let string = clientes.AlterarDadosPessoais(req.body);

    // Criando conexão com o banco de dados
    conexao.query(string, (err, result) => {
        // Se não houver erro, retorna um status 200, que significa 'ok' e o json
        if (err == null) {
            //Edita o backup
            exportarClientes()
            res.status(200).json(result).end();
        } else {
            // Se houver erro, retorna o erro 400
            res.status(400).json({ erro: "Erro ao alterar dados" });
        }
    });
};

//Função para deletar cadastro do cliente
const DeletarCadastro = (req, res) => {
    //Criando uma variavel para chamar o return no banco de dados
    let string = clientes.DeletarCadastro(req.body)
    //Criando conexão com o banco de dados
    conexao.query(string, (err, result) =>{
        //Edita o arquivo de backup
        exportarClientes()
        //Se não houver erro, aparece o status 200 e a mensagem.
        if(err == null){
            res.status(200).json("Usuario deletado com sucesso").end()
        //Se houver erro, retorna o erro 400, que é erro de digitação/solicitação corrompiada e uma mensagem
        }else{
            res.status(400).json({erro: "Erro ao deletar conta"})
        }
    })
}

//Exportando as funções para que sejam usadas em outro arquivo;
module.exports = {
    LerClientes,
    LerClientesFiltradoId,
    Logar,
    LerInformacoesPessoais,
    CriarCliente,
    AlterarDadosPessoais,
    DeletarCadastro

}
