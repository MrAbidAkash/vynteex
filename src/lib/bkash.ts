import { getPayload } from './payload'

const SANDBOX = false
const BASE_URL = SANDBOX
  ? 'https://tokenized.sandbox.bka.sh/v1.2.0-beta'
  : 'https://tokenized.pay.bka.sh/v1.2.0-beta'

export async function grantToken() {
  console.log('bkash:grant:start')

  const payload = await getPayload()

  const existing = await payload.find({
    collection: 'bkash-tokens',
    limit: 1,
  })
  console.log('bkash:grant:start 2')

  const tokenDoc = existing.docs[0]

  // ✅ reuse token if not expired
  if (tokenDoc && new Date(tokenDoc.expiresIn) > new Date()) {
    console.log('bkash:grant:reuse')
    return tokenDoc.accessToken
  }

  console.log('bkash:grant:new-token')

  const resp = await fetch(`${BASE_URL}/tokenized/checkout/token/grant`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      username: process.env.BK_USERNAME!,
      password: process.env.BK_PASSWORD!,
      'x-app-key': process.env.BK_APP_KEY!,
    },
    body: JSON.stringify({
      app_key: process.env.BK_APP_KEY,
      app_secret: process.env.BK_APP_SECRET,
    }),
  })

  const data = await resp.json()


  if (!data.id_token || !data.refresh_token) {
    console.error('bKash token error:', data)
    throw new Error('Failed to grant bKash token')
  }

  // ⏱ expiresIn from bKash is seconds
  const expiresAt = new Date(
    Date.now() + (data.expires_in - 60) * 1000, // 1 min buffer
  )

  // 🧹 clean old token
  await payload.delete({
    collection: 'bkash-tokens',
    where: {},
  })

  // 💾 save new token
  await payload.create({
    collection: 'bkash-tokens',
    data: {
      accessToken: data.id_token,
      refreshToken: data.refresh_token,
      expiresIn: expiresAt,
    },
  })

  return data.id_token
}
