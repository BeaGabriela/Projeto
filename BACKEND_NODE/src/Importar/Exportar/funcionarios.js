// usuario_backup_tool.js

const fs = require("fs");
const bcrypt = require("bcrypt");
const conexao = require("./conexao"); // ajuste o caminho conforme seu projeto

const caminhoBackup = "backup_usuarios.json";
const saltRounds = 10;

// Função para exportar os usuários do banco para um arquivo JSON
function exportarFuncionarios() {
  const sql = `SELECT * FROM funcionarios`;
  conexao.query(sql, (err, results) => {
    if (err) {
      console.error("Erro ao buscar usuários:", err);
      return;
    }

    fs.writeFile(caminhoBackup, JSON.stringify(results, null, 2), (err) => {
      if (err) {
        console.error("Erro ao salvar o backup:", err);
      } else {
        console.log("Backup salvo com sucesso em:", caminhoBackup);
      }
    });
  });
}

// Função para importar usuários de um arquivo JSON para o banco, com senha criptografada
async function importarFuncionarios() {
  const data = fs.readFileSync('C:/Users/Undertaker/Desktop/Projeto/BACKEND_NODE/src/Importar\Exportar/dados.csv', "utf8");
  const usuarios = JSON.parse(data);

  for (const user of usuarios) {
    try {
      const hash = await bcrypt.hash(user.senha, saltRounds);
      const sql = `INSERT INTO funcionarios (nome, email, senha, cargo, telefone) VALUES (?, ?, ?, ?, ?)`;
      const valores = [user.nome, user.email, hash, user.cargo || 'Funcionario', user.telefone];
      conexao.query(sql, valores, (err) => {
        if (err) {
          console.error(`Erro ao inserir ${user.email}:`, err);
        } else {
          console.log(`Usuário ${user.email} inserido com sucesso.`);
        }
      });
    } catch (err) {
      console.error(`Erro ao gerar hash para ${user.email}:`, err);
    }
  }
}

// Exporta as funções para poderem ser chamadas de outro arquivo ou CLI
module.exports = {
  exportarFuncionarios,
  importarFuncionarios,
};

// Descomente uma das linhas abaixo para rodar a função desejada diretamente pelo terminal
exportarUsuarios();
importarUsuarios();