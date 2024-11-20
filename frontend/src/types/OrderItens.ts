export type OrderItens = {
  id: number;
  quantidade: number;
  nome: string;
  preco_unitario: string;
  pedido_id: number;
  produto_id: number | null;
};
