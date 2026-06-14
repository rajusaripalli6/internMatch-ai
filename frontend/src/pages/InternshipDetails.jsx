import {
  useEffect,
  useState
} from "react"

import {
  useParams
} from "react-router-dom"

import MainLayout
from "../layouts/MainLayout"

import {
  getInternshipById
} from "../services/internshipService"
import {
  applyToInternship
}
from "../services/internshipService"

import { toast }
from "react-toastify"

export default function InternshipDetails() {

  const { id } =
    useParams()

  const [
    internship,
    setInternship
  ] = useState(null)

  const [
    loading,
    setLoading
  ] = useState(true)

  useEffect(() => {

    async function fetchData() {

      try {

        const data =

          await getInternshipById(
            id
          )

        setInternship(
          data.internship
        )

      } catch (error) {

        console.log(error)

      } finally {

        setLoading(false)

      }

    }

    fetchData()

  }, [id])

  if (loading) {

    return (

      <MainLayout>

        <div className="p-10">

          Loading...

        </div>

      </MainLayout>

    )

  }

  if (!internship) {

    return (

      <MainLayout>

        <div className="p-10">

          Internship not found

        </div>

      </MainLayout>

    )

  }
  async function
handleApply() {

  try {

    const token =

      localStorage.getItem(
        "token"
      )

    await applyToInternship(

      internship._id,

      token

    )

    toast.success(
      "Application submitted successfully!"
    )

  } catch (error) {

    toast.error(
      error.message
    )

  }

}

  return (

    <MainLayout>

      <div className="
        max-w-4xl
        mx-auto
        p-10
      ">

        <div className="
          bg-white
          rounded-2xl
          shadow-lg
          p-8
        ">

          <h1 className="
            text-4xl
            font-bold
            mb-4
          ">

            {internship.title}

          </h1>

          <p className="
            text-lg
            mb-2
          ">

            <strong>
              Company:
            </strong>

            {" "}

            {internship.company}

          </p>

          <p className="
            text-lg
            mb-2
          ">

            <strong>
              Location:
            </strong>

            {" "}

            {internship.location}

          </p>

          <p className="
            text-lg
            mb-4
          ">

            <strong>
              Recruiter:
            </strong>

            {" "}

            {internship.recruiter?.name}

          </p>

          <div className="
            mb-6
          ">

            <h2 className="
              text-2xl
              font-bold
              mb-3
            ">

              Skills

            </h2>

            <div className="
              flex
              flex-wrap
              gap-2
            ">

              {internship.skills?.map(
                (
                  skill,
                  index
                ) => (

                  <span

                    key={index}

                    className="
                      bg-blue-100
                      text-blue-700
                      px-3
                      py-1
                      rounded-full
                    "

                  >

                    {skill}

                  </span>

                )
              )}

            </div>

          </div>

          <div>

            <h2 className="
              text-2xl
              font-bold
              mb-3
            ">

              Description

            </h2>

            <p className="
              text-gray-700
              leading-relaxed
            ">

              {internship.description}

            </p>
            <button

                onClick={
                    handleApply
                }

                className="
                    mt-8
                    w-full
                    bg-blue-600
                    hover:bg-blue-700
                    text-white
                    py-3
                    rounded-lg
                    font-semibold
                "

                >

                Apply Now

                </button>

          </div>

        </div>

      </div>

    </MainLayout>

  )

}