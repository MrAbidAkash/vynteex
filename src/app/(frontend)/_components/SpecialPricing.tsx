'use client'

import { useEffect, useState } from 'react'

export default function SpecialPricing({ page }: { page: any }) {
  useEffect(() => {
    console.log(page?.specialPricing)
  }, [page])

  const [time, setTime] = useState({
    days: 2,
    hours: 23,
    minutes: 58,
    seconds: 20,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((t) => ({
        ...t,
        seconds: t.seconds > 0 ? t.seconds - 1 : 59,
      }))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="text-center py-10 w-full mx-auto">
      <h2 className="text-5xl font-serif font-playfair font-semibold mb-3">Special Pricing</h2>
      <p className="text-md text-(--secondary) mb-4">Limited Time Offer</p>

      <div className="mt-8 gap-3  bg-[linear-gradient(135deg,var(--danger),#ff6b6b)] text-white px-6 py-6 rounded-xl md:w-[600px] max-sm:mx-2 flex flex-col items-center mx-auto shadow-[0_20px_50px_rgba(0,0,0,0.25)]">
        <h2 className="text-3xl font-seibold font-playfair">⏳ Offer Ends In</h2>

        <div className="flex gap-3 text-xl items-center">
          {Object.entries(time).map(([k, v]) => (
            <div
              key={k}
              className="flex flex-col items-center gap-2 bg-white/20 py-4 px-5 rounded-xl"
            >
              <div className="text-3xl font-bold">{v}</div>
              <div className="text-[10px] uppercase ">{k}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
