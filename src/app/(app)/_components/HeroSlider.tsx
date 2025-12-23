'use client'

import Image from 'next/image'

export default function HeroSlider({ page }: any) {
    console.log(page)
  return (
    <section className="flex justify-center py-12">
      <div className="relative w-[600px] h-[600px] rounded-xl overflow-hidden shadow-lg">
        <Image
          src={page.hero?.mainImage?.[0].url}
          alt="Premium Turtleneck"
          fill
          className="object-cover"
          priority
        />
      </div>
    </section>
  )
}
