/* eslint-disable @next/next/no-img-element */
'use client'

import React, { useState, useEffect } from 'react'

export default function HeroSlider({ page }: { page: any }) {
  const images = page?.hero?.mainImage || []
  const [current, setCurrent] = useState(0)

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  useEffect(() => {
    if (images.length === 0) return

    const interval = setInterval(() => {
      nextSlide()
    }, 4000)

    return () => clearInterval(interval)
  }, [images.length])

  return (
    <section className="flex justify-center py-12 mb-14 w-full">
      <div className="relative w-[600px] h-[600px] rounded-xl overflow-hidden shadow-lg mt-8">
        <div
          className="flex transition-transform duration-700 ease-in-out h-full"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {images.map((img: any, idx: number) => (
            <div key={idx} className="min-w-full h-full relative">
              {/* Using <img> because Next.js Image with fill inside flex can be tricky */}
              <img
                src={img.url}
                alt={img.alt || `Slide ${idx + 1}`}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          ))}
        </div>

        {/* Previous Button */}
        <button
          onClick={prevSlide}
          aria-label="Previous Slide"
          className="absolute top-1/2 left-2 z-30 flex items-center justify-center h-10 w-10 -translate-y-1/2 cursor-pointer rounded-full bg-transparent hover:bg-white/20 focus:outline-none"
        >
          <svg
            className="w-6 h-6 text-gray-500 hover:text-white transition-colors"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m15 19-7-7 7-7" />
          </svg>
        </button>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          aria-label="Next Slide"
          className="absolute top-1/2 right-2 z-30 flex items-center justify-center h-10 w-10 -translate-y-1/2 cursor-pointer rounded-full bg-transparent hover:bg-white/20 focus:outline-none"
        >
          <svg
            className="w-6 h-6 text-gray-500 hover:text-white transition-colors"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m9 5 7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  )
}
