import React, { useState, useEffect } from "react";
import supabase from "./supabaseClient";
import gifsErrou from "../assets/Smolverse/errou/errouImages";
import gifsAcertou from "../assets/Smolverse/acertou/acertouImages";
import gifsVitoria from "../assets/Smolverse/vitoria/vitoriaImages";
import gifsDerrota from "../assets/Smolverse/derrota/derrotaImages";
import { palavrasPorCategoria } from "../data/data";

const obterImagemAleatoria = (imagens) => {
  return imagens[Math.floor(Math.random() * imagens.length)];
};

const Jogo = ({ nome, categoria, onVoltar }) => {
  const [palavra, setPalavra] = useState("");
  const [palpites, setPalpites] = useState("");
  const [acertos, setAcertos] = useState([]);
  const [tentativas, setTentativas] = useState(0);
  const [fimDeJogo, setFimDeJogo] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [imagem, setImagem] = useState("");
  const [tempoInicio, setTempoInicio] = useState(Date.now());
  const [vitoria, setVitoria] = useState(false);

  useEffect(() => {
    const palavras = palavrasPorCategoria[categoria.toLowerCase()];
    setPalavra(palavras[Math.floor(Math.random() * palavras.length)]);
  }, [categoria]);

  useEffect(() => {
    if (
      palavra &&
      palavra.split("").every((letra) => acertos.includes(letra))
    ) {
      setFimDeJogo(true);
      setVitoria(true);
      setMensagem("Parabéns, você ganhou!");
      const tempoFinal = Date.now();
      const pontuacao = calcularPontuacao(tentativas, tempoInicio, tempoFinal);
      salvarPontuacao(pontuacao);
      setImagem(obterImagemAleatoria(gifsVitoria));
    }
  }, [acertos]);

  const handlePalpite = (letra) => {
    if (palpites.includes(letra) || fimDeJogo) return;

    setPalpites(palpites + letra);
    if (palavra.includes(letra)) {
      setAcertos([...acertos, letra]);
      setImagem(obterImagemAleatoria(gifsAcertou));
    } else {
      setTentativas(tentativas + 1);
      setImagem(obterImagemAleatoria(gifsErrou));
    }

    if (tentativas >= 5 && !palavra.includes(letra)) {
      setFimDeJogo(true);
      setMensagem(`Você perdeu! Mais sorte na próxima`);
      setVitoria(false);
      salvarPontuacao(0);
      setImagem(obterImagemAleatoria(gifsDerrota));
    }
  };

  const calcularPontuacao = (tentativas, inicio, fim) => {
    const tempo = (fim - inicio) / 1000;
    return Math.max(1000 - (tentativas * 100 + tempo * 10), 0);
  };

  const salvarPontuacao = async (pontuacao) => {
    const pontuacaoInteira = Math.round(pontuacao);

    const { data: usuarioExistente, error: erroBusca } = await supabase
      .from("ranking")
      .select("pontuacao")
      .eq("nome", nome)
      .single();

    if (erroBusca && erroBusca.code !== "PGRST116") {
      console.error("Erro ao buscar o usuário:", erroBusca);
      return;
    }

    if (usuarioExistente) {
      const novaPontuacao = usuarioExistente.pontuacao + pontuacaoInteira;
      const { error: erroAtualizacao } = await supabase
        .from("ranking")
        .update({ pontuacao: novaPontuacao })
        .eq("nome", nome);

      if (erroAtualizacao) {
        console.error("Erro ao atualizar a pontuação:", erroAtualizacao);
      }
    } else {
      const { error: erroInsercao } = await supabase
        .from("ranking")
        .insert([{ nome, pontuacao: pontuacaoInteira }]);

      if (erroInsercao) {
        console.error("Erro ao inserir a pontuação:", erroInsercao);
      }
    }
  };

  return (
    <div>
      <h1>Bem-vindo, {nome}!</h1>
      <h4>
        Categoria: <span className="categoria-info">{categoria}</span>
      </h4>
      <div className="palavra-secreta">
        {palavra.split("").map((letra, i) => (
          <div
            key={i}
            className={`letra ${
              acertos.includes(letra) ? "letra-correta" : ""
            }`}
          >
            {acertos.includes(letra) ? letra : "?"}
          </div>
        ))}
      </div>
      <div className="input-do-jogo">
        <input
          type="text"
          maxLength="1"
          onChange={(e) => handlePalpite(e.target.value)}
          disabled={fimDeJogo}
        />
        <p> ⬅ Insira uma letra</p>
      </div>
      <p>
        Palpites: <span className="palpites">{palpites}</span>
      </p>
      <p>
        Tentativas restantes:{" "}
        <span className="tentativas">{6 - tentativas}</span>
      </p>
      <p>
        {fimDeJogo && (
          <p
            className={`mensagem-feedback ${
              vitoria ? "mensagem-vitoria" : "mensagem-derrota"
            }`}
          >
            {mensagem}
          </p>
        )}
      </p>
      {imagem && (
        <img
          src={imagem}
          alt="Resultado do Jogo"
          className="imagem-personagem"
        />
      )}
      {fimDeJogo && (
        <button onClick={onVoltar}>
          {vitoria ? "Voltar" : "Tentar Novamente"}
        </button>
      )}
    </div>
  );
};

export default Jogo;
