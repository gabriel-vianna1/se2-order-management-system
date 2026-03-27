"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import { listarProdutos, listarEletronicos, listarPerecíveis } from "../services/productService";
import type { Produto, ProdutoEletronico, ProdutoPerecivel } from "../services/productService";

// Tipo unificado para exibição
export type ProdutoDisplay = {
  id: number;
  nome: string;
  preco: number;
  estoque: number;
  tipo: "eletronico" | "perecivel" | "comum";
  voltagem?: string;
  dataValidade?: string;
};

const typeConfig = {
  eletronico: { label: "Eletrônico", color: "text-blue-700",    bg: "bg-blue-50 border-blue-200" },
  perecivel:  { label: "Perecível",  color: "text-emerald-700", bg: "bg-emerald-50 border-emerald-200" },
  comum:      { label: "Comum",      color: "text-stone-600",   bg: "bg-stone-50 border-stone-200" },
};

export default function Home() {
  const [products, setProducts] = useState<ProdutoDisplay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<"todos" | "eletronico" | "perecivel" | "comum">("todos");

  const { cart, addToCart, removeFromCart, estoqueDisponivel, cartCount } = useCart();

  // Busca todos os produtos do backend e unifica
  useEffect(() => {
    async function fetchAll() {
      try {
        setLoading(true);
        const [comuns, eletronicos, pereciveis] = await Promise.all([
          listarProdutos(),
          listarEletronicos(),
          listarPerecíveis(),
        ]);

        // IDs que já têm tipo específico
        const idsEletronicos = new Set(eletronicos.map((e) => e.id_produto));
        const idsPerecíveis = new Set(pereciveis.map((p) => p.id_produto));

        const display: ProdutoDisplay[] = comuns.map((p) => {
          if (idsEletronicos.has(p.id_produto)) {
            const e = eletronicos.find((el) => el.id_produto === p.id_produto)!;
            return { id: p.id_produto!, nome: p.nome, preco: p.preco, estoque: p.estoque, tipo: "eletronico", voltagem: e.voltagem };
          }
          if (idsPerecíveis.has(p.id_produto)) {
            const pr = pereciveis.find((pe) => pe.id_produto === p.id_produto)!;
            return { id: p.id_produto!, nome: p.nome, preco: p.preco, estoque: p.estoque, tipo: "perecivel", dataValidade: pr.dataValidade };
          }
          return { id: p.id_produto!, nome: p.nome, preco: p.preco, estoque: p.estoque, tipo: "comum" };
        });

        setProducts(display);
      } catch (err) {
        setError("Não foi possível conectar ao servidor. Verifique se o backend está rodando.");
      } finally {
        setLoading(false);
      }
    }
    fetchAll();
  }, []);

  const filtered = products.filter((p) => {
    const matchSearch = p.nome.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === "todos" || p.tipo === filterType;
    return matchSearch && matchType;
  });

  return (
    <div className="min-h-screen bg-stone-50 font-sans">
      {/* Navbar */}
      <nav className="bg-white border-b border-stone-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-stone-800 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">O</span>
            </div>
            <Link href="/" className=""> 
              <span className="text-stone-800 font-semibold text-lg tracking-tight">OrderSystem</span>
            </Link>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/" className="text-stone-800 font-medium text-sm border-b-2 border-stone-800 pb-0.5">Produtos</Link>
            <Link href="/orders" className="text-stone-500 hover:text-stone-800 text-sm transition-colors">Pedidos</Link>
            <Link href="/cart" className="relative flex items-center gap-2 bg-stone-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-stone-700 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Carrinho
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h1 className="text-3xl font-bold text-stone-800 tracking-tight">Produtos</h1>
            <p className="text-stone-500 mt-1 text-sm">{filtered.length} produto{filtered.length !== 1 ? "s" : ""} encontrado{filtered.length !== 1 ? "s" : ""}</p>
          </div>
          <Link href="/products/new" className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Novo Produto
          </Link>
        </div>

        {/* Filtros */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <input
            type="text"
            placeholder="Buscar produto..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-white border border-stone-200 rounded-lg px-4 py-2.5 text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-300"
          />
          <div className="flex gap-2">
            {(["todos", "eletronico", "perecivel", "comum"] as const).map((t) => (
              <button key={t} onClick={() => setFilterType(t)}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium border transition-all ${filterType === t ? "bg-stone-800 text-white border-stone-800" : "bg-white text-stone-600 border-stone-200 hover:border-stone-400"}`}>
                {t === "todos" ? "Todos" : typeConfig[t].label}
              </button>
            ))}
          </div>
        </div>

        {/* Estados de loading/erro */}
        {loading && (
          <div className="text-center py-20 text-stone-400">
            <div className="w-8 h-8 border-2 border-stone-300 border-t-stone-600 rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm">Carregando produtos...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-center">
            <p className="text-red-600 font-medium text-sm">{error}</p>
            <button onClick={() => window.location.reload()} className="mt-3 text-xs text-red-500 underline hover:text-red-700">
              Tentar novamente
            </button>
          </div>
        )}

        {/* Grid */}
        {!loading && !error && (
          filtered.length === 0 ? (
            <div className="text-center py-20 text-stone-400">
              <p className="text-sm">Nenhum produto encontrado</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((product) => {
                const cfg = typeConfig[product.tipo];
                const inCart = cart.find((i) => i.product.id === product.id);
                const disponivelAgora = estoqueDisponivel(product);
                const semEstoque = disponivelAgora <= 0;

                return (
                  <div key={product.id} className="bg-white rounded-xl border border-stone-200 p-5 flex flex-col gap-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full border ${cfg.bg} ${cfg.color} mb-2`}>
                          {cfg.label}
                        </span>
                        <h2 className="text-stone-800 font-semibold text-base leading-tight">{product.nome}</h2>
                      </div>
                      <div className="flex gap-1 ml-2">
                        <Link href={`/products/${product.id}/edit`} className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </Link>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1 text-xs text-stone-500">
                      {product.voltagem && <span>⚡ Voltagem: {product.voltagem}</span>}
                      {product.dataValidade && <span>📅 Validade: {new Date(product.dataValidade).toLocaleDateString("pt-BR")}</span>}
                      <span className={`font-medium ${disponivelAgora <= 0 ? "text-red-500" : disponivelAgora <= 5 ? "text-amber-500" : "text-emerald-600"}`}>
                        {disponivelAgora <= 0 ? "Sem estoque disponível" : `${disponivelAgora} disponíve${disponivelAgora === 1 ? "l" : "is"} em estoque`}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-stone-100">
                      <span className="text-stone-800 font-bold text-lg">
                        {product.preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                      </span>
                      <div className="flex items-center gap-2">
                        {inCart && (
                          <button onClick={() => removeFromCart(product.id)}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition-all">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                            {inCart.qty}
                          </button>
                        )}
                        <button onClick={() => addToCart(product)} disabled={semEstoque}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${semEstoque ? "bg-stone-100 text-stone-400 cursor-not-allowed" : inCart ? "bg-amber-100 text-amber-700 border border-amber-300 hover:bg-amber-200" : "bg-stone-800 text-white hover:bg-stone-700"}`}>
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                          {semEstoque ? "Esgotado" : inCart ? `No carrinho (${inCart.qty})` : "Adicionar"}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )
        )}
      </main>
    </div>
  );
}