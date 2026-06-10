import FeatureCard from "../cards/FeatureCard"

export default function FeaturesSection() {

  const features = [
    {
      title: "AI Recommendations",
      description:
        "Get internships matched to your skills and interests.",
    },

    {
      title: "Resume Analysis",
      description:
        "Analyze resumes and improve ATS scores.",
    },

    {
      title: "Career Insights",
      description:
        "Discover missing skills and career growth paths.",
    },
  ]

  return (
    <section className="py-20 bg-gray-200">

      <div className="max-w-6xl mx-auto px-6">

        <h1 className="text-4xl font-bold text-center mb-14">
          Platform Features
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
            />
          ))}

        </div>

      </div>

    </section>
  )
}