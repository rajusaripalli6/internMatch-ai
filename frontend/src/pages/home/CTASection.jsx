import { Link }
from "react-router-dom"

export default function CTASection() {

  return (

    <section className="
      py-20
      bg-black
      text-white
    ">

      <div className="
        max-w-4xl
        mx-auto
        text-center
        px-6
      ">

        <h2 className="
          text-5xl
          font-bold
          mb-6
        ">

          Ready To Start
          Your Career?

        </h2>

        <p className="
          text-xl
          text-gray-300
          mb-8
        ">

          Join InternMatch AI today
          and discover internships
          tailored to your skills.

        </p>

        <Link
          to="/register"
        >

          <button className="
            bg-white
            text-black
            px-8
            py-4
            rounded-xl
            font-bold
            hover:bg-gray-200
            transition
          ">

            Get Started

          </button>

        </Link>

      </div>

    </section>

  )

}