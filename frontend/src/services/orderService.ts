const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export interface ItemPedido {
  codigo?: number;
  quantidade: number;
  valorItem: number;
  produto: { id_produto: number, nome: string };
  pedido?: { id_pedido: number };
}

export interface Pedido {
  id_pedido?: number;
  dataPedido?: string;
  valorTotal: number;
  itensPedido: ItemPedido[];
}

// ── PEDIDOS ────────────────────────────────────────────────

export async function listarPedidos(): Promise<Pedido[]> {
  const res = await fetch(`${BASE_URL}/api/pedidos`, {});
  if (!res.ok) throw new Error("Erro ao listar pedidos");
  return res.json();
}

export async function buscarPedido(id: number): Promise<Pedido> {
  const res = await fetch(`${BASE_URL}/api/pedidos/${id}`);
  if (!res.ok) throw new Error("Pedido não encontrado");
  return res.json();
}

export async function criarPedido(pedido: Pedido): Promise<Pedido> {
  const res = await fetch(`${BASE_URL}/api/pedidos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pedido),
  });
  if (!res.ok) throw new Error("Erro ao criar pedido");
  return res.json();
}

// ── ITENS DE PEDIDO ────────────────────────────────────────

export async function adicionarItem(item: ItemPedido): Promise<ItemPedido> {
  const res = await fetch(`${BASE_URL}/api/itens-pedido`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
  if (!res.ok) throw new Error("Erro ao adicionar item");
  return res.json();
}

export async function atualizarItem(id: number, item: ItemPedido): Promise<ItemPedido> {
  const res = await fetch(`${BASE_URL}/api/itens-pedido/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
  if (!res.ok) throw new Error("Erro ao atualizar item");
  return res.json();
}

export async function removerItem(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/api/itens-pedido/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Erro ao remover item");
}