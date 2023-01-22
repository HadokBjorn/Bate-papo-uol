const mensagem = document.querySelector('.mensagem');
const container = document.querySelector('.container');
const pageLogin = document.querySelector('.login');
const main = document.querySelector('.chat-container');
let nome = document.querySelector('.input-login');
const mask = document.querySelector('.mask');
let textoMensagem = ``;

let usuario = {};
let listaMensagem = [];

mensagem.addEventListener('keypress',(e)=>{
    if(e.key === 'Enter'&&nome!==''){
        enviarMensagem();
    }
});

nome.addEventListener('keypress',(e)=>{
    if(e.key === 'Enter' && nome !==''){
        enviaNome();
    }
})

function mudaTamanhoText(item){
    mensagem.style.height = '80%';
    mensagem.attributes.placeholder.value = '';
}
function atualizaStatus(){
    const status = axios.post('https://mock-api.driven.com.br/api/v6/uol/status',usuario);
    console.log('online');
}

function enviaNome() {

    usuario = {
        name: `${nome.value.toString()}`
    }
    const nomeEnviado = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', usuario)
    .then((resposta) => {
            console.log(resposta.status);
            alert('Login feito com sucesso');
            container.classList.remove('hidden');
            pageLogin.style.display = 'none';
            dataMensagem();
            setInterval(atualizaStatus, 5000);
            setInterval(dataMensagem,3000);
        }
    )
    .catch((erro) => {
        console.log(erro.response.status)
        alert('Nome de usuário invalido, digite outro nome, pois este já está em uso.');
        document.querySelector('.input-login').value = '';
    });
}

function dataMensagem(){
    const mensagens = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages')
    .then((resposta) => {
        listaMensagem = resposta.data;
        printMensagens();
    })
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
        if(listaMensagem[i].to === nome.value){
            textoMensagem += `
            <li class="card-chat private_message">
            <p><p class='timer'>(${listaMensagem[i].time})</p> <b>${listaMensagem[i].from}</b> para <b>${listaMensagem[i].to}</b> ${listaMensagem[i].text}</p>
            </li>
            `;
        }

    }
    main.innerHTML = textoMensagem;
    const lastMensagem = document.querySelectorAll('.card-chat');
    const index = lastMensagem.length - 1;
    lastMensagem[index].scrollIntoView();
    textoMensagem = ``;

}


function enviarMensagem(){
    const texto = {
        from: nome.value,
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

function chatsAtivo(){
    mask.style.display = 'flex';
}
function removerMask(){
    mask.style.display = 'none';
}


function checkMark(user){
    console.log(user)
    const userCheck = user.children[1];


    const anterior = document.querySelector('.active');
    if (anterior !== null){
        anterior.classList.remove('active');
        anterior.style.display = 'none';

    }
    userCheck.classList.add('active');
    userCheck.style.display = 'block';

}