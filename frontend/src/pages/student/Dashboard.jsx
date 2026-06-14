import MainLayout from "../../layouts/MainLayout"
import { useEffect, useState }
from "react"

import {
  getMyApplications
}
from "../../services/applicationService"
import {
  useNavigate
} from "react-router-dom"
export default function Dashboard() {
  const [
    applications,
    setApplications
  ] = useState([])

  const [
    loading,
    setLoading
  ] = useState(true)
  const navigate =
  useNavigate()
  
  useEffect(() => {

  async function fetchData() {

    try {

      const token =
        localStorage.getItem(
          "token"
        )

      const data =
        await getMyApplications(
          token
        )

      setApplications(
        data.applications
      )

    } catch (error) {

      console.log(error)

    } finally {

      setLoading(false)

    }

  }

  fetchData()

}, [])
const totalApplications =
  applications.length

const accepted =
  applications.filter(
    app =>
      app.status === "accepted"
  ).length

const rejected =
  applications.filter(
    app =>
      app.status === "rejected"
  ).length

const pending =
  applications.filter(
    app =>
      app.status === "pending"
  ).length
  return (
    <MainLayout>

      <div className="p-10">

            <h1 className="
              text-4xl
              font-bold
              mb-8
            ">
              Student Dashboard
            </h1>

            <div className="
              grid
              grid-cols-2
              md:grid-cols-4
              gap-4
              mb-8
            ">

              <div className="
                bg-white
                p-6
                rounded-2xl
                shadow-lg
                text-center
              ">
                <h3>Total</h3>
                <p className="
                  text-3xl
                  font-bold
                ">
                  {totalApplications}
                </p>
              </div>

              <div className="
                bg-white
                p-6
                rounded-2xl
                shadow-lg
                text-center
              ">
                <h3>Pending</h3>
                <p className="
                  text-3xl
                  font-bold
                ">
                  {pending}
                </p>
              </div>

              <div className="
                bg-white
                p-6
                rounded-2xl
                shadow-lg
                text-center
              ">
                <h3>Accepted</h3>
                <p className="
                  text-3xl
                  font-bold
                ">
                  {accepted}
                </p>
              </div>

              <div className="
                bg-white
                p-6
                rounded-2xl
                shadow-lg
                text-center
              ">
                <h3>Rejected</h3>
                <p className="
                  text-3xl
                  font-bold
                ">
                  {rejected}
                </p>
              </div>

            </div>
            <div className="
            bg-white
            rounded-2xl
            shadow-lg
            p-6
          ">

            <h2 className="
              text-2xl
              font-bold
              mb-4
            ">

              Recent Applications

            </h2>

            {applications.length === 0 ? (

              <p className="
                text-gray-500
              ">

                No applications yet.

              </p>

            ) : (

              <div className="
                space-y-4
              ">

                {applications
                  .slice(0, 5)
                  .map(
                    application => (

                      <div

                        key={
                          application._id
                        }

                        className="
                          flex
                          justify-between
                          items-center
                          border-b
                          pb-3
                        "

                      >

                        <div>

                          <h3 className="
                            font-semibold
                          ">

                            {
                              application
                                .internship
                                ?.title
                            }

                          </h3>

                        </div>

                        <span

                          className={`

                            px-3
                            py-1
                            rounded-full
                            text-white
                            text-sm

                            ${
                              application.status ===
                              "accepted"

                                ? "bg-green-500"

                                : application.status ===
                                  "rejected"

                                ? "bg-red-500"

                                : "bg-yellow-500"
                            }

                          `}

                        >

                          {
                            application.status
                          }

                        </span>

                      </div>

                    )

                  )}

              </div>

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