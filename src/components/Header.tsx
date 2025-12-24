"use client"

import Link from "next/link";

// components/Header.tsx
export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white sadow-sm  max-w-[82.5rem] mx-auto">
      <h1 className="text-2xl font-semibold tracking-widest">CLASSIC PREMIUM</h1>
      <button className="bg-black text-white px-4 py-2 rounded-full text-xl">Buy Now</button>
    </header>
  )
}
