
import {
  useEffect,
  useState
}
from "react"
import { toast }
from "react-toastify"
import MainLayout
from "../../layouts/MainLayout"

import {

  getApplicants,

  updateApplicationStatus

}
from "../../services/applicationService"

export default function
RecruiterApplicants() {

  const [

    applications,

    setApplications

  ] = useState([])

  const [

    loading,

    setLoading

  ] = useState(true)

  useEffect(() => {

    async function
    fetchApplicants() {

      try {

        const token =

          localStorage.getItem(
            "token"
          )

        const data =

          await getApplicants(
            token
          )

        setApplications(

          data.applications

        )

      } catch (
        error
      ) {

        console.log(
          error
        )

      } finally {

        setLoading(
          false
        )

      }

    }

    fetchApplicants()

  }, [])

  async function
  handleStatusUpdate(

    applicationId,

    status

  ) {

    try {

      const token =

        localStorage.getItem(
          "token"
        )

      await updateApplicationStatus(

        applicationId,

        status,

        token

      )

      setApplications(

        applications.map(

          application =>

            application._id ===
            applicationId

              ? {

                  ...application,

                  status

                }

              : application

        )

      )

    } catch (
      error
    ) {

      toast.error(
        error.message
      )

    }

  }

  if (
    loading
  ) {

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

  return (

    <MainLayout>

      <div className="
        p-10
      ">

        <h1 className="
          text-4xl
          font-bold
          mb-8
        ">

          Applicants

        </h1>

        {

          applications.map(

            (
              application
            ) => (

              <div

                key={
                  application._id
                }

                className="
                  bg-white
                  p-6
                  rounded-xl
                  shadow-md
                  mb-4
                "

              >

                <h2 className="
                  text-xl
                  font-bold
                ">

                  {
                    application.student
                      ?.name
                  }

                </h2>

                <p>

                  {
                    application.student
                      ?.email
                  }

                </p>

                <p>

                  Internship:

                  {" "}

                  {
                    application
                      .internship
                      ?.title
                  }

                </p>

                <p className="
                  mb-4
                ">

                  Status:

                  {" "}

                  <span className="
                    font-bold
                  ">

                    {
                      application
                        .status
                    }

                  </span>

                </p>

                <div className="
                  flex
                  gap-3
                ">

                  <button

                    onClick={() =>

                      handleStatusUpdate(

                        application._id,

                        "accepted"

                      )

                    }

                    className="
                      bg-black
                      text-white
                      border
                      border-black
                      px-4
                      py-2
                      rounded
                      transition
                      hover:bg-white
                      hover:text-black
                    "

                  >

                    Accept

                  </button>

                  <button

                    onClick={() =>

                      handleStatusUpdate(

                        application._id,

                        "rejected"

                      )

                    }

                    className="
                      bg-black
                      text-white
                      border
                      border-black
                      px-4
                      py-2
                      rounded
                      transition
                      hover:bg-white
                      hover:text-black
                    "

                  >

                    Reject

                  </button>

                </div>

              </div>

            )

          )

        }

      </div>

    </MainLayout>

  )

}

