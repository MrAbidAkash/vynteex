export default function OrderSection() {
  return (
    <section className="px-6 py-12 grid gap-6">
      <div className="bg-white p-4 rounded-xl shadow">
        <h4 className="font-semibold mb-4">Enter Delivery Information</h4>
        <input className="input" placeholder="Full Name" />
        <input className="input" placeholder="Address" />
        <input className="input" placeholder="Mobile Number" />
      </div>
    </section>
  )
}
