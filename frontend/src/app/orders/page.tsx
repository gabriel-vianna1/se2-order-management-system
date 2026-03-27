"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import { listarPedidos } from "../../services/orderService";
import type { Pedido } from "../../services/orderService";

const statusConfig = {
  pendente:  { label: "Pendente",  bg: "bg-amber-50",   text: "text-amber-700",  border: "border-amber-200",  dot: "bg-amber-400" },
  concluido: { label: "Concluído", bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", dot: "bg-emerald-500" },
  cancelado: { label: "Cancelado", bg: "bg-red-50",     text: "text-red-600",    border: "border-red-200",    dot: "bg-red-400" },
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<number | null>(null);

  useEffect(() => {
    listarPedidos()
      .then(setOrders)
      .catch(() => setError("Não foi possível carregar os pedidos."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />
      <main className="max-w-4xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-stone-800">Pedidos</h1>
          <p className="text-stone-500 text-sm mt-1">{orders.length} pedido{orders.length !== 1 ? "s" : ""} registrado{orders.length !== 1 ? "s" : ""}</p>
        </div>

        {loading && (
          <div className="text-center py-20 text-stone-400">
            <div className="w-8 h-8 border-2 border-stone-300 border-t-stone-600 rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm">Carregando pedidos...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-center">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {!loading && !error && orders.length === 0 && (
          <div className="bg-white rounded-xl border border-stone-200 p-20 text-center">
            <p className="text-stone-400 text-4xl mb-4">📋</p>
            <p className="text-stone-500 font-medium mb-4">Nenhum pedido ainda</p>
            <Link href="/" className="bg-stone-800 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-stone-700 transition-colors">
              Fazer meu primeiro pedido
            </Link>
          </div>
        )}

        {!loading && !error && orders.length > 0 && (
          <div className="flex flex-col gap-3">
            {orders.map((order) => {
              // Backend não tem status ainda, usa "concluido" como padrão
              const status = "concluido" as keyof typeof statusConfig;
              const st = statusConfig[status];
              const isOpen = expanded === order.id_pedido;

              return (
                <div key={order.id_pedido} className="bg-white rounded-xl border border-stone-200 overflow-hidden">
                  <button
                    onClick={() => setExpanded(isOpen ? null : order.id_pedido!)}
                    className="w-full px-5 py-4 flex items-center justify-between hover:bg-stone-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-left">
                        <p className="font-bold text-stone-800 text-sm">Pedido #{order.id_pedido}</p>
                        <p className="text-stone-400 text-xs mt-0.5">
                          {order.dataPedido ? new Date(order.dataPedido).toLocaleDateString("pt-BR") : "—"}
                        </p>
                      </div>
                      <span className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${st.bg} ${st.text} ${st.border}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
                        {st.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-bold text-stone-800">
                        {order.valorTotal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                      </span>
                      <Link
                        href={`/orders/${order.id_pedido}`}
                        onClick={(e) => e.stopPropagation()}
                        className="text-xs text-stone-400 hover:text-stone-700 underline"
                      >
                        Ver detalhes
                      </Link>
                      <svg className={`w-4 h-4 text-stone-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
                        fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>

                  {isOpen && (
                    <div className="border-t border-stone-100 px-5 py-4">
                      <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-3">Itens do pedido</p>
                      {order.itensPedido && order.itensPedido.length > 0 ? (
                        <div className="flex flex-col gap-2">
                          {order.itensPedido.map((item, idx) => (
                            <div key={idx} className="flex justify-between items-center text-sm">
                              <div className="flex items-center gap-2">
                                <span className="w-5 h-5 bg-stone-100 rounded text-xs flex items-center justify-center font-bold text-stone-600">
                                  {item.quantidade}
                                </span>
                                <span className="text-stone-700">
                                  {item.produto?.nome}
                                </span>
                              </div>
                              <span className="text-stone-800 font-medium">
                                {item.valorItem.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-stone-400 text-xs">Nenhum item registrado.</p>
                      )}
                      <div className="flex justify-between mt-4 pt-3 border-t border-stone-100">
                        <span className="font-bold text-stone-800 text-sm">Total</span>
                        <span className="font-bold text-stone-800">
                          {order.valorTotal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}