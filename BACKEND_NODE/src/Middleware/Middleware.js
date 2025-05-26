//Criando uma varivael que irá armazenar o json web token
const jwt = require("jsonwebtoken")

//Criando uma função para validar o usuario e assim, permitir acesso.
const Autenticar = (req, res, next) => {
    //Constate criada para envar um token no cabeçalho da requisição
    //O ? é para evitar erro caso a authorization esteja undefined. Então se não existir, apenas rtorna undefined, e não 'craxa'
    const token = req.headers.authorization?.split(" ")[1] //O .split(' ') Divide a string em partes com base no espaço.E o [1] Pega apenas a segunda parte. 
    
    //Criada uma condicional apara verificar se o token realmente foi criado
    if(!token) return res.status(401).json({erro: "Token não fornecido"})
    
    //jwt.verify serve para verificar se o token é valido e decodificar as informações que ele possue.
    //Token é a o token enviado pelo usuario
    //Process.ev.jwt_secret é a chave usada para assinar o token, geralmente definida no .env
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => { //err se o token for invalido ou expirado.decoded se o token for válido, contem os dados que foram codificados no token
        //Se for invalido retorna o status 403 que significa 'Forbidden' ou seja 'acesso proibido'
        if(err) return res.status(403).json({erro: "Token Invalido"})
        //Se for valido retorna os dados decodificaos do token sao salvo no req.usuario para que outras rotas tenham acesso.
        req.usuario = decoded
        //Chama a proxima função/rota
        next()
    })
}

//Exportando a função
module.exports = {
    Autenticar
}