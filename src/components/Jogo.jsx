import React, { useState, useEffect } from "react";
import supabase from "./supabaseClient";
import gifsErrou from "../assets/Smolverse/errou/errouImages";
import gifsAcertou from "../assets/Smolverse/acertou/acertouImages";
import gifsVitoria from "../assets/Smolverse/vitoria/vitoriaImages";
import gifsDerrota from "../assets/Smolverse/derrota/derrotaImages";
import { palavrasPorCategoria } from "../data/data";
import { IoArrowUndo, IoPlay } from "react-icons/io5";

const obterImagemAleatoria = (imagens) => {
  return imagens[Math.floor(Math.random() * imagens.length)];
};

const Jogo = ({ nome, categoria, onVoltar, onJogarNovamente }) => {
  const [palavra, setPalavra] = useState("");
  const [palpites, setPalpites] = useState("");
  const [acertos, setAcertos] = useState([]);
  const [tentativas, setTentativas] = useState(0);
  const [fimDeJogo, setFimDeJogo] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [imagem, setImagem] = useState("");
  const [tempoInicio, setTempoInicio] = useState(Date.now());
  const [vitoria, setVitoria] = useState(false);

  // Sortear palavra com base na categoria selecionada
  useEffect(() => {
    const palavras = palavrasPorCategoria[categoria.toLowerCase()];
    setPalavra(palavras[Math.floor(Math.random() * palavras.length)]);
  }, [categoria]);

  // Verifica se o jogador acertou a palavra inteira
  useEffect(() => {
    if (
      palavra &&
      palavra.split("").every((letra) => acertos.includes(letra))
    ) {
      setFimDeJogo(true);
      setVitoria(true);
      setMensagem("Parabéns, você ganhou!");

      // Calcula a pontuação com base nas tentativas e no tempo gasto
      const tempoFinal = Date.now();
      const pontuacao = calcularPontuacao(tentativas, tempoInicio, tempoFinal);
      salvarPontuacao(pontuacao);

      // Exibe uma imagem de vitória
      setImagem(obterImagemAleatoria(gifsVitoria));
    }
  }, [acertos]);

  // Lida com o palpite do jogador
  const handlePalpite = (letra) => {
    // Impede palpites repetidos ou jogo já encerrado
    if (palpites.includes(letra) || fimDeJogo) return;

    setPalpites(palpites + letra);

    if (palavra.includes(letra)) {
      // Se a letra estiver correta, adiciona à lista de acertos
      setAcertos([...acertos, letra]);
      setImagem(obterImagemAleatoria(gifsAcertou)); // Exibe imagem de acerto
    } else {
      // Se a letra estiver errada, incrementa o contador de tentativas
      setTentativas(tentativas + 1);
      setImagem(obterImagemAleatoria(gifsErrou)); // Exibe imagem de erro
    }

    // Verifica se o jogador perdeu (mais de 5 tentativas erradas)
    if (tentativas >= 5 && !palavra.includes(letra)) {
      setFimDeJogo(true);
      setMensagem(
        <>
          Você perdeu! Mais sorte na próxima vez. <br />A palavra era{" "}
          <strong>{palavra}</strong>
        </>
      );

      setVitoria(false);
      salvarPontuacao(0); // Salva pontuação 0 em caso de derrota
      setImagem(obterImagemAleatoria(gifsDerrota)); // Exibe imagem de derrota
    }
  };

  // Função para calcular pontuação com base nas tentativas e tempo
  const calcularPontuacao = (tentativas, inicio, fim) => {
    const tempo = (fim - inicio) / 1000; // Calcula o tempo em segundos
    const pontuacaoBase = 100; // Pontuação inicial
    const penalidadeTentativas = tentativas * 50; // 50 pontos por tentativa incorreta
    const tempoGasto = tempo < 60 ? 200 - tempo : 0; // Bônus de tempo, até 200 pontos se terminar em menos de 60 segundos
    const pontuacaoFinal = Math.max(
      pontuacaoBase - penalidadeTentativas + tempoGasto,
      100
    ); // pontuação mínima de 100 pontos

    return pontuacaoFinal;
  };

  // Função para salvar a pontuação no banco de dados
  const salvarPontuacao = async (pontuacao) => {
    const pontuacaoInteira = Math.round(pontuacao); // Arredonda a pontuação para inteiro

    // Verifica se o usuário já existe no ranking
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
      // Se o usuário já existir, atualiza a pontuação
      const novaPontuacao = usuarioExistente.pontuacao + pontuacaoInteira;
      const { error: erroAtualizacao } = await supabase
        .from("ranking")
        .update({ pontuacao: novaPontuacao })
        .eq("nome", nome);

      if (erroAtualizacao) {
        console.error("Erro ao atualizar a pontuação:", erroAtualizacao);
      }
    } else {
      // Se o usuário não existir, insere um novo registro no ranking
      const { error: erroInsercao } = await supabase
        .from("ranking")
        .insert([{ nome, pontuacao: pontuacaoInteira }]);

      if (erroInsercao) {
        console.error("Erro ao inserir a pontuação:", erroInsercao);
      }
    }
  };

  return (
    <div className="jogo-page">
      <h1>Bem-vindo(a), {nome}!</h1>
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
      <div className="inferior-content">
        <div className="content-1">
          <p>
            Palpites: <span className="palpites">{palpites}</span>
          </p>
          <p>
            Tentativas restantes:{" "}
            <span className="tentativas">{6 - tentativas}</span>
          </p>

          {fimDeJogo && (
            <p
              className={`mensagem-feedback ${
                vitoria ? "mensagem-vitoria" : "mensagem-derrota"
              }`}
            >
              {mensagem}
            </p>
          )}
        </div>
        <div className="content-2">
          {imagem && (
            <img
              src={imagem}
              alt="Resultado do Jogo"
              className="imagem-personagem"
            />
          )}
        </div>
      </div>
      <div className="btn-content-fim">
        {fimDeJogo && (
          <div className="container-btn">
            <button onClick={onJogarNovamente}>
              <IoPlay className="icon" />
              Jogar Novamente
            </button>
            <button onClick={onVoltar}>
              <IoArrowUndo className="icon" />
              Voltar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Jogo;
