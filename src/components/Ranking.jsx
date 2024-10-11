import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
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
      <h1>Ranking Global </h1>
      <div className="btn-att">
        <i
          className={`fas fa-sync-alt ${loading ? "spin" : ""}`}
          onClick={fetchRanking}
        ></i>
        <p className="text-att">Atualizar</p>
      </div>
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
