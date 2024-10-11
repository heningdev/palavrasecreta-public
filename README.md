# Jogo da Palavra Secreta

## Visão Geral
Este projeto é um jogo de palavras secreto desenvolvido com React e Vite, integrado com Supabase para gerenciamento de banco de dados e armazenamento de pontuações.

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


