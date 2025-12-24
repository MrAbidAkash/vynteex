/* eslint-disable @typescript-eslint/no-explicit-any */
import CTASection from './CTASection'
import Features from './Features'
import HeroSlider from './HeroSlider'
import LuxurySection from './LuxurySection'
import ParcelInfo from './ParcelInfo'
import PricingCards from './PricingCards'
import ProductCheckout from './ProductCheckout'
import SizeChart from './SizeChart'
import SpecialPricing from './SpecialPricing'

const LandingPage = ({ page }: { page: any }) => {
  return (
    <div className="max-w-330 w-full flex flex-col justify-center items-center mx-auto">
      <HeroSlider page={page} />
      <SpecialPricing />
      <PricingCards />
      <CTASection />
      <LuxurySection />
      <SizeChart />
      <CTASection />
      <Features />
      <ParcelInfo />
      <ProductCheckout />
      {/* <Footer /> */}
    </div>
  )
}

export default LandingPage
