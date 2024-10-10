import React, { useState } from "react";
import Inicio from "./components/Inicio";
import Jogo from "./components/Jogo";
import Ranking from "./components/Ranking";
import "./App.css";

const App = () => {
  const [nome, setNome] = useState("");
  const [categoria, setCategoria] = useState("");
  const [jogando, setJogando] = useState(false);

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

  return (
    <div className="container">
      <header>
        <h1>Jogo da Palavra Secreta</h1>
      </header>
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
    </div>
  );
};

export default App;
