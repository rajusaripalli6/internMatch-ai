import Button from "../common/Button"
import { Link } from "react-router-dom"
export default function HeroSection() {
  return (

  <section className="
    min-h-[90vh]
    flex
    items-center
    justify-center
    bg-gradient-to-br
    from-gray-50
    to-blue-50
  ">

    <div className="
      max-w-6xl
      mx-auto
      px-6
      text-center
    ">

      <span className="
        inline-block
        bg-blue-100
        text-blue-700
        px-4
        py-2
        rounded-full
        font-semibold
        mb-6
      ">

        🚀 AI-Powered Internship Platform

      </span>

      <h1 className="
        text-5xl
        md:text-7xl
        font-extrabold
        text-gray-900
        leading-tight
        mb-6
      ">

        Find Your Dream
        <br />

        Internship With AI

      </h1>

      <p className="
        text-xl
        text-gray-600
        max-w-3xl
        mx-auto
        mb-10
      ">

        Upload your resume, discover internships,
        get AI-powered skill matching, and apply
        confidently to opportunities that fit you.

      </p>

      <div className="
        flex
        flex-col
        sm:flex-row
        justify-center
        gap-4
        mb-12
      ">

        <Link to="/register">

          <Button
            text="Get Started"
          />

        </Link>

        <Link to="/internships">

          <Button
            text="Browse Internships"
            bgColor="bg-white"
            textColor="text-black"
            hoverColor="hover:bg-gray-200"
          />

        </Link>

      </div>

      <div className="
        flex
        justify-center
        gap-10
        flex-wrap
        text-gray-600
      ">

        <div>

          <h3 className="
            text-3xl
            font-bold
            text-black
          ">

            AI

          </h3>

          <p>
            Smart Matching
          </p>

        </div>

        <div>

          <h3 className="
            text-3xl
            font-bold
            text-black
          ">

            Resume

          </h3>

          <p>
            Skill Analysis
          </p>

        </div>

        <div>

          <h3 className="
            text-3xl
            font-bold
            text-black
          ">

            Fast

          </h3>

          <p>
            One-Click Apply
          </p>

        </div>

      </div>

    </div>

  </section>

)
}