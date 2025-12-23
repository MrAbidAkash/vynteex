'use client'

import { useEffect, useState } from 'react'

export default function SpecialPricing() {
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
      <h2 className="text-5xl font-serif">Special Pricing</h2>
      <p className="text-lg text-gray-500 mb-4">Limited Time Offer</p>

      <div className=" gap-3  bg-red-500/90 text-white px-6 py-6 rounded-xl w-[600px] flex flex-col items-center mx-auto">
        <h2 className="text-3xl">⏳ Offer Ends In</h2>

        <div className="flex gap-3 text-xl items-center">
          {Object.entries(time).map(([k, v]) => (
            <div key={k} className="flex flex-col items-center gap-2 bg-white/20 py-4 px-5 rounded-xl">
              <div className="text-3xl font-bold">{v}</div>
              <div className="text-[10px] uppercase ">{k}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
