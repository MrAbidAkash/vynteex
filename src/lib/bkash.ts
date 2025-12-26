import payload from 'payload'

const SANDBOX = false
const BASE_URL = SANDBOX
  ? 'https://tokenized.sandbox.bka.sh/v1.2.0-beta'
  : 'https://tokenized.pay.bka.sh/v1.2.0-beta'

export async function grantToken() {
  const existing = await payload.find({
    collection: 'bkash-tokens',
    limit: 1,
  })

  if (existing.docs[0] && new Date(existing.docs[0].expiresAt) > new Date()) {
    return existing.docs[0].id_token
  }

  const resp = await fetch(`${BASE_URL}/tokenized/checkout/token/grant`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      username: process.env.BK_USERNAME,
      password: process.env.BK_PASSWORD,
      'x-app-key': process.env.BK_APP_KEY,
    },
    body: JSON.stringify({
      app_key: process.env.BK_APP_KEY,
      app_secret: process.env.BK_APP_SECRET,
    }),
  })

  const data = await resp.json()
  const expiresAt = new Date(Date.now() + (data.expires_in - 60) * 1000)

  await payload.delete({ collection: 'bkash-tokens', where: {} })

  await payload.create({
    collection: 'bkash-tokens',
    data: {
      id_token: data.id_token,
      refresh_token: data.refresh_token,
      expiresAt: expiresAt.toISOString(),
    },
  })

  return data.id_token
}
