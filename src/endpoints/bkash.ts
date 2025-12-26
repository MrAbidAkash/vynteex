/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Endpoint } from 'payload'
import { grantToken } from '../lib/bkash'
import { getPayload } from '@/lib/payload'

export const createPayment: Endpoint = {
  path: '/bkash/create',
  method: 'post',
  handler: async (req: any) => {
    console.log('hi_1')

    // console.log('body:', await req.json())

    const payload = await getPayload()

    const payloadData = await req.json()

    const { amount, callbackURL, payerReference, pricingId } = payloadData

    console.log('hi_2 :', payloadData)

    const idToken = await grantToken()

    console.log('token res', idToken)

    const resp = await fetch('https://tokenized.pay.bka.sh/v1.2.0-beta/tokenized/checkout/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: idToken,
        'x-app-key': process.env.BK_APP_KEY!,
      },
      body: JSON.stringify({
        mode: '0011',
        amount: amount.toString(),
        currency: 'BDT',
        intent: 'sale',
        merchantInvoiceNumber: `INV_${Date.now()}`,
        callbackURL,
        payerReference: payerReference || '',
      }),
    })

    const data = await resp.json()

    console.log('data', data)

    if (data?.statusMessage !== 'Successful') {
      return Response.json({
        error: data?.message,
      })
    }

    console.log('daaoo', data)

    const payment = await payload.create({
      collection: 'bkash-payments',
      data: {
        paymentID: data.paymentID,
        product: '694c043b3c39fea58629ca3a',
        amount: data.amount,
        transactionStatus: data.transactionStatus || 'Pending',
        pricingId,
      },
    })

    console.log('resp', payment)

    return Response.json(data)
  },
}

export const executePayment: Endpoint = {
  path: '/bkash/execute',
  method: 'post',
  handler: async (req: any) => {
    const { paymentID } = req.body
    const idToken = await grantToken()

    const resp = await fetch(
      'https://tokenized.pay.bka.sh/v1.2.0-beta/tokenized/checkout/execute',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: idToken,
          'x-app-key': process.env.BK_APP_KEY!,
        },
        body: JSON.stringify({ paymentID }),
      },
    )

    const data = await resp.json()

    await payload.update({
      collection: 'bkash-payments',
      where: { paymentID: { equals: paymentID } },
      data: {
        transactionStatus: data.transactionStatus,
        trxID: data.trxID,
      },
    })

    return Response.json(data)
  },
}
