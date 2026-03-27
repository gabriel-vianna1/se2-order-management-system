"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "../../context/CartContext";
import Navbar from "../../components/Navbar";
import { criarPedido } from "../../services/orderService";

export default function CartPage() {
  const { cart, addToCart, removeFromCart, removeAllFromCart, clearCart, cartTotal } = useCart();
  const [finalized, setFinalized] = useState(false);
  const [orderId, setOrderId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function finalizarPedido() {
    try {
      setLoading(true);
      setError(null);

      // Monta o payload no formato que o backend espera
      const pedido = {
        valorTotal: cartTotal,
        itensPedido: cart.map((i) => ({
          quantidade: i.qty,
          valorItem: i.product.preco * i.qty,
          produto: { id_produto: i.product.id },
        })),
      };

      const criado = await criarPedido(pedido);
      setOrderId(criado.id_pedido ?? null);
      clearCart();
      setFinalized(true);
    } catch (err) {
      setError("Erro ao finalizar pedido. Verifique se o backend está rodando.");
    } finally {
      setLoading(false);
    }
  }

  if (finalized) {
    return (
      <div className="min-h-screen bg-stone-50">
        <Navbar />
        <main className="max-w-2xl mx-auto px-6 py-16 text-center">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-stone-800 mb-2">Pedido Finalizado!</h1>
          {orderId && <p className="text-stone-500 mb-8">Pedido #{orderId} registrado com sucesso.</p>}
          <div className="flex gap-3 justify-center">
            <Link href="/orders" className="bg-stone-800 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-stone-700 transition-colors">
              Ver Pedidos
            </Link>
            <Link href="/" className="bg-white border border-stone-200 text-stone-700 px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-stone-50 transition-colors">
              Continuar Comprando
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />
      <main className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-stone-800 mb-8">Carrinho</h1>

        {cart.length === 0 ? (
          <div className="bg-white rounded-xl border border-stone-200 p-20 text-center">
            <svg className="w-14 h-14 mx-auto mb-4 text-stone-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <p className="text-stone-500 font-medium mb-4">Seu carrinho está vazio</p>
            <Link href="/" className="bg-stone-800 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-stone-700 transition-colors">
              Ver Produtos
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Items */}
            <div className="flex-1 flex flex-col gap-3">
              {cart.map(({ product, qty }) => (
                <div key={product.id} className="bg-white rounded-xl border border-stone-200 p-5 flex items-center gap-4">
                  <div className="w-14 h-14 bg-stone-100 rounded-lg flex items-center justify-center text-2xl shrink-0">
                    {product.tipo === "eletronico" ? "💻" : product.tipo === "perecivel" ? "🛒" : "📦"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-stone-800 text-sm truncate">{product.nome}</p>
                    <p className="text-stone-500 text-xs mt-0.5">
                      {product.preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })} cada
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => removeFromCart(product.id)}
                      className="w-7 h-7 rounded-full border border-stone-200 flex items-center justify-center text-stone-600 hover:bg-stone-100 transition-colors">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    </button>
                    <span className="w-6 text-center font-bold text-stone-800 text-sm">{qty}</span>
                    <button onClick={() => addToCart(product)}
                      className="w-7 h-7 rounded-full border border-stone-200 flex items-center justify-center text-stone-600 hover:bg-stone-100 transition-colors">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                  <p className="font-bold text-stone-800 text-sm shrink-0">
                    {(product.preco * qty).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                  </p>
                  <button onClick={() => removeAllFromCart(product.id)} className="p-1.5 text-stone-300 hover:text-red-400 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="lg:w-72 shrink-0">
              <div className="bg-white rounded-xl border border-stone-200 p-5 sticky top-24">
                <h2 className="font-bold text-stone-800 mb-4">Resumo</h2>
                {cart.map(({ product, qty }) => (
                  <div key={product.id} className="flex justify-between text-xs text-stone-500 mb-2">
                    <span className="truncate mr-2">{product.nome} x{qty}</span>
                    <span className="shrink-0">{(product.preco * qty).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span>
                  </div>
                ))}
                <div className="border-t border-stone-100 mt-3 pt-3 flex justify-between font-bold text-stone-800">
                  <span>Total</span>
                  <span>{cartTotal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span>
                </div>
                {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
                <button onClick={finalizarPedido} disabled={loading}
                  className="w-full mt-4 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-60 text-white py-2.5 rounded-lg text-sm font-bold transition-colors">
                  {loading ? "Finalizando..." : "Finalizar Pedido"}
                </button>
                <Link href="/" className="block text-center mt-2 text-xs text-stone-400 hover:text-stone-600 transition-colors">
                  Continuar comprando
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}