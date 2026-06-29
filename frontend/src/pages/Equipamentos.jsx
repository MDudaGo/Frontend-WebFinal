import React, { useState, useEffect } from "react";

export default function Equipamentos() {
  const [equipamentos, setEquipamentos] = useState([]);
  const [nome, setNome] = useState("");
  const [setor, setSetor] = useState("");
  const [qtd, setQtd] = useState("");

  useEffect(() => {
    const dados = JSON.parse(localStorage.getItem("equipamentos")) || [];
    setEquipamentos(dados);
  }, []);

  const cadastrar = () => {
    if (!nome || !setor || !qtd) {
      alert("Preencha todos os campos!");
      return;
    }

    const novoEquipamento = {
      id: Date.now(),
      nome,
      setor,
      qtd: parseInt(qtd),
    };

    const novosEquipamentos = [...equipamentos, novoEquipamento];

    setEquipamentos(novosEquipamentos);
    localStorage.setItem(
      "equipamentos",
      JSON.stringify(novosEquipamentos)
    );

    setNome("");
    setSetor("");
    setQtd("");
  };

  return (
    <div>
      <h2>Gestão de Equipamentos</h2>

      <div
        style={{
          marginBottom: "20px",
          border: "1px solid #ccc",
          padding: "10px",
        }}
      >
        <h3>Novo Equipamento</h3>

        <input
          type="text"
          placeholder="Nome do Equipamento"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          style={{ marginRight: "10px" }}
        />

        <input
          type="text"
          placeholder="Setor"
          value={setor}
          onChange={(e) => setSetor(e.target.value)}
          style={{ marginRight: "10px" }}
        />

        <input
          type="number"
          placeholder="Quantidade"
          value={qtd}
          onChange={(e) => setQtd(e.target.value)}
          style={{ marginRight: "10px" }}
        />

        <button onClick={cadastrar}>Cadastrar</button>
      </div>

      <h3>Equipamentos Cadastrados</h3>

      <ul>
        {equipamentos.map((eq) => (
          <li key={eq.id}>
            <strong>{eq.nome}</strong> - Setor: {eq.setor} ({eq.qtd} un.)
          </li>
        ))}
      </ul>
    </div>
  );
}