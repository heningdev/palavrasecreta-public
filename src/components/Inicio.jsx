import React, { useState, useEffect } from "react";
import { IoPeopleSharp, IoPlay } from "react-icons/io5";

const Inicio = ({ onStart }) => {
  const [nome, setNome] = useState("");
  const [categoria, setCategoria] = useState("");
  const [erro, setErro] = useState("");

  useEffect(() => {
    const nomeArmazenado = localStorage.getItem("nome");
    if (nomeArmazenado) {
      setNome(nomeArmazenado);
    }
  }, []);

  // Função para lidar com o início do jogo
  const handleStart = () => {
    if (!nome || !categoria) {
      setErro("Por favor, preencha todos os campos.");
      return;
    }
    localStorage.setItem("nome", nome); // Armazena o nome no local storage
    setErro(""); // Limpa a mensagem de erro se os campos estiverem preenchidos
    onStart(nome, categoria); // Passa os dados para o componente pai
  };

  return (
    <div>
      <h1 className="titulo-inicio">
        What<span>Word</span>
      </h1>
      <form>
        <label>
          <span>Nome:</span>
          <div className="input-nome">
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)} // Atualiza o estado do nome
            />
          </div>
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
            <option value="esportes">Esportes</option>
            <option value="carros">Carros</option>
            <option value="filmes">Filmes</option>
            <option value="comidas">Comidas</option>
          </select>
        </label>
        {erro && <p className="erro">{erro}</p>} {/* Exibe erro se houver */}
        <button type="button" onClick={handleStart}>
          <IoPlay className="icon" />
          Iniciar Jogo
        </button>
        <button className="btn-nome" type="button" onClick={() => setNome("")}>
          <IoPeopleSharp className="icon" />
          Trocar Nome
        </button>
      </form>
    </div>
  );
};

export default Inicio;
