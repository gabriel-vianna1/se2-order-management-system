"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const pathname = usePathname();
  const { cartCount } = useCart();

  const links = [
    { href: "/", label: "Produtos" },
    { href: "/orders", label: "Pedidos" },
  ];

  return (
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
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                pathname === link.href
                  ? "text-stone-800 border-b-2 border-stone-800 pb-0.5"
                  : "text-stone-500 hover:text-stone-800"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/cart"
            className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              pathname === "/cart"
                ? "bg-stone-700 text-white"
                : "bg-stone-800 text-white hover:bg-stone-700"
            }`}
          >
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
  );
}