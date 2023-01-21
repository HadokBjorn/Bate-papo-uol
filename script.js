const mensagem = document.querySelector('.mensagem');
const container = document.querySelector('.container');
const pageLogin = document.querySelector('.login');
const main = document.querySelector('.chat-container');
let textoMensagem = ``;
let nome = '';
let usuario = {};
let listaMensagem = [];

function mudaTamanhoText(item){
    mensagem.style.height = '80%';
    mensagem.attributes.placeholder.value = '';
}
function atualizaStatus(){
    const status = axios.post('https://mock-api.driven.com.br/api/v6/uol/status',usuario);
    console.log('online');
}

function enviaNome() {
    nome = document.querySelector('.input-login').value.toString();
    usuario = {
        name: `${nome}`
    }
    const nomeEnviado = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', usuario)
    .then((resposta) => {
            console.log(resposta.status);
            alert('Login feito com sucesso');
            container.classList.remove('hidden');
            pageLogin.style.display = 'none';
            dataMensagem();
            setInterval(atualizaStatus, 5000);
        }
    )
    .catch((erro) => {
        console.log(erro.response.status)
        alert('Nome de usuário invalido');
        document.querySelector('.input-login').value = '';
    });
}
function printMensagens(){

    for( i = 0; i < listaMensagem.length; i++){

        if(listaMensagem[i].type === 'status'){
            textoMensagem += `
            <li class="card-chat status">
            <p><p class='timer'>(${listaMensagem[i].time})</p> <b>${listaMensagem[i].from}</b> para <b>${listaMensagem[i].to}</b> ${listaMensagem[i].text}</p>
            </li>
            `;
        }
        if(listaMensagem[i].type === 'message'){
            textoMensagem += `
            <li class="card-chat message">
            <p><p class='timer'>(${listaMensagem[i].time})</p> <b>${listaMensagem[i].from}</b> para <b>${listaMensagem[i].to}</b> ${listaMensagem[i].text}</p>
            </li>
            `;
        }
        if(listaMensagem[i].type === 'private_message'){
            textoMensagem += `
            <li class="card-chat private_message">
            <p><p class='timer'>(${listaMensagem[i].time})</p> <b>${listaMensagem[i].from}</b> para <b>${listaMensagem[i].to}</b> ${listaMensagem[i].text}</p>
            </li>
            `;
        }

    }
    main.innerHTML += textoMensagem;
    const lastMensagem = document.querySelectorAll('.card-chat');
    const index = lastMensagem.length - 1;
    lastMensagem[index].scrollIntoView();
}

function dataMensagem(){
    const mensagens = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages')
    .then((resposta) => {
        listaMensagem = resposta.data;
        printMensagens();
    })
}

function enviarMensagem(){
    console.log(nome);
    const texto = {
        from: nome,
        to: "Todos",
        text: mensagem.value,
        type: "message"
    };
    const enviandoMensagem = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', texto)
    .then(() => {
        dataMensagem();
        mensagem.value = '';
        mensagem.style.height = '30%';
        mensagem.attributes.placeholder.value = 'Escreva aqui...';
    })
    .catch((erro)=>{console.log(erro)})
}