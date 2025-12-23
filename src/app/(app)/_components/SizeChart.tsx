export default function SizeChart() {
  return (
    <section className="px-6 py-12">
      <h3 className="text-xl font-serif text-center mb-6">Size Chart</h3>

      <table className="w-full text-sm border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Size</th>
            <th className="border p-2">Chest</th>
            <th className="border p-2">Length</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border p-2">M</td>
            <td className="border p-2">38&quot;</td>
            <td className="border p-2">27&quot;</td>
          </tr>
          <tr>
            <td className="border p-2">L</td>
            <td className="border p-2">40&quot;</td>
            <td className="border p-2">28&quot;</td>
          </tr>
          <tr>
            <td className="border p-2">XL</td>
            <td className="border p-2">42&quot;</td>
            <td className="border p-2">29&quot;</td>
          </tr>
        </tbody>
      </table>
    </section>
  )
}
