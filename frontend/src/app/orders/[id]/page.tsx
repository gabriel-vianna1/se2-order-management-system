"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../../../components/Navbar";
import { buscarPedido } from "../../../services/orderService";
import type { Pedido } from "../../../services/orderService";

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [order, setOrder] = useState<Pedido | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    buscarPedido(Number(id))
      .then(setOrder)
      .catch(() => setError("Pedido não encontrado."))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50">
        <Navbar />
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-stone-300 border-t-stone-600 rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-stone-50">
        <Navbar />
        <main className="max-w-2xl mx-auto px-6 py-20 text-center">
          <p className="text-5xl mb-4">🔍</p>
          <h1 className="text-xl font-bold text-stone-800 mb-2">Pedido não encontrado</h1>
          <Link href="/orders" className="text-stone-500 hover:text-stone-800 text-sm underline">Voltar para Pedidos</Link>
        </main>
      </div>
    );
  }

  const totalItens = order.itensPedido?.reduce((acc, i) => acc + i.quantidade, 0) ?? 0;

  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />
      <main className="max-w-2xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="mb-8 flex items-center gap-3">
          <Link href="/orders" className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-stone-800">Pedido #{order.id_pedido}</h1>
            <p className="text-stone-500 text-sm mt-0.5">
              {order.dataPedido ? new Date(order.dataPedido).toLocaleDateString("pt-BR") : "Data não disponível"}
            </p>
          </div>
        </div>

        {/* Status */}
        <div className="rounded-xl border bg-emerald-50 border-emerald-200 p-4 mb-4 flex items-center gap-3">
          <span className="w-3 h-3 rounded-full shrink-0 bg-emerald-500" />
          <div>
            <p className="font-semibold text-sm text-emerald-700">Concluído</p>
            <p className="text-stone-500 text-xs mt-0.5">Pedido finalizado com sucesso.</p>
          </div>
        </div>

        {/* Items */}
        <div className="bg-white rounded-xl border border-stone-200 overflow-hidden mb-4">
          <div className="px-5 py-3 border-b border-stone-100 bg-stone-50">
            <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide">Itens do Pedido</p>
          </div>
          <div className="divide-y divide-stone-100">
            {order.itensPedido && order.itensPedido.length > 0 ? (
              order.itensPedido.map((item, idx) => (
                <div key={idx} className="px-5 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-stone-100 rounded-lg flex items-center justify-center text-lg shrink-0">
                      📦
                    </div>
                    <div>
                      <p className="text-stone-800 font-medium text-sm">{item.produto?.nome}</p>
                      <p className="text-stone-400 text-xs mt-0.5">Quantidade: {item.quantidade}</p>
                    </div>
                  </div>
                  <p className="font-bold text-stone-800 text-sm">
                    {item.valorItem.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                  </p>
                </div>
              ))
            ) : (
              <div className="px-5 py-8 text-center text-stone-400 text-sm">Nenhum item registrado.</div>
            )}
          </div>
        </div>

        {/* Total */}
        <div className="bg-white rounded-xl border border-stone-200 p-5">
          <div className="flex justify-between items-center text-sm text-stone-500 mb-2">
            <span>Subtotal ({totalItens} {totalItens === 1 ? "item" : "itens"})</span>
            <span>{order.valorTotal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span>
          </div>
          <div className="flex justify-between items-center font-bold text-stone-800 text-lg pt-2 border-t border-stone-100">
            <span>Total</span>
            <span>{order.valorTotal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex gap-3">
          <Link href="/orders" className="flex-1 text-center py-2.5 rounded-lg border border-stone-200 text-stone-600 text-sm font-medium hover:bg-stone-50 transition-colors">
            Voltar para Pedidos
          </Link>
          <Link href="/" className="flex-1 text-center py-2.5 rounded-lg bg-stone-800 text-white text-sm font-semibold hover:bg-stone-700 transition-colors">
            Fazer novo pedido
          </Link>
        </div>
      </main>
    </div>
  );
}