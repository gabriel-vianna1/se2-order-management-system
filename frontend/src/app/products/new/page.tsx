"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "../../../components/Navbar";
import { criarProduto, criarEletronico, criarPerecivel } from "../../../services/productService";

type ProductType = "comum" | "eletronico" | "perecivel";

export default function NewProductPage() {
  const router = useRouter();
  const [tipo, setTipo] = useState<ProductType>("comum");
  const [form, setForm] = useState({ nome: "", preco: "", estoque: "", voltagem: "", dataValidade: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  function validate() {
    const e: Record<string, string> = {};
    if (!form.nome.trim()) e.nome = "Nome é obrigatório";
    if (!form.preco || Number(form.preco) <= 0) e.preco = "Preço inválido";
    if (!form.estoque || Number(form.estoque) < 0) e.estoque = "Estoque inválido";
    if (tipo === "eletronico" && !form.voltagem.trim()) e.voltagem = "Voltagem é obrigatória";
    if (tipo === "perecivel" && !form.dataValidade) e.dataValidade = "Data de validade é obrigatória";
    return e;
  }

  async function handleSubmit() {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }

    setSaving(true);
    setServerError(null);
    try {
      const base = { nome: form.nome, preco: Number(form.preco), estoque: Number(form.estoque) };

      if (tipo === "eletronico") {
        await criarEletronico({ ...base, voltagem: form.voltagem });
      } else if (tipo === "perecivel") {
        await criarPerecivel({ ...base, dataValidade: form.dataValidade });
      } else {
        await criarProduto(base);
      }

      router.push("/");
    } catch (err) {
      setServerError("Erro ao salvar produto. Verifique se o backend está rodando.");
    } finally {
      setSaving(false);
    }
  }

  function field(label: string, key: string, props: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">{label}</label>
        <input
          {...props}
          value={form[key as keyof typeof form]}
          onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
          className={`w-full border rounded-lg px-4 py-2.5 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-300 transition-all ${errors[key] ? "border-red-400 bg-red-50" : "border-stone-200 bg-white"}`}
        />
        {errors[key] && <p className="text-red-500 text-xs mt-1">{errors[key]}</p>}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />
      <main className="max-w-2xl mx-auto px-6 py-10">
        <div className="mb-8 flex items-center gap-3">
          <Link href="/" className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-stone-800">Novo Produto</h1>
            <p className="text-stone-500 text-sm">Preencha os dados para cadastrar</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-stone-200 p-6 flex flex-col gap-5">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">Tipo do Produto</label>
            <div className="grid grid-cols-3 gap-2">
              {(["comum", "eletronico", "perecivel"] as ProductType[]).map((t) => (
                <button key={t} onClick={() => { setTipo(t); setErrors({}); }}
                  className={`py-2.5 rounded-lg text-sm font-medium border transition-all ${tipo === t ? "bg-stone-800 text-white border-stone-800" : "bg-white text-stone-600 border-stone-200 hover:border-stone-400"}`}>
                  {t === "comum" ? "📦 Comum" : t === "eletronico" ? "⚡ Eletrônico" : "🌿 Perecível"}
                </button>
              ))}
            </div>
          </div>

          {field("Nome", "nome", { placeholder: "Ex: Notebook Dell Inspiron" })}
          <div className="grid grid-cols-2 gap-4">
            {field("Preço (R$)", "preco", { type: "number", min: "0", step: "0.01", placeholder: "0,00" })}
            {field("Estoque", "estoque", { type: "number", min: "0", placeholder: "0" })}
          </div>
          {tipo === "eletronico" && field("Voltagem", "voltagem", { placeholder: "Ex: 110V/220V ou 5V" })}
          {tipo === "perecivel" && field("Data de Validade", "dataValidade", { type: "date" })}

          {serverError && <p className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-2">{serverError}</p>}

          <div className="flex gap-3 pt-2 border-t border-stone-100">
            <Link href="/" className="flex-1 text-center py-2.5 rounded-lg border border-stone-200 text-stone-600 text-sm font-medium hover:bg-stone-50 transition-colors">
              Cancelar
            </Link>
            <button onClick={handleSubmit} disabled={saving}
              className="flex-1 py-2.5 rounded-lg bg-stone-800 text-white text-sm font-semibold hover:bg-stone-700 disabled:opacity-60 transition-colors">
              {saving ? "Salvando..." : "Cadastrar Produto"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}