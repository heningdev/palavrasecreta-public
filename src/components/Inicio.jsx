import React, { useState } from "react";

const Inicio = ({ onStart }) => {
  const [nome, setNome] = useState("");
  const [categoria, setCategoria] = useState("");
  const [erro, setErro] = useState("");

  // Função para lidar com o início do jogo
  const handleStart = () => {
    if (!nome || !categoria) {
      setErro("Por favor, preencha todos os campos.");
      return;
    }
    setErro(""); // Limpa a mensagem de erro se os campos estiverem preenchidos
    onStart(nome, categoria); // Passa os dados para o componente pai
  };

  return (
    <div>
      <h1 className="titulo-inicio">Qual o seu nome?</h1>
      <form>
        <label>
          <span>Nome:</span>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)} // Atualiza o estado do nome
          />
        </label>
        <label>
          <span>Categoria:</span>
          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)} // Atualiza o estado da categoria
          >
            <option value="">Selecione uma categoria</option>
            <option value="frutas">Frutas</option>
            <option value="animais">Animais</option>
            <option value="paises">Países</option>
            <option value="cores">Cores</option>
            <option value="profissoes">Profissões</option>
            <option value="objetos">Objetos</option>
          </select>
        </label>
        {erro && <p className="erro">{erro}</p>} {/* Exibe erro se houver */}
        <button type="button" onClick={handleStart}>
          ▶ Iniciar Jogo
        </button>
      </form>
    </div>
  );
};

export default Inicio;
