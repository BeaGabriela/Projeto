//Criar uma pagina que cubrira todo o conteudo por alguns milesimos de segundos, de cor amarelo. 
function Entrar(){
  //Criando uam variavel que chamará o conteudo que quero editar do html
  const wave = document.getElementById('cheeseWave');
  //Adiciona o conteudo ativo
  wave.classList.add('active');

// Espera 3 segundos (tempo da animação), depois remove e muda de página
setTimeout(() => {
  wave.classList.remove('active');

  // Agora sim, muda de tela após o efeito
  window.location.href = "../Paginas/Home.html";
}, 3000);
};

//Função que abrirá o modal de esqueceu senha
function AbrirModalEsqueceuSenha(){
var abrirModadlEsqueceuSenha = document.querySelector('.EsqueceuSenha')
 abrirModadlEsqueceuSenha.classList.remove('modal')
}

//Função que abrirá o modal de novos usaurios
function AbrirModalNovoUsuario(){
var abrirModadlNovoUsuario = document.querySelector('.NovoUsuario')
 abrirModadlNovoUsuario.classList.remove('modal')
}



//Função que fechará o modal de esqueceu a senha.
function fecharModalEsqueceuSenha(){
  var modalEsqueceuSenha = document.querySelector('.EsqueceuSenha')

  modalEsqueceuSenha.classList.add('modal')
}

//Função que fechará o modal de novos usuarios.
function fecharModalNovosUsaurios(){
  var modalNovosUsuario = document.querySelector('.NovoUsuario')

  modalNovosUsuario.classList.add('modal')
}