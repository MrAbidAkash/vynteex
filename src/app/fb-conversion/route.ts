// app/api/conversion/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { eventName, eventId, userData, customData } = await request.json()

  // 1. Construct the event payload based on Facebook's spec
  const payload = {
    data: [
      {
        event_name: eventName, // e.g., "Purchase"
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId,
        action_source: 'website',
        event_source_url: request.headers.get('referer') || '',
        user_data: {
          client_ip_address:
            request.ip || request.headers.get('x-forwarded-for')?.split(',')[0] || '0.0.0.0',
          client_user_agent: request.headers.get('user-agent') || '',
          // **Crucially, hash sensitive user data (email, phone) before sending.**
          // em: hashData(userData.email),
          // ph: hashData(userData.phone),
          fbp: request.cookies.get('_fbp')?.value, // Read cookies if available
          fbc: request.cookies.get('_fbc')?.value,
        },
        custom_data: customData, // e.g., { currency: "USD", value: 100.00 }
      },
    ],
    // Include during testing, remove for production
    // test_event_code: "TEST12345"
  }

  const pixelId = process.env.FACEBOOK_PIXEL_ID
  const accessToken = process.env.FACEBOOK_ACCESS_TOKEN 

  // 2. Send the event to Facebook's Conversions API
  try {
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${pixelId}/events?access_token=${accessToken}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      },
    )
    const result = await response.json()
    return NextResponse.json(result)
  } catch (error) {
    console.error('CAPI Error:', error)
    return NextResponse.json({ error: 'Failed to send event' }, { status: 500 })
  }
}
