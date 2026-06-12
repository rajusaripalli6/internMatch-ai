import Button from "../common/Button"
import { Link } from "react-router-dom"
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

          <Link to="/register">
            <Button text="Get Started" />
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

      </div>

    </section>
  )
}