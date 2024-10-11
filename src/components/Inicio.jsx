import React, { useState } from "react";

const Inicio = ({ onStart }) => {
  const [nome, setNome] = useState("");
  const [categoria, setCategoria] = useState("");
  const [erro, setErro] = useState("");

  const handleStart = () => {
    if (!nome || !categoria) {
      setErro("Por favor, preencha todos os campos.");
      return;
    }
    setErro("");
    onStart(nome, categoria);
  };

  return (
    <div>
      <h1></h1>
      <form>
        <label>
          Nome:
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </label>
        <label>
          Categoria:
          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="">Selecione uma categoria</option>
            <option value="frutas">Frutas</option>
            <option value="animais">Animais</option>
          </select>
        </label>
        {erro && <p className="erro">{erro}</p>}
        <button type="button" onClick={handleStart}>
          Iniciar Jogo
        </button>
      </form>
    </div>
  );
};

export default Inicio;
