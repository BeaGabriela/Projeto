function Entrar(){
  const wave = document.getElementById('cheeseWave');
  wave.classList.add('active');

  setTimeout(() => {
    wave.classList.remove('active');
  }, 3000);
};


function fecharModalEsqueceuSenha(){
  var modalEsqueceuSenha = document.querySelector('.EsqueceuSenha')

  modalEsqueceuSenha.classList.add('modal')
}