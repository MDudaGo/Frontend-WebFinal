import React, { useState, useEffect } from "react";

export default function Servicos() {
  const [servicos, setServicos] = useState([]);
  const [nome, setNome] = useState("");
  const [setor, setSetor] = useState("");

  useEffect(() => {
    const dados = JSON.parse(localStorage.getItem("servicos")) || [];
    setServicos(dados);
  }, []);

  const cadastrar = () => {
    if (!nome || !setor) {
      alert("Nome e Setor são obrigatórios!");
      return;
    }

    const novoServico = {
      id: Date.now(),
      nome,
      setor,
    };

    const novosServicos = [...servicos, novoServico];

    setServicos(novosServicos);
    localStorage.setItem("servicos", JSON.stringify(novosServicos));

    setNome("");
    setSetor("");
  };

  return (
    <div>
      <h2>Gestão de Serviços</h2>

      <div
        style={{
          marginBottom: "20px",
          border: "1px solid #ccc",
          padding: "10px",
        }}
      >
        <h3>Novo Serviço</h3>

        <input
          type="text"
          placeholder="Nome do Serviço"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          style={{ marginRight: "10px", marginBottom: "5px" }}
        />

        <input
          type="text"
          placeholder="Setor responsável"
          value={setor}
          onChange={(e) => setSetor(e.target.value)}
          style={{ marginRight: "10px", marginBottom: "5px" }}
        />

        <br />

        <button onClick={cadastrar} style={{ marginTop: "5px" }}>
          Cadastrar
        </button>
      </div>

      <h3>Serviços Cadastrados</h3>

      <ul>
        {servicos.map((serv) => (
          <li key={serv.id} style={{ marginBottom: "8px" }}>
            <strong>{serv.nome}</strong> — Setor: {serv.setor}
          </li>
        ))}
      </ul>
    </div>
  );
}