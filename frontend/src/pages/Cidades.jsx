import React, { useState, useEffect } from "react";

export default function Cidades() {
  const [cidades, setCidades] = useState([]);
  const [nome, setNome] = useState("");
  const [cep, setCep] = useState("");

  useEffect(() => {
    const dados = JSON.parse(localStorage.getItem("cidades")) || [];
    setCidades(dados);
  }, []);

  const cadastrar = () => {
    if (!nome || !cep) {
      alert("Preencha todos os campos!");
      return;
    }

    const novaCidade = {
      CEP: parseInt(cep),
      nome,
    };

    const novasCidades = [...cidades, novaCidade];

    setCidades(novasCidades);
    localStorage.setItem("cidades", JSON.stringify(novasCidades));

    setNome("");
    setCep("");
  };

  return (
    <div>
      <h2>Gestão de Cidades</h2>

      <div style={{ marginBottom: "20px", border: "1px solid #ccc", padding: "10px" }}>
        <h3>Nova Cidade</h3>

        <input
          type="text"
          placeholder="Nome da Cidade"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          style={{ marginRight: "10px" }}
        />

        <input
          type="text"
          placeholder="CEP"
          value={cep}
          onChange={(e) => setCep(e.target.value)}
          style={{ marginRight: "10px" }}
        />

        <button onClick={cadastrar}>Cadastrar</button>
      </div>

      <h3>Cidades Cadastradas</h3>

      <ul>
        {cidades.map((cidade, index) => (
          <li key={index}>
            <strong>{cidade.nome}</strong> - CEP: {cidade.CEP}
          </li>
        ))}
      </ul>
    </div>
  );
}