export default function PricingCards() {
  return (
    <section className="grid grid-cols-3 justify-center gap-4 px-6 w-full">
      <PriceCard value="Single" title="Premium Turtleneck" price="৳1200" offerPrice="৳1000" />
      <PriceCard
        value="Best Value"
        title="2 Piece Combo"
        price="৳2000"
        offerPrice="৳1800"
        highlight
      />
      <PriceCard value="Combo 3" title="Combo 3" price="৳2500" offerPrice="৳2200" />
    </section>
  )
}

function PriceCard({
  value,
  title,
    price,
  offerPrice,
  highlight,
}: {
  value: string
  title: string
  price?: string
  offerPrice?: string
  highlight?: boolean
}) {
  return (
    <div
      className={` p-4 rounded-xl text-center shadow-lg flex flex-col justify-center items-center w-full p-10 ${
        highlight ? 'bg-[#b59a5a] text-white' : 'bg-white'
      }`}
    >
      <p className="text-xl font-semibold bg-amber-500 p-3 px-5 rounded-full mb-3">{value}</p>
      <p className="text-2xl font-semibold">{title}</p>
      <p className="text-lg font-bold mt-2">{price}</p>
      <p className="text-4xl font-bold mt-2 linethrough">{offerPrice}</p>
    </div>
  )
}
