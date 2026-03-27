"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type ProductType = "eletronico" | "perecivel" | "comum";

export interface Product {
  id: number;
  id_produto?: number;
  nome: string;
  preco: number;
  estoque: number;
  tipo: ProductType;
  voltagem?: string;
  dataValidade?: string;
}

export interface CartItem {
  product: Product;
  qty: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  removeAllFromCart: (productId: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  estoqueDisponivel: (product: Product) => number;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const cartCount = cart.reduce((acc, i) => acc + i.qty, 0);
  const cartTotal = cart.reduce((acc, i) => acc + i.product.preco * i.qty, 0);

  function estoqueDisponivel(product: Product) {
    const inCart = cart.find((i) => i.product.id === product.id);
    return product.estoque - (inCart?.qty ?? 0);
  }

  function addToCart(product: Product) {
    if (estoqueDisponivel(product) <= 0) return;
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) return prev.map((i) => i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { product, qty: 1 }];
    });
  }

  function removeFromCart(productId: number) {
    setCart((prev) =>
      prev.map((i) => i.product.id === productId ? { ...i, qty: i.qty - 1 } : i).filter((i) => i.qty > 0)
    );
  }

  function removeAllFromCart(productId: number) {
    setCart((prev) => prev.filter((i) => i.product.id !== productId));
  }

  function clearCart() {
    setCart([]);
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, removeAllFromCart, clearCart, cartCount, cartTotal, estoqueDisponivel }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}