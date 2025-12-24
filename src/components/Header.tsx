'use client'

import Link from 'next/link'

// components/Header.tsx
export default function Header() {
  return (
    <div className="shadow-md sticky top-0 w-full z-99 bg-white">
      <header className="flex items-center justify-between px-2.5 py-5  -sm  max-w-330 mx-auto">
        <Link href="/" className="font-playfair text-[1.75rem] font-bold tracking-">
          CLASSIC PREMIUM
        </Link>
        <button className="bg-black text-white px-8 py-3 rounded-full text-md">Buy Now</button>
      </header>
    </div>
  )
}
