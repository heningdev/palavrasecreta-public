import React, { useState, useEffect } from "react";
import Inicio from "./components/Inicio";
import Jogo from "./components/Jogo";
import Ranking from "./components/Ranking";
import DocumentacaoUsuario from "./components/usuarioDoc";
import imagensDia from "./assets/backgrounds/dia/diaImages";
import imagensNoite from "./assets/backgrounds/noite/noiteImages";

import "./App.css";

const obterImagemAleatoria = (imagens) => {
  return imagens[Math.floor(Math.random() * imagens.length)];
};

const App = () => {
  const [nome, setNome] = useState("");
  const [categoria, setCategoria] = useState("");
  const [jogando, setJogando] = useState(false);
  const [exibindoModal, setExibindoModal] = useState(false);

  const iniciarJogo = (nome, categoria) => {
    setNome(nome);
    setCategoria(categoria);
    setJogando(true);
  };

  const voltarInicio = () => {
    setNome("");
    setCategoria("");
    setJogando(false);
  };

  useEffect(() => {
    const horaAtual = new Date().getHours();
    const imagens =
      horaAtual >= 6 && horaAtual < 18 ? imagensDia : imagensNoite;
    const imagemSelecionada = obterImagemAleatoria(imagens);
    document.body.style.backgroundImage = `url(${imagemSelecionada})`;
    document.body.style.backgroundSize = "cover";
  }, []);

  const abrirModal = () => {
    setExibindoModal(true);
  };

  const fecharModal = () => {
    setExibindoModal(false);
  };

  return (
    <div className="container">
      <header>{/* <h1 className="titulo-app"></h1> */}</header>
      <div className="main-content">
        <section className="content-jogo">
          {jogando ? (
            <Jogo nome={nome} categoria={categoria} onVoltar={voltarInicio} />
          ) : (
            <Inicio onStart={iniciarJogo} />
          )}
        </section>
        <section className="content-ranking">
          <Ranking />
        </section>
      </div>
      <button className="botao-documentacao" onClick={abrirModal}>
        ?
      </button>
      {exibindoModal && (
        <div className="modal">
          <div className="modal-conteudo">
            <span className="fechar" onClick={fecharModal}>
              &times;
            </span>
            <DocumentacaoUsuario />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
