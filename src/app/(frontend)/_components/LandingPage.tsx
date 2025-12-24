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
    <div>
      <div className="bg-[#f8f6f3]">
        <div className="max-w-330 w-full flex flex-col justify-center items-center mx-auto">
          <HeroSlider page={page} />
          <SpecialPricing />
          <PricingCards />
          <CTASection />
          {/* <Footer /> */}
        </div>
      </div>
      <div className="bg-[linear-gradient(135deg,#ffffff,#f8f6f3)]">
        <div className="max-w-330 w-full flex flex-col justify-center items-center mx-auto">
          <LuxurySection />

          {/* <Footer /> */}
        </div>
      </div>
      <div className="b-(--light)">
        <div className="max-w-330 w-full flex flex-col justify-center items-center mx-auto">
          <SizeChart />
        </div>
      </div>
      <div className="bg-(--light)">
        <div className="max-w-330 w-full flex flex-col justify-center items-center mx-auto">
          <CTASection />
        </div>
      </div>
      <div className="max-w-330 w-full flex flex-col justify-center items-center mx-auto bg-white">
        <Features />

        {/* <Footer /> */}
      </div>
      <div className="bg-(--light)">
        <div className="max-w-330 w-full flex flex-col justify-center items-center mx-auto">
          <ParcelInfo />
          <div className="px-5 pb-20">
            <ProductCheckout />{' '}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
