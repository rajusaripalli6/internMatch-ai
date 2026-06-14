import MainLayout from "../../layouts/MainLayout"
import HeroSection from "../../components/hero/HeroSection"
import FeaturesSection from "../../components/features/FeaturesSection"
import HowItWorks
from "./HowItWorks"
import CTASection from "./CTASection"
export default function Home() {
  return (
    <MainLayout>
      <HeroSection />
      <FeaturesSection />
      <HowItWorks />
      <CTASection />
      <section className="
      py-20
      bg-white
    ">

      <div className="
        max-w-6xl
        mx-auto
        px-6
      ">

        <h2 className="
          text-4xl
          font-bold
          text-center
          mb-12
        ">

          Trusted By Students

        </h2>

    <div className="
      grid
      grid-cols-2
      md:grid-cols-4
      gap-6
    ">

      <div className="
        bg-gray-50
        p-6
        rounded-xl
        text-center
      ">

        <h3 className="
          text-4xl
          font-bold
        ">
          500+
        </h3>

        <p>
          Internships
        </p>

      </div>

      <div className="
        bg-gray-50
        p-6
        rounded-xl
        text-center
      ">

        <h3 className="
          text-4xl
          font-bold
        ">
          100+
        </h3>

        <p>
          Students
        </p>

      </div>

      <div className="
        bg-gray-50
        p-6
        rounded-xl
        text-center
      ">

        <h3 className="
          text-4xl
          font-bold
        ">
          50+
        </h3>

        <p>
          Recruiters
        </p>

      </div>

      <div className="
        bg-gray-50
        p-6
        rounded-xl
        text-center
      ">

        <h3 className="
          text-4xl
          font-bold
        ">
          AI
        </h3>

        <p>
          Matching
        </p>

      </div>

    </div>

  </div>

</section>

    </MainLayout>
  )
}