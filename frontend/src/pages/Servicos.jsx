import React, { useState, useEffect } from 'react';
import { servicoService } from '../services/api'; 

export default function Servicos() {
  const [servicos, setServicos] = useState([]);
  const [nome, setNome] = useState('');
  const [setor, setSetor] = useState('');

  useEffect(() => {
    carregarServicos();
  }, []);

  const carregarServicos = async () => {
    try {
      const response = await servicoService.listar();
      setServicos(response.data);
    } catch (error) {
      console.error("Erro ao buscar serviço", error);
    }
  };

  const cadastrar = async () => {
    if (!nome || !setor) return alert("Nome e Setor são obrigatórios!");

    try {
      // O ID não é enviado pois o banco gera automaticamente (serial)
      await servicoService.criar({ nome, setor });
      
      setNome('');
      setSetor('');
      carregarServicos(); 
    } catch (error) {
      console.error("Erro ao cadastrar serviço", error);
    }
  };

  return (
    <div>
      <h2>Gestão de Serviços</h2>

      <div style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
        <h3>Novo Serviço</h3>
        <input 
          type="text" 
          placeholder="Nome do Serviço" 
          value={nome} 
          onChange={(e) => setNome(e.target.value)} 
          style={{ marginRight: '10px', marginBottom: '5px' }} 
        />
        <input 
          type="text" 
          placeholder="Setor responsável" 
          value={setor} 
          onChange={(e) => setSetor(e.target.value)} 
          style={{ marginRight: '10px', marginBottom: '5px' }} 
        />
        <br />
        <button onClick={cadastrar} style={{ marginTop: '5px' }}>Cadastrar</button>
      </div>
      
      <h3>Serviços Cadastrados</h3>
      <ul>
        {servicos.map((serv, index) => (
          <li key={serv.id || index} style={{ marginBottom: '8px' }}>
            <strong>{serv.nome}</strong> — Setor: {serv.setor} <small style={{ color: '#888' }}>(ID: {serv.id})</small>
          </li>
        ))}
      </ul>
    </div>
  );
}