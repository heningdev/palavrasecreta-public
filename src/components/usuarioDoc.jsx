import React from "react";
import "../App.css";

const DocumentacaoUsuario = () => (
  <div className="documentacao-container">
    <h1>Jogo da Palavra Secreta</h1>
    <h2>Introdução</h2>
    <p>
      Bem-vindo ao Jogo da Palavra Secreta! Este é um jogo de adivinhação onde
      você precisa descobrir a palavra secreta antes que suas tentativas se
      esgotem.
    </p>
    <h2>Como Jogar</h2>
    <ol>
      <li>
        <strong>Nome e Categoria:</strong> Ao iniciar o jogo, insira seu nome e
        selecione uma categoria (por exemplo, frutas ou animais).
      </li>
      <li>
        <strong>Adivinhe a Palavra:</strong> Digite uma letra por vez para
        adivinhar a palavra secreta. Cada letra correta será revelada na
        palavra.
      </li>
      <li>
        <strong>Erros e Acertos:</strong> Se a letra não estiver na palavra,
        você perderá uma tentativa. Você tem 6 tentativas no total.
      </li>
      <li>
        <strong>Feedback Visual:</strong> Um personagem aparece na tela para
        indicar erros, acertos, vitória ou derrota.
      </li>
      <li>
        <strong>Pontuação:</strong> Quanto menos erros e mais rápido você
        descobrir a palavra, mais pontos você ganha.
      </li>
      <li>
        <strong>Ranking:</strong> Sua pontuação será salva e você poderá ver o
        ranking global dos jogadores.
      </li>
    </ol>
    <h2>Pontuação</h2>
    <p>
      Se você descobrir a palavra em menos de 60 segundos, ganha um bônus por
      tempo, podendo chegar até 200 pontos adicionais. A pontuação mínima
      garantida é de 100 pontos.
    </p>
    <h2>Requisitos</h2>
    <ul>
      <li>Navegador Web atualizado</li>
      <li>Conexão com a internet</li>
    </ul>
    <h2>Dicas</h2>
    <ul>
      <li>
        Escolha uma categoria com a qual você esteja familiarizado para
        facilitar as adivinhações.
      </li>
      <li>Fique atento ao número de tentativas restantes.</li>
    </ul>
  </div>
);

export default DocumentacaoUsuario;
