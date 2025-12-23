import type { Metadata } from 'next'
import LandingPage from '../_components/LandingPage'

type PageProps = {
  params: Promise<{
    slug: string
  }>
}

async function getProductLanding(slug?: string) {
  if (!slug || slug.includes('.')) return null

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/product-landing?depth=2&where[slug][equals]=${slug}`,
    { cache: 'no-store' },
  )

  if (!res.ok) return null

  const json = await res.json()
  return json?.docs?.[0] ?? null
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const page = await getProductLanding(slug)

  if (!page) return {}

  return {
    title: page.seo?.metaTitle ?? page.productName,
    description: page.seo?.metaDescription,
  }
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  const page = await getProductLanding(slug)

  if (!page) return <div>Not found</div>

  // return (
  //   <main className="px-8 py-12">jii
  //     <h1>{page.hero?.title}</h1>
  //     <p>{page.hero?.subtitle}</p>
  //     <p>Offer ends: {format(new Date(page.offerEnd), 'PPP')}</p>
  //   </main>
  // )
  return (
    <main className="px-8 py-12">
      <LandingPage page={page} />
    </main>
  )
}
