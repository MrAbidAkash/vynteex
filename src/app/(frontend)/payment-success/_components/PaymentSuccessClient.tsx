/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useSearchParams } from 'next/navigation'
import { CheckCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
// import { useEffect } from 'react'
// import { getPayload } from '@/lib/payload'

export default function PaymentSuccess() {
  const searchParams = useSearchParams()

  const paymentID = searchParams.get('paymentID')

  const [paymentData, setPaymentData] = useState<any>(null)

  const status = paymentData?.transactionStatus
  const trxID = paymentData?.trxID

  useEffect(() => {
    ;(async () => {
      try {
        const payment = await fetch(`/getPaymentInfo?paymentID=${paymentID}`)
        const paymentData = await payment.json()
        setPaymentData(paymentData)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [paymentID])

  console.log('payment', paymentData)

  // Normally these should come from DB
  const customer = paymentData?.customerInfo

  const product = {
    name: paymentData?.productInfo?.label,
    qty: 1,
    paid: paymentData?.amount,
    price: paymentData?.productInfo?.price,
  }

  if (!paymentID) {
    return <h2>invalid page</h2>
  }
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center px-3 py-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-black text-white text-center py-8">
          <div className="flex justify-center mb-3">
            <CheckCircle size={56} className="text-green-400" />
          </div>
          <h1 className="text-2xl font-semibold">Purchase Completed</h1>
          <p className="text-sm text-gray-300 mt-1">
            Thank you for choosing us — your purchase has been confirmed
          </p>
        </div>

        {/* Content */}
        <div className="p-5 space-y-6">
          {/* Customer Info */}
          <section>
            <h2 className="font-semibold text-lg border-l-4 border-yellow-400 pl-3 mb-3">
              Customer Information
            </h2>

            <div className="text-sm text-gray-700 space-y-1">
              <p>
                <span className="font-medium">Name:</span> {customer?.name}
              </p>
              <p>
                <span className="font-medium">Phone:</span> {customer?.phone}
              </p>
              <p>
                <span className="font-medium">Address:</span> {customer?.address}
              </p>
            </div>
          </section>

          {/* Summary */}
          <section>
            <h2 className="font-semibold text-lg border-l-4 border-yellow-400 pl-3 mb-3">
              Purchase Summary
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border px-2 py-1 text-left">#</th>
                    <th className="border px-2 py-1 text-left">Product</th>
                    <th className="border px-2 py-1 text-center">Qty</th>
                    <th className="border px-2 py-1 text-right">Price (৳)</th>
                    <th className="border px-2 py-1 text-right">Paid (৳)</th>
                    {/* <th className="border px-2 py-1 text-right">Due (৳)</th> */}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border px-2 py-2">1</td>
                    <td className="border px-2 py-2">{product?.name}</td>
                    <td className="border px-2 py-2 text-center">{product?.qty}</td>
                    <td className="border px-2 py-2 text-right">{product?.price}</td>
                    <td className="border px-2 py-2 text-right">{product?.paid}</td>

                    {/* <td className="border px-2 py-2 text-right">
                      {product?.price - product?.paid}
                    </td> */}
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Payment Info */}
          <section className="bg-green-50 rounded-lg p-4 text-sm">
            <p>
              <span className="font-medium">Payment Status:</span>{' '}
              <span className="text-green-600 font-semibold capitalize">{status}</span>
            </p>
            <p className="mt-1 break-all">
              <span className="font-medium">Transaction ID:</span> {trxID}
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
