import {
  useEffect,
  useState
} from "react"

import MainLayout
from "../../layouts/MainLayout"

import {
  getMyApplications
}
from "../../services/applicationService"

export default function MyApplications() {

  const [applications,
    setApplications] =
    useState([])

  const [loading,
    setLoading] =
    useState(true)

  const [error,
    setError] =
    useState("")

  useEffect(() => {

    async function fetchData() {

      try {

        const token =
            localStorage.getItem(
              "token"
            )

          console.log(
            "TOKEN:",
            token
          )

          const data =
            await getMyApplications(
              token
            )

          console.log(
            "DATA:",
            data
          )

        setApplications(
          data.applications
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
        Loading...
      </MainLayout>
    )

  }

  if (error) {

    return (
      <MainLayout>
        {error}
      </MainLayout>
    )

  }

  return (

    <MainLayout>

      <div className="p-10">

        <h1 className="
          text-4xl
          font-bold
          mb-8
        ">
          My Applications
        </h1>

        {applications.filter(
    application =>
      application.internship
  ).map(
          (application) => (

          <div

            key={application._id}

            className="
              bg-white
              p-6
              rounded-xl
              shadow
              mb-4
            "

          >

            <h2 className="
              text-xl
              font-bold
            ">

              {
                application.internship?.title
              }

            </h2>

            <p>

              Company:
              {" "}

              {
                application.internship?.company
              }

            </p>

            <p>

              Status:
              {" "}

              <strong>

                {
                  application
                  .status
                }

              </strong>

            </p>

          </div>

        ))}

      </div>

    </MainLayout>

  )

}
