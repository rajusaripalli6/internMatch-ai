import Button from "../common/Button"

export default function HeroSection() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center bg-gray-100">

      <div className="text-center px-6">

        <h1 className="text-6xl font-bold text-gray-900 leading-tight mb-6">
          Find Your Perfect <br />
          Internship Using AI
        </h1>

        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          InternMatch AI helps students discover internships,
          analyze resumes, and get smart career recommendations.
        </p>

        <div className="flex justify-center gap-4">

          <Button text="Get Started" />

            <Button
            text="Learn More"
            bgColor="bg-white"
            textColor="text-black"
            hoverColor="hover:bg-gray-200"
            />

        </div>

      </div>

    </section>
  )
}