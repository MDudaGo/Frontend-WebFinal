import React, { useState, useEffect } from "react";

export default function Funcionarios() {
  const [funcionarios, setFuncionarios] = useState([]);

  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [endereco, setEndereco] = useState("");
  const [telefone, setTelefone] = useState("");

  useEffect(() => {
    const dados = JSON.parse(localStorage.getItem("funcionarios")) || [];
    setFuncionarios(dados);
  }, []);

  const cadastrar = () => {
    if (!nome || !cpf) {
      alert("Nome e CPF são obrigatórios!");
      return;
    }

    const novoFuncionario = {
      id: Date.now(),
      nome,
      cpf,
      endereco,
      telefone,
    };

    const novosFuncionarios = [...funcionarios, novoFuncionario];

    setFuncionarios(novosFuncionarios);
    localStorage.setItem(
      "funcionarios",
      JSON.stringify(novosFuncionarios)
    );

    setNome("");
    setCpf("");
    setEndereco("");
    setTelefone("");
  };

  return (
    <div>
      <h2>Gestão de Funcionários</h2>

      <div
        style={{
          marginBottom: "20px",
          border: "1px solid #ccc",
          padding: "10px",
        }}
      >
        <h3>Novo Funcionário</h3>

        <input
          type="text"
          placeholder="Nome Completo"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          style={{ marginRight: "10px", marginBottom: "5px" }}
        />

        <input
          type="text"
          placeholder="CPF"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          style={{ marginRight: "10px", marginBottom: "5px" }}
        />

        <input
          type="text"
          placeholder="Endereço"
          value={endereco}
          onChange={(e) => setEndereco(e.target.value)}
          style={{ marginRight: "10px", marginBottom: "5px" }}
        />

        <input
          type="text"
          placeholder="Telefone"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          style={{ marginRight: "10px", marginBottom: "5px" }}
        />

        <br />

        <button onClick={cadastrar} style={{ marginTop: "5px" }}>
          Cadastrar
        </button>
      </div>

      <h3>Funcionários Cadastrados</h3>

      <ul>
        {funcionarios.map((func) => (
          <li key={func.id} style={{ marginBottom: "8px" }}>
            <strong>{func.nome}</strong> — CPF: {func.cpf} | Tel:{" "}
            {func.telefone || "N/A"}
            <br />
            <small style={{ color: "#666" }}>
              Endereço: {func.endereco || "Não informado"}
            </small>
          </li>
        ))}
      </ul>
    </div>
  );
}