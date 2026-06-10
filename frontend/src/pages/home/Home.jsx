import MainLayout from "../../layouts/MainLayout"
import HeroSection from "../../components/hero/HeroSection"
import FeaturesSection from "../../components/features/FeaturesSection"
export default function Home() {
  return (
    <MainLayout>
      <HeroSection />
      <FeaturesSection />

      <div className="p-10 text-center">

        <h1 className="text-5xl font-bold mb-6 text-gray-800">
          Welcome to InternMatch AI
        </h1>

        <p className="text-xl text-gray-600">
          AI-powered internship recommendation platform.
        </p>

      </div>

    </MainLayout>
  )
}