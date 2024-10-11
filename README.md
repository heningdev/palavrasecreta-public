# WhatWord

WhatWord é um jogo onde o usuário precisa adivinhar a palavra secreta e acumular pontuação em um ranking  de usuários.


## Índice

- [WhatWord](#whatword)
  - [Índice](#índice)
  - [Sobre o Projeto](#sobre-o-projeto)
  - [Funcionalidades Principais](#funcionalidades-principais)
  - [Instalação](#instalação)
  - [Uso](#uso)
  - [Tecnologias Utilizadas](#tecnologias-utilizadas)
  - [Contato](#contato)

## Sobre o Projeto

WhatWord é um jogo de palavras secretas desenvolvido com React e Vite, integrado com Supabase para gerenciamento de banco de dados e armazenamento de informações.

## Funcionalidades Principais
1. **Componente `Inicio.js`**:
   - Tela inicial para inserção de nome e seleção de categoria.
   - Validação para campos obrigatórios.
   
2. **Componente `Jogo.js`**:
   - Lógica principal do jogo.
   - Exibição de letras corretas e incorretas.
   - Imagens dinâmicas de feedback para erros, acertos, vitória e derrota.
   - Cálculo de pontuação e salvamento no Supabase.

3. **Componente `Ranking.js`**:
   - Exibição do ranking dos jogadores.
   - Atualização em tempo real e botão de recarregar.

4. **Integração com Supabase**:
   - Conexão centralizada com o Supabase para inserção e atualização de pontuações.

5. **Background Dinâmico**:
   - O projeto possui uma funcionalidade de background dinâmico que muda de acordo com a hora do dia, proporcionando uma experiência visual imersiva e condizente com o horário local do usuário.
  
6. **Feedback Visual**:
   - Imagens de personagens que reagem aos erros, acertos, vitórias e derrotas.


## Instalação

Siga os passos abaixo para instalar e executar o projeto localmente:

1. Clone o repositório:

   ```sh
   git clone https://github.com/heningdev/palavrasecreta

2. Navegue até o diretório do projeto:

   ```sh
   cd palavra-secreta

3. Instale as dependências:

   ```sh
   npm install
   npm instal @supabase/supabase-js
   npm install react-icons

4. Configure o Supabase:

   ```sh
   Crie uma conta no Supabase.

   Crie um novo projeto e obtenha a URL e a chave API.

   Configure as variáveis no arquivo supabaseClient.js.

   obs: Será preciso criar a tabela ranking.

Inicie o projeto:

5. Em uma nova aba do terminal, inicie a aplicação React@vite:

   ```sh
   npm run dev

   A aplicação estará disponível em http://localhost:5173

   Obs: Pode ser necessário concordar em mudar a porta padrão React no console

## Uso

- Insira um nome de usuário e escolha uma categoria.
- Clique em Iniciar Jogo.
- Utilize o campo para inserir o seu palpite(letra).
- Ao fim escolha se deseja jogar novamente ou  voltar a tela inicial.
- O botão atualizar no ranking atualiza o ranking com a pontuação dos usuários.

## Tecnologias Utilizadas

- React
- Vite
- Supabase
- HTML5
- CSS3
- JavaScript (ES6+)
- React-icons

## Contato

- Hening Pereira
- hening.dev@gmail.com
