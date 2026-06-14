
import { useEffect, useState } from "react"

import MainLayout from "../layouts/MainLayout"

import {
  getInternships,
  applyToInternship,
} from "../services/internshipService"

import {
  getMatchScore
} from "../services/applicationService"
import { toast }
from "react-toastify"

export default function Internships() {

  const [internships,
    setInternships] =
    useState([])
  const [
  searchTerm,
  setSearchTerm
] = useState("")
  const [matchScores,
    setMatchScores] =
    useState({})

  const [loading,
    setLoading] =
    useState(true)

  const [error,
    setError] =
    useState("")
  const [
  selectedLocation,
  setSelectedLocation
] = useState("")

const [
  selectedCompany,
  setSelectedCompany
] = useState("")
  const navigate =
  useNavigate()

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

      toast.success(
        "✅ Application submitted successfully!"
      )

    } catch (error) {

      toast.error(
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
  const filteredInternships =
  internships.filter(
    internship => {

      const matchesSearch =

        internship.title
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          )

        ||

        internship.company
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          )

      const matchesLocation =

        selectedLocation === ""

        ||

        internship.location ===
        selectedLocation

      const matchesCompany =

        selectedCompany === ""

        ||

        internship.company ===
        selectedCompany

      return (
        matchesSearch &&
        matchesLocation &&
        matchesCompany
      )

    }
  )
  const locations = [
  ...new Set(
    internships.map(
      internship =>
        internship.location
    )
  )
]

const companies = [
  ...new Set(
    internships.map(
      internship =>
        internship.company
    )
  )
]
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

        
      <input

            type="text"

            placeholder="
          Search internships...
          "

            value={searchTerm}

            onChange={(e) =>
              setSearchTerm(
                e.target.value
              )
            }

            className="
              w-full
              mb-6
              p-4
              border
              rounded-xl
              shadow-sm
            "

          />
          <div className="
            flex
            flex-col
            md:flex-row
            gap-4
            mb-6
          ">

            <select

              value={selectedLocation}

              onChange={(e) =>
                setSelectedLocation(
                  e.target.value
                )
              }

              className="
                border
                p-3
                rounded-lg
              "

            >

              <option value="">
                All Locations
              </option>

              {locations.map(
                location => (

                  <option
                    key={location}
                    value={location}
                  >
                    {location}
                  </option>

                )
              )}

            </select>

            <select

              value={selectedCompany}

              onChange={(e) =>
                setSelectedCompany(
                  e.target.value
                )
              }

              className="
                border
                p-3
                rounded-lg
              "

            >

              <option value="">
                All Companies
              </option>

              {companies.map(
                company => (

                  <option
                    key={company}
                    value={company}
                  >
                    {company}
                  </option>

                )
              )}

            </select>
            <button

              onClick={() => {

                setSearchTerm("")
                setSelectedLocation("")
                setSelectedCompany("")

              }}

              className="
                bg-black
                text-white
                px-4
                py-3
                rounded-lg
                border
                border-black
                hover:bg-white
                hover:text-black
                transition
              "

            >

              Clear Filters

            </button>

          </div>
        <div className="
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-3
          gap-6
        ">
          {filteredInternships.length === 0 && (

              <div className="
                bg-white
                p-8
                rounded-2xl
                text-center
                shadow-lg
                mb-6
              ">

                <h2 className="
                  text-2xl
                  font-bold
                  mb-2
                ">

                  No internships found

                </h2>

                <p className="
                  text-gray-500
                ">

                  Try another search term.

                </p>

              </div>

            )}
          {filteredInternships.map(

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
        <div className="
              mt-8
              flex
              flex-col
              md:flex-row
              gap-4
            ">

              <button
                onClick={() =>
                  navigate(
                    "/internships"
                  )
                }
                className="
                  bg-blue-600
                  hover:bg-blue-700
                  text-white
                  px-6
                  py-3
                  rounded-lg
                  font-semibold
                "
              >
                Browse Internships
              </button>

              <button
                onClick={() =>
                  navigate(
                    "/profile"
                  )
                }
                className="
                  bg-black
                  hover:bg-gray-800
                  text-white
                  px-6
                  py-3
                  rounded-lg
                  font-semibold
                "
              >
                Update Profile
              </button>

            </div>

      </div>

    </MainLayout>

  )

}

