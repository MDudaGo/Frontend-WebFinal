import React, { useState, useEffect } from 'react';
import { funcionarioService } from '../services/api'; // Ajusta conforme o teu ficheiro api.js

export default function Funcionarios() {
  const [funcionarios, setFuncionarios] = useState([]);
  
  // 1. Estados para cada campo da tua tabela
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [endereco, setEndereco] = useState('');
  const [telefone, setTelefone] = useState('');

  useEffect(() => {
    carregarFuncionarios();
  }, []);

  const carregarFuncionarios = async () => {
    try {
      const response = await funcionarioService.listar();
      setFuncionarios(response.data);
    } catch (error) {
      console.error("Erro ao buscar funcionários", error);
    }
  };

  const cadastrar = async () => {
    // Validação básica para garantir que os campos principais foram preenchidos
    if (!nome || !cpf) return alert("Nome e CPF são obrigatórios!");

    try {
      // 2. Envia os dados estruturados para o teu backend
      await funcionarioService.criar({ nome, cpf, endereco, telefone });
      
      // Limpa os campos após o sucesso
      setNome('');
      setCpf('');
      setEndereco('');
      setTelefone('');
      
      carregarFuncionarios(); // Atualiza a listagem em ecrã
    } catch (error) {
      console.error("Erro ao cadastrar funcionário", error);
    }
  };

  return (
    <div>
      <h2>Gestão de Funcionários</h2>

      {/* Formulário de Cadastro */}
      <div style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
        <h3>Novo Funcionário</h3>
        <input 
          type="text" 
          placeholder="Nome Completo" 
          value={nome} 
          onChange={(e) => setNome(e.target.value)} 
          style={{ marginRight: '10px', marginBottom: '5px' }} 
        />
        <input 
          type="text" 
          placeholder="CPF (Apenas números)" 
          value={cpf} 
          onChange={(e) => setCpf(e.target.value)} 
          style={{ marginRight: '10px', marginBottom: '5px' }} 
        />
        <input 
          type="text" 
          placeholder="Endereço" 
          value={endereco} 
          onChange={(e) => setEndereco(e.target.value)} 
          style={{ marginRight: '10px', marginBottom: '5px' }} 
        />
        <input 
          type="text" 
          placeholder="Telefone" 
          value={telefone} 
          onChange={(e) => setTelefone(e.target.value)} 
          style={{ marginRight: '10px', marginBottom: '5px' }} 
        />
        <br />
        <button onClick={cadastrar} style={{ marginTop: '5px' }}>Cadastrar</button>
      </div>

      {/* Listagem dos Funcionários */}
      <h3>Funcionários Cadastrados</h3>
      <ul>
        {funcionarios.map((func, index) => (
          // Usando o ID do banco ou a dica do índice se precisares de uma chave garantida
          <li key={func.id || index} style={{ marginBottom: '8px' }}>
            <strong>{func.nome}</strong> — CPF: {func.cpf} | Tel: {func.telefone || 'N/A'} <br />
            <small style={{ color: '#666' }}>Endereço: {func.endereco || 'Não informado'}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}