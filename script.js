const mensagem = document.querySelector('.mensagem');
const container = document.querySelector('.container');
const pageLogin = document.querySelector('.login');
const main = document.querySelector('.chat-container');
let nome = document.querySelector('.input-login');
const mask = document.querySelector('.mask');
let textoMensagem = ``;
let destino = 'Todos';
let typeMessage = 'message';
let usuario = {};
let listaMensagem = [];
let userOnline = [];

mensagem.addEventListener('keypress',(e)=>{
    if(e.key === 'Enter'&&nome!==''){
        e.preventDefault();
        enviarMensagem();
    }
});

nome.addEventListener('keypress',(e)=>{
    if(e.key === 'Enter' && nome !==''){
        enviaNome();
    }
})

function mudaTamanhoText(item){
    mensagem.style.height = '50%';
    mensagem.attributes.placeholder.value = '';
}
function atualizaStatus(){
    const status = axios.post('https://mock-api.driven.com.br/api/v6/uol/status',usuario);
}

function enviaNome() {

    const loadingContainer = document.querySelector('.input-button-container');

    if(nome.value != '') {
    
    usuario = {
        name: `${nome.value.toString()}`
    }

    loadingContainer.innerHTML = '<span class="loader"></span><p>Entrando...</p>';

    const nomeEnviado = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', usuario)
    .then((resposta) => {
            container.classList.remove('hidden');
            pageLogin.style.display = 'none';
            dataMensagem();
            notification();
            setInterval(atualizaStatus, 5000);
            setInterval(dataMensagem,3000);
            setInterval(chatsAtivo,10000);
        }
    )
    .catch((erro) => {
        alert('Nome de usuário invalido, digite outro nome, pois este já está em uso.');
        loadingContainer.innerHTML = `
            <input class="input-login" data-test="input-name" placeholder="Digite seu nome" type="text"/>
            <button onclick="enviaNome()" data-test="send-name" class="button-input">Entrar</button>
        `;
        nome = document.querySelector('.input-login');

        nome.addEventListener('keypress',(e)=>{
            if(e.key === 'Enter' && nome !==''){
                enviaNome();
            }
        })
        
    });
}else{
    alert('Digite um nome para entrar!')
}
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
            <li data-test="message" class="card-chat status">
            <p><p class='timer'>(${listaMensagem[i].time})</p> <b>${listaMensagem[i].from}</b> para <b>${listaMensagem[i].to}</b> ${listaMensagem[i].text}</p>
            </li>
            `;
        }
        if(listaMensagem[i].type === 'message'){
            textoMensagem += `
            <li data-test="message" class="card-chat message">
            <p><p class='timer'>(${listaMensagem[i].time})</p> <b>${listaMensagem[i].from}</b> para <b>${listaMensagem[i].to}</b> ${listaMensagem[i].text}</p>
            </li>
            `;
        }
        if(listaMensagem[i].to === nome.value || listaMensagem[i].from === nome.value && listaMensagem[i].type === 'private_message') {
            textoMensagem += `
            <li data-test="message" class="card-chat private_message">
            <p><p class='timer'>(${listaMensagem[i].time})</p> <b>${listaMensagem[i].from}</b> reservadamente para <b>${listaMensagem[i].to}</b> ${listaMensagem[i].text}</p>
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
        to: destino,
        text: mensagem.value,
        type: typeMessage
    };
    const enviandoMensagem = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', texto)
    .then(() => {
        dataMensagem();
        mensagem.value = '';
        mensagem.style.height = '30%';
        mensagem.attributes.placeholder.value = 'Escreva aqui...';
    })
    .catch((erro)=>{
        window.location.reload()
    })
}

function chatsAtivo(){

    let users = `
    <div onclick="checkMark(this, 'Todos')" data-test="all">
        <p><ion-icon name="people"></ion-icon> <span class="user-name">Todos</span></p>
        <div class="check"><ion-icon  name="checkmark-sharp"></ion-icon></div>
    </div>
`;
    const containerUser = document.getElementById('user-online');
    const ativos = axios.get('https://mock-api.driven.com.br/api/v6/uol/participants')
    .then((response) => {
        userOnline = response.data;

        for (let i = 0; i < userOnline.length; i++) {
            users += `
            <div onclick="checkMark(this,'${userOnline[i].name}')" data-test="participant">
                <p><ion-icon name="person-circle-sharp"></ion-icon> <span class="user-name">${userOnline[i].name}</span></p>
                <div class="check" ><ion-icon data-test="check" name="checkmark-sharp"></ion-icon></div>
            </div>
            `
        }
        containerUser.innerHTML = users;
        users = `
        <div onclick="checkMark(this, 'Todos')" data-test="all">
            <p><ion-icon name="people"></ion-icon> <span class="user-name">Todos</span></p>
            <div class="check"><ion-icon  name="checkmark-sharp"></ion-icon></div>
        </div>
    `;
    })
    
}
function openSideBar(){
    chatsAtivo();
    mask.style.display = 'flex';
}
function removerMask(){
    mask.style.display = 'none';
}


function checkMark(user, userName){

    destino = userName;
    const userCheck = user.children[1];
    const anteriorUser = document.querySelector('#user-online .active');
    
    if (anteriorUser !== null){
        anteriorUser.classList.remove('active');
        anteriorUser.style.display = 'none';
    }
    userCheck.classList.add('active');
    userCheck.style.display = 'block';
    notification()

}

function selectedType(type, messageType){
    const typeCheck = type.children[1];

    typeMessage = messageType;
    const anteriorType = document.querySelector('#type .active');
    if (anteriorType !== null){
        anteriorType.classList.remove('active');
        anteriorType.style.display = 'none';
    }
    typeCheck.classList.add('active');
    typeCheck.style.display = 'block';
    notification()
}

function notification(){
    const noteUserToMessage = document.getElementById('notificacao');

    if(typeMessage === 'private_message'){

        noteUserToMessage.innerHTML = `Enviando para ${destino} (reservadamente)`
    }else if (typeMessage === 'message'){
        noteUserToMessage.innerHTML = `Enviando para ${destino} (publicamente)`;
    }
}
