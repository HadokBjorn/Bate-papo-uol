# Bate-papo-uol
### bate-papo totalmente funcional, inspirado no saudoso Bate-Papo UOL.
## 📝 Descrição

### Não foi utilizado nenhuma biblioteca para implementar este projeto (jquery, lodash, react, etc), nem outras linguagens que compilem para JavaScript (TypeScript, Clojure, ELM, etc), somente JavaScript puro.
### Desenvolvido utilizando Git e GitHub, em um repositório público.
## Chat:
### Ao entrar na sala, carrega as mensagens do servidor quando o usuário estiver logado e exibi-as.
## Existem três tipos de mensagem:
    - Mensagens de status (**Entrou** ou **Saiu** da sala): com fundo cinza;
    - Mensagens reservadas (**Reservadamente**): com fundo rosa;
    - Mensagens normais: com fundo branco.
### A cada três segundos o site recarrega as mensagens do servidor para manter sempre atualizado.
### O *chat* tem rolagem automática por padrão, ou seja, sempre que novas mensagens forem adicionadas ao final do *chat* ele *scrolla* para o final.
### As mensagens com Reservadamente só são exibidas se o nome do destinatário ou remetente for igual ao nome do usuário que está usando o chat (ou senão ele poderia ver as mensagens reservadas para outras pessoas)
- ⚠️ Atenção: Fazer essa filtragem no front-end não é uma boa prática, o ideal seria o servidor não fornecer essas mensagens para outras pessoas. Entretanto, para fins didáticos foi deixado dessa forma.
## Entrada na sala:
### Ao entrar no site, o usuário é perguntado com um `prompt` ****seu lindo nome.
### Após inserção do nome, este é enviado para o servidor pra cadastrar o usuário:
### Caso o servidor responda com sucesso, o usuário entra na sala;
### Caso o servidor responda com erro, é pedido para o usuário digitar outro nome, pois este já está em uso;
### Enquanto o usuário estiver na sala, a cada 5 segundos o site avisa ao servidor que o usuário ainda está presente, ou senão é considerado que "Saiu da sala".
## Envio de mensagem:
### Ao enviar uma mensagem, esta é enviada para o servidor:
### Caso o servidor responda com sucesso, são obtidas as mensagens novamente do servidor e o *chat* é atualizado;
### Caso o servidor responda com erro, significa que esse usuário não está mais na sala e a página é atualizada (e com isso voltando pra etapa de pedir o nome).
### Nesse envio, deve ser informado o remetente, o destinatário e se a mensagem é reservada ou não.
### Escolher um destinatário e se a mensagem é reservada ou pública.
- O projeto aceita envio da mensagem com a tecla enter.
- Possui tela de entrada com loading.
## Participantes ativos:
### Ao clicar no ícone superior direito de participantes, o menu lateral abre por cima do chat. Um fundo escuro semi-transparente fica por cima do *chat*.
### Ao clicar no fundo escuro, o menu lateral é ocultado novamente.
### O site obtem a lista de participantes assim que entra no chat e atualiza a lista a cada dez segundos.
### Ao clicar em uma pessoa ou em público/reservadamente, a opção clicada é marcada com um *check* e as demais desmarcadas.
### Além do check acima, ao trocar esses parâmetros também é alterada a frase que informa o destinatário, que fica embaixo do input de mensagem.
