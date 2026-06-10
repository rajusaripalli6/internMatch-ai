
import { useEffect, useState } from "react"

import MainLayout from "../layouts/MainLayout"

import {
  getInternships,
  applyToInternship,
} from "../services/internshipService"

import {
  getMatchScore
} from "../services/applicationService"

export default function Internships() {

  const [internships,
    setInternships] =
    useState([])

  const [matchScores,
    setMatchScores] =
    useState({})

  const [loading,
    setLoading] =
    useState(true)

  const [error,
    setError] =
    useState("")

  const [message,
    setMessage] =
    useState("")

  async function handleApply(
    internshipId
  ) {

    try {

      const token =
        localStorage.getItem(
          "token"
        )

      await applyToInternship(
        internshipId,
        token
      )

      setMessage(
        "✅ Application submitted successfully!"
      )

    } catch (error) {

      setMessage(
        error.message
      )

    }

  }

  useEffect(() => {

    async function fetchData() {

      try {

        const data =
          await getInternships()

        const token =
          localStorage.getItem(
            "token"
          )

        const scores = {}

        for (
          const internship
          of
          data.internships
        ) {

          try {

            const result =
              await getMatchScore(
                internship._id,
                token
              )

            scores[
              internship._id
            ] = result

          } catch {

            scores[
              internship._id
            ] = null

          }

        }

        setMatchScores(
          scores
        )

        data.internships.sort(

          (
            a,
            b
          ) => {

            const scoreA =
              scores[
                a._id
              ]?.score || 0

            const scoreB =
              scores[
                b._id
              ]?.score || 0

            return (
              scoreB - scoreA
            )

          }

        )

        setInternships(
          [...data.internships]
        )

      } catch (error) {

        setError(
          error.message
        )

      } finally {

        setLoading(false)

      }

    }

    fetchData()

  }, [])

  if (loading) {

    return (

      <MainLayout>

        <h1 className="
          p-10
        ">
          Loading...
        </h1>

      </MainLayout>

    )

  }

  if (error) {

    return (

      <MainLayout>

        <h1 className="
          text-red-500
          p-10
        ">
          {error}
        </h1>

      </MainLayout>

    )

  }

  return (

    <MainLayout>

      <div className="p-10">

        <h1 className="
          text-4xl
          font-bold
          mb-2
        ">

          🔥 Recommended Internships

        </h1>

        <p className="
          text-gray-500
          mb-8
        ">

          Ranked by your AI skill match.

        </p>

        {message && (

          <div className="
            bg-green-100
            border
            border-green-300
            text-green-700
            rounded-lg
            p-3
            mb-6
          ">

            {message}

          </div>

        )}

        <div className="
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-3
          gap-6
        ">

          {internships.map(

            (
              internship
            ) => (

              <div

                key={
                  internship._id
                }

                className="
                  bg-white
                  rounded-2xl
                  shadow-lg
                  p-6
                  hover:shadow-xl
                  transition
                "

              >

                <h2 className="
                  text-2xl
                  font-bold
                  mb-3
                ">

                  {
                    internship.title
                  }

                </h2>

                <p>
                  <strong>
                    Company:
                  </strong>
                  {" "}
                  {
                    internship.company
                  }
                </p>

                <p>
                  <strong>
                    Location:
                  </strong>
                  {" "}
                  {
                    internship.location
                  }
                </p>

                <p>
                  <strong>
                    Recruiter:
                  </strong>
                  {" "}
                  {
                    internship.recruiter?.name
                  }
                </p>

                <p className="
                  my-4
                  text-gray-600
                ">

                  {
                    internship.description
                  }

                </p>

                {matchScores[
                  internship._id
                ] && (

                  <div className="
                    bg-green-50
                    border
                    border-green-300
                    rounded-xl
                    p-4
                    mb-4
                  ">

                    <p className="
                      text-green-700
                      font-bold
                      text-lg
                    ">

                      🎯 AI Match

                    </p>

                    <p className="
                      text-3xl
                      font-extrabold
                      my-2
                    ">

                      {
                        matchScores[
                          internship._id
                        ].score
                      }%

                    </p>

                    <p className="
                      text-sm
                    ">

                      <strong>
                        Matched Skills:
                      </strong>

                      {" "}

                      {
                        matchScores[
                          internship._id
                        ]
                        .matchedSkills
                        .join(", ")
                      }

                    </p>

                  </div>

                )}

                <button

                  onClick={() =>
                    handleApply(
                      internship._id
                    )
                  }

                  className="
                    w-full
                    bg-blue-600
                    hover:bg-blue-700
                    text-white
                    py-3
                    rounded-lg
                    font-semibold
                  "

                >

                  Apply

                </button>

              </div>

            )

          )}

        </div>

      </div>

    </MainLayout>

  )

}

