/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState } from 'react'

// const variants = [
//   { id: 'turtleneck_black_single', label: 'Black – Single', price: 1200 },
//   { id: 'turtleneck_white_single', label: 'Black – Combo 2', price: 2000 },
//   { id: 'turtleneck_black_combo_3', label: 'Black – Combo 3', price: 2500 },
//   { id: 'turtleneck_white_single', label: 'White – Single', price: 1200 },
//   { id: 'turtleneck_white_combo_2', label: 'White – Combo 2', price: 2000 },
//   { id: 'turtleneck_white_combo_3', label: 'White – Combo 3', price: 2500 },
// ]

const sizes = ['S', 'M', 'L', 'XL', 'XXL']

export default function ProductCheckout({ page }: { page: any }) {
  const data = page?.pricing

  console.log(data)

  const [variant, setVariant] = useState(data[0])
  console.log(variant)
  const [payment, setPayment] = useState<'partial' | 'full'>('partial')
  const DELIVERY_CHARGE = 50
  const total = payment === 'full' ? variant.price + DELIVERY_CHARGE : DELIVERY_CHARGE
  const [loading, setLoading] = useState(false)

  // Replace with your actual backend base URL
  // const baseUriBackend = 'https://your-backend-domain.com'

  // Fetch auth token from cookies or your auth state
  // Just example, replace with your real auth token retrieval
  const token = 'user-auth-token'

  const handlePurchase = async () => {
    setLoading(true)

    try {
      const response = await fetch(`/api/bkash/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token, // your auth token if needed
        },
        body: JSON.stringify({
          amount: total,
          callbackURL: `/api/bkash/callback`,
          payerReference: payment === 'full' ? 'full' : 'partial',
          pricingId: variant.pricingId,
          size: variant.size,
        }),
      })

      const data = await response.json()

      if (data.success && data.data?.bkashURL) {
        // Redirect to bKash payment gateway
        window.location.href = data.data.bkashURL
      } else {
        alert('Failed to initiate bKash payment: ' + JSON.stringify(data.error || data))
      }
    } catch (error) {
      console.error('Error initiating bKash payment:', error)
      alert('Something went wrong while processing payment.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-[95%] pb-10 bg-white mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10 px-6 borer rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.25)] overflow-hidden">
      {/* LEFT */}
      <div className="lg:col-span-2 space-y-10 py-3">
        {/* Variants */}
        <section>
          <h2 className="text-3xl font-semibold mb-4 pt-5.5">Select Your Product</h2>
          <div className="space-y-3">
            {data.map((v: any) => (
              <label key={v.id} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="variant"
                  checked={variant.id === v.id}
                  onChange={() => setVariant(v)}
                />
                <span className="flex-1">{v.label}</span>
                <span className="font-medium">৳{v.price}</span>
              </label>
            ))}
          </div>
        </section>

        {/* Sizes */}
        <section>
          <h2 className="text-xl font-semibold mb-3">Select Size</h2>
          <select
            value={variant.size || variant.sizes?.[0].size}
            onChange={(e) => setVariant({ ...variant, size: e.target.value })}
            className="w-full border rounded p-3 h40"
          >
            {variant.sizes?.map((s: any) => (
              <option key={s.size} value={s.size}>
                {s.size}
              </option>
            ))}
          </select>
          <p className="text-sm text-gray-500 mt-1">
            Hold Ctrl (Windows) or Cmd (Mac) to select multiple sizes
          </p>
        </section>

        {/* Delivery Info */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Enter Your Delivery Information</h2>
          <label className="font-semibold" htmlFor="name">
            Your Full Name
          </label>
          <input
            id="name"
            className="w-full border rounded p-3 mt-2"
            placeholder="Enter Your Full Name"
          />
          <label className="font-semibold" htmlFor="address">
            Delivery Address
          </label>

          <input
            id="address"
            className="w-full border rounded p-3 mt-2"
            placeholder="House, Road, Area, District"
          />

          <label className="font-semibold" htmlFor="mobile">
            Mobile Number
          </label>
          <input
            id="mobile"
            className="w-full border rounded p-3 mt-2"
            placeholder="Enter 11-digit Mobile Number"
          />
        </section>
      </div>

      {/* RIGHT */}
      <div className="border-l border-gray-200">
        <aside className="sticky top-6 rounded-lg pb-6 ml-6 pt-3 space-y-6 h-fit">
          <div className="space-y-2">
            <h3 className="font-semibold mb-3 text-2xl pt-5">Purchase Summary</h3>
            <div className="flex justify-between mb-2">
              <span>Product</span>
              <span>Subtotal</span>
            </div>
            <div className="flex justify-between">
              <span>{variant.label}</span>
              <span>৳{variant.price}</span>
            </div>

            <hr className="my-3" />
            <div className="flex justify-between ">
              <span>Subtotal</span>
              <span>৳{variant.price}</span>
            </div>
            <div className="flex justify-between font-sembold">
              <span>Steadfast Parcel Payment</span>
              <span>৳{DELIVERY_CHARGE}</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>৳{total}</span>
            </div>
          </div>

          {/* COD */}
          <div className="bg-gray-50 p-4 rounded">
            <h4 className="font-semibold text-lg">Cash on Delivery</h4>
            <p className="text-sm text-gray-600 leading-relaxed mt-2">
              Pay after receiving the product. COD charge may vary based on location.
            </p>
          </div>

          {/* Payment Method */}
          <div>
            <p className="font-medium mb-2">Payment Method</p>
            <div className="flex border rounded overflow-hidden">
              <button
                onClick={() => setPayment('partial')}
                className={`flex-1 py-2 ${payment === 'partial' ? 'bg-blue-600 text-white' : ''}`}
              >
                Advance Delivery Charge
              </button>
              <button
                onClick={() => setPayment('full')}
                className={`flex-1 py-2 ${payment === 'full' ? 'bg-blue-600 text-white' : ''}`}
              >
                Full Advance Payment
              </button>
            </div>
          </div>

          <button
            onClick={handlePurchase}
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded text-lg"
          >
            {loading ? 'Processing...' : `Place Purchase — ৳${total}`}
          </button>
        </aside>
      </div>
    </div>
  )
}
