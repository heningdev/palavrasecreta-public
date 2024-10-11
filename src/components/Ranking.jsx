import React, { useEffect, useState } from "react";
import supabase from "./supabaseClient";

const Ranking = () => {
  const [ranking, setRanking] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRanking = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("ranking")
      .select("*")
      .order("pontuacao", { ascending: false });

    if (error) {
      console.error("Erro ao buscar o ranking:", error);
    } else {
      setRanking(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRanking();
  }, []);

  return (
    <div>
      <h1 className="titulo-ranking">Ranking</h1>
      <button className="btn-att" onClick={fetchRanking}>
        <i className={`fas fa-sync-alt ${loading ? "spin" : ""}`}></i>
        <p className="text-att">Atualizar</p>
      </button>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Pontuação</th>
          </tr>
        </thead>
        <tbody>
          {ranking
            .sort((a, b) => b.pontuacao - a.pontuacao)
            .map((usuario, index) => (
              <tr key={index}>
                <td>{usuario.nome}</td>
                <td>{usuario.pontuacao}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Ranking;
