export default function FeatureCard({
  title,
  description
}) {

  return (

    <div className="
      bg-white
      p-6
      rounded-2xl
      shadow-lg
      hover:shadow-2xl
      hover:-translate-y-2
      transition-all
      duration-300
    ">

      <h2 className="
        text-2xl
        font-bold
        mb-4
        text-gray-800
      ">

        {title}

      </h2>

      <p className="
        text-gray-600
      ">

        {description}

      </p>

    </div>

  )

}