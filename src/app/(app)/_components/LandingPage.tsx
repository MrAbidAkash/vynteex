import CTASection from './CTASection'
import Features from './Features'
import HeroSlider from './HeroSlider'
import LuxurySection from './LuxurySection'
import OrderSection from './OrderSection'
import ParcelInfo from './ParcelInfo'
import PricingCards from './PricingCards'
import SizeChart from './SizeChart'
import SpecialPricing from './SpecialPricing'

const LandingPage = ({ page }: { page: any }) => {
  return (
    <div className="max-w-[82.5rem] w-full flex flex-col justify-center items-center mx-auto">
      <HeroSlider page={page} />
      <SpecialPricing />
      <PricingCards />
      <CTASection />
      <LuxurySection />
      <SizeChart />
      <CTASection />
      <Features />
      <ParcelInfo />
      <OrderSection />
      {/* <Footer /> */}
    </div>
  )
}

export default LandingPage
