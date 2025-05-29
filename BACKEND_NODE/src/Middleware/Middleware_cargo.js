//Criando uma varivael que irá armazenar o json web token
const jwt = require("jsonwebtoken")

//Criada uma função que gera o token e verifica se o funcionario a editar a tabela de pizza é um cargo acima
const verificaPermissao = (permissoesPermitidas = []) => {
  return (req, res, next) => {
    //Constante para verificar se o cargo é gerente ou lider
    const cargo = req.usuario?.cargo;
    //Verificação do cargo, se for difernete de lider ou gerente, ele para aqui
    if (!permissoesPermitidas.includes(cargo)) {
      return res.status(403).json({ erro: "Acesso negado" });
    }
    //Se não, ele continua
    next();
  };
};

module.exports = verificaPermissao;
