import FeatureCard from "../cards/FeatureCard"

export default function FeaturesSection() {

  const features = [

  {
    title: "AI Skill Matching",
    description:
      "Get internship recommendations based on your skills and resume.",
  },

  {
    title: "Resume Upload",
    description:
      "Upload your resume and automatically extract relevant skills.",
  },

  {
    title: "Application Tracking",
    description:
      "Track pending, accepted, and rejected internship applications.",
  },

  {
    title: "Smart Internship Search",
    description:
      "Search and filter internships by company, location, and skills.",
  },

  {
    title: "Recruiter Dashboard",
    description:
      "Recruiters can create internships and manage applicants efficiently.",
  },

  {
    title: "One-Click Apply",
    description:
      "Apply directly from internship listings or detailed internship pages.",
  },

]
  return (
    <section className="py-20 bg-gray-200">

      <div className="max-w-6xl mx-auto px-6">

        <h1 className="text-4xl font-bold text-center mb-14">
          Platform Features
        </h1>

        <div className="
              grid
              grid-cols-1
              md:grid-cols-2
              lg:grid-cols-3
              gap-8
            ">

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