const criarService = () => ({
  listar: async () => ({ data: [] }),
  criar: async () => ({ data: {} }),
});

export const cidadeService = criarService();
export const equipamentoService = criarService();
export const funcionarioService = criarService();
export const servicoService = criarService();