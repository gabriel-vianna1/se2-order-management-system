const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export interface Produto {
  id_produto?: number;
  nome: string;
  preco: number;
  estoque: number;
}

export interface ProdutoEletronico extends Produto {
  voltagem: string;
}

export interface ProdutoPerecivel extends Produto {
  dataValidade: string; // "YYYY-MM-DD"
}

// ── PRODUTO COMUM ──────────────────────────────────────────

export async function listarProdutos(): Promise<Produto[]> {
  const res = await fetch(`${BASE_URL}/api/produtos`);
  if (!res.ok) throw new Error("Erro ao listar produtos");
  return res.json();
}

export async function buscarProduto(id: number): Promise<Produto> {
  const res = await fetch(`${BASE_URL}/api/produtos/${id}`);
  if (!res.ok) throw new Error("Produto não encontrado");
  return res.json();
}

export async function criarProduto(produto: Produto): Promise<Produto> {
  const res = await fetch(`${BASE_URL}/api/produtos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(produto),
  });
  if (!res.ok) throw new Error("Erro ao criar produto");
  return res.json();
}

export async function atualizarProduto(id: number, produto: Produto): Promise<Produto> {
  const res = await fetch(`${BASE_URL}/api/produtos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(produto),
  });
  if (!res.ok) throw new Error("Erro ao atualizar produto");
  return res.json();
}

export async function deletarProduto(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/api/produtos/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Erro ao deletar produto");
}

// ── PRODUTO ELETRÔNICO ─────────────────────────────────────

export async function listarEletronicos(): Promise<ProdutoEletronico[]> {
  const res = await fetch(`${BASE_URL}/api/produtos/eletronicos`);
  if (!res.ok) throw new Error("Erro ao listar eletrônicos");
  return res.json();
}

export async function criarEletronico(produto: ProdutoEletronico): Promise<ProdutoEletronico> {
  const res = await fetch(`${BASE_URL}/api/produtos/eletronicos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(produto),
  });
  if (!res.ok) throw new Error("Erro ao criar produto eletrônico");
  return res.json();
}

export async function atualizarEletronico(id: number, produto: ProdutoEletronico): Promise<ProdutoEletronico> {
  const res = await fetch(`${BASE_URL}/api/produtos/eletronicos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(produto),
  });
  if (!res.ok) throw new Error("Erro ao atualizar produto eletrônico");
  return res.json();
}

export async function deletarEletronico(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/api/produtos/eletronicos/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Erro ao deletar produto eletrônico");
}

// ── PRODUTO PERECÍVEL ──────────────────────────────────────

export async function listarPerecíveis(): Promise<ProdutoPerecivel[]> {
  const res = await fetch(`${BASE_URL}/api/produtos/pereciveis`);
  if (!res.ok) throw new Error("Erro ao listar perecíveis");
  return res.json();
}

export async function criarPerecivel(produto: ProdutoPerecivel): Promise<ProdutoPerecivel> {
  const res = await fetch(`${BASE_URL}/api/produtos/pereciveis`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(produto),
  });
  if (!res.ok) throw new Error("Erro ao criar produto perecível");
  return res.json();
}

export async function atualizarPerecivel(id: number, produto: ProdutoPerecivel): Promise<ProdutoPerecivel> {
  const res = await fetch(`${BASE_URL}/api/produtos/pereciveis/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(produto),
  });
  if (!res.ok) throw new Error("Erro ao atualizar produto perecível");
  return res.json();
}

export async function deletarPerecivel(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/api/produtos/pereciveis/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Erro ao deletar produto perecível");
}