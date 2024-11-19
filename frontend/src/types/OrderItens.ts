export type OrderItens = {
  id: number;
  quantidade: number;
  produtoNome: string;
  produtoValor: string;
  produtoId: number;
  pedidoId: number | null;
};
