import buildConfig from '@/payload.config'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { getPayload } from 'payload'
import LandingPage from './_components/LandingPage'

const page = async () => {
  await mongooseAdapter({ url: process.env.DATABASE_URL || '' })
  const payload = await getPayload({ config: buildConfig })

  const page = await payload.find({
    collection: 'product-landing',
  })

  //   console.log('page.docs', page)

  return (
    <div>
      <LandingPage page={page.docs[0]} />
    </div>
  )
}

export default page
