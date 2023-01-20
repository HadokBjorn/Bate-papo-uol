const mensagem = document.querySelector('.mensagem');
const container = document.querySelector('.container');
const pageLogin = document.querySelector('.login');
let nome = '';

function mudaTamanhoText(item){
    mensagem.style.height = '80%';
    mensagem.attributes.placeholder.value = '';
}

function loginStatus(resposta) {
    console.log(resposta.status);
    alert('Login feito com sucesso');
    container.classList.remove('hidden');
    pageLogin.style.display = 'none';
}
function trataErroLogin(erro) {
    console.log(erro.response.status)
    alert('Nome de usuário invalido');
    document.querySelector('.input-login').value = '';
}

function enviaNome() {
    nome = document.querySelector('.input-login').value;
    let usuario = {
        name: `${nome}`
    }
    const nomeEnviado = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', usuario)
    .then(loginStatus)
    .catch(trataErroLogin);
}