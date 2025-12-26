/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Endpoint } from 'payload'
import payload from 'payload'
import { grantToken } from '../lib/bkash'

export const createPayment: Endpoint = {
  path: '/bkash/create',
  method: 'post',
  handler: async (req: any) => {
    if (!req.user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { amount, callbackURL } = req.body
    const idToken = await grantToken()

    const resp = await fetch('https://tokenized.pay.bka.sh/v1.2.0-beta/tokenized/checkout/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
      }),
    })

    const data = await resp.json()

    await payload.create({
      collection: 'bkash-payments',
      data: {
        paymentID: data.paymentID,
        amount,
        transactionStatus: 'Pending',
        user: req.user.id,
      },
    })

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
