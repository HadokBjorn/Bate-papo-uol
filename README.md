# Bate-papo-uol
## Tecnologias usadas: HTML | CSS | JS | Vercel | Figma | Json | API
### bate-papo totalmente funcional, inspirado no saudoso Bate-Papo UOL.
## Link para testar o projeto (deploy) : https://bate-papo-uol-gamma.vercel.app/
![image](https://user-images.githubusercontent.com/113884763/231088977-90344246-0695-42a9-8ddc-dc3b0a6d4b26.png)
![image](https://user-images.githubusercontent.com/113884763/231089763-1e9e77c6-c1e4-40ab-8afb-c7a0031da6de.png)
![image](https://user-images.githubusercontent.com/113884763/231089413-d4835296-e207-43a6-b9ca-0aac112e1142.png)
![image](https://user-images.githubusercontent.com/113884763/231089571-81186442-f7f5-4c09-8415-1af2619fa611.png)
![image](https://user-images.githubusercontent.com/113884763/231089970-fe3e4b53-094a-4020-9ee8-78f3bd2c8188.png)
![image](https://user-images.githubusercontent.com/113884763/231090229-8dd171d6-d81e-4f28-9e43-8253e52323af.png)
![image](https://user-images.githubusercontent.com/113884763/231090366-bbc377e8-9042-4f2d-8907-6b4275300fc0.png)

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
### Ao entrar no site, o usuário deve inserir o nome que usará no chat.
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
