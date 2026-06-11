
import {
  useState,
  useEffect
}
from "react"

import MainLayout
from "../../layouts/MainLayout"

import {

  getMyInternships,

  deleteInternship,

  updateInternship

}
from "../../services/createInternshipService"
import {
  useNavigate
}
from "react-router-dom"
import { toast }
from "react-toastify"
import {
  getApplicants
}
from "../../services/applicationService"
export default function
RecruiterDashboard() {
const navigate =
  useNavigate()
  const [

    internships,

    setInternships

  ] = useState([])
  const [
  applications,
  setApplications
] = useState([])

  const [

    editingId,

    setEditingId

  ] = useState(null)

  const [

    editForm,

    setEditForm

  ] = useState({

    title: "",

    company: "",

    location: "",

    skills: "",

    description: ""

  })

  const [

    loading,

    setLoading

  ] = useState(true)

  useEffect(() => {

    async function
    fetchData() {

      try {

        const token =

          localStorage.getItem(
            "token"
          )

        const data =

          await getMyInternships(
            token
          )

        setInternships(
          data.internships
        )
        const applicantData =
          await getApplicants(
            token
          )

          console.log(
            "APPLICANTS DATA:",
            applicantData
          )

          console.log(
            "APPLICATIONS:",
            applicantData.applications
          )

          setApplications(
            applicantData.applications
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

    fetchData()

  }, [])

  function handleEdit(
    internship
  ) {

    setEditingId(
      internship._id
    )

    setEditForm({

      title:
        internship.title,

      company:
        internship.company,

      location:
        internship.location,

      skills:
        internship.skills.join(
          ", "
        ),

      description:
        internship.description

    })

  }

  async function
  handleUpdate() {

    try {

      const token =

        localStorage.getItem(
          "token"
        )

      await updateInternship(

        editingId,

        {

          ...editForm,

          skills:

            editForm.skills

              .split(",")

              .map(
                skill =>
                  skill.trim()
              )

        },

        token

      )

      const data =

        await getMyInternships(
          token
        )

      setInternships(
        data.internships
      )

      setEditingId(
        null
      )

      toast.success(
        "✅ Internship updated successfully!"
      )

    } catch (
      error
    ) {

      toast.error(
        error.message
      )

    }

  }

  async function
  handleDelete(
    internshipId
  ) {

    const confirmDelete =

      window.confirm(

        "Delete this internship?"

      )

    if (
      !confirmDelete
    ) {

      return

    }

    try {

      const token =

        localStorage.getItem(
          "token"
        )

      await deleteInternship(

        internshipId,

        token

      )

      setInternships(

        internships.filter(

          internship =>

            internship._id
            !==
            internshipId

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
  console.log(
  "applications state:",
  applications
)
const totalInternships =
  internships.length
  

const totalApplicants =
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

      <div className="
        p-10
      ">

        <h1 className="
          text-4xl
          font-bold
          mb-2
        ">

          Recruiter Dashboard

        </h1>

        <p className="
          text-gray-500
          mb-8
        ">

          My Posted Internships

        </p>
        <div className="
          grid
          grid-cols-2
          md:grid-cols-5
          gap-4
          mb-8
        ">

          <div className="
            bg-white
            p-5
            rounded-2xl
            shadow-lg
            text-center
          ">
            <h3>Total Internships</h3>
            <p className="
              text-3xl
              font-bold
            ">
              {totalInternships}
            </p>
          </div>

          <div className="
            bg-white
            p-5
            rounded-2xl
            shadow-lg
            text-center
          ">
            <h3>Applicants</h3>
            <p className="
              text-3xl
              font-bold
            ">
              {totalApplicants}
            </p>
          </div>

          <div className="
            bg-white
            p-5
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
            p-5
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
            p-5
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
          grid
          grid-cols-1
          md:grid-cols-2
          gap-6
        ">

          {

            internships.map(

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

                  <p className="
                    my-4
                  ">

                    {
                      internship.description
                    }

                  </p>

                  {

                    editingId ===
                    internship._id && (

                      <div className="
                        mt-4
                        border-t
                        pt-4
                      ">

                        <input
                          type="text"
                          value={
                            editForm.title
                          }
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              title:
                                e.target.value
                            })
                          }
                          placeholder="Title"
                          className="
                            w-full
                            border
                            p-2
                            rounded
                            mb-2
                          "
                        />

                        <input
                          type="text"
                          value={
                            editForm.company
                          }
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              company:
                                e.target.value
                            })
                          }
                          placeholder="Company"
                          className="
                            w-full
                            border
                            p-2
                            rounded
                            mb-2
                          "
                        />

                        <input
                          type="text"
                          value={
                            editForm.location
                          }
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              location:
                                e.target.value
                            })
                          }
                          placeholder="Location"
                          className="
                            w-full
                            border
                            p-2
                            rounded
                            mb-2
                          "
                        />

                        <input
                          type="text"
                          value={
                            editForm.skills
                          }
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              skills:
                                e.target.value
                            })
                          }
                          placeholder="Skills"
                          className="
                            w-full
                            border
                            p-2
                            rounded
                            mb-2
                          "
                        />

                        <textarea
                          value={
                            editForm.description
                          }
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              description:
                                e.target.value
                            })
                          }
                          placeholder="Description"
                          className="
                            w-full
                            border
                            p-2
                            rounded
                            mb-2
                          "
                        />

                        <button

                          onClick={
                            handleUpdate
                          }

                          className="
                            bg-green-600
                            hover:bg-green-700
                            text-white
                            px-4
                            py-2
                            rounded
                            mt-2
                          "

                        >

                          Update Internship

                        </button>

                      </div>

                    )

                  }

                  <div className="
                    flex
                    gap-3
                    mt-5
                  ">

                    <button

                      onClick={() =>

                        navigate(

                          "/recruiter/applicants"

                        )

                      }

                      className="
                        bg-black
                        text-white
                        border
                        border-black
                        px-4
                        py-2
                        rounded-lg
                        transition
                        hover:bg-white
                        hover:text-black
                      "

                    >

                      View Applicants

                    </button>

                    <button

                      onClick={() =>
                        handleEdit(
                          internship
                        )
                      }

                      className="
                        bg-black
                        text-white
                        border
                        border-black
                        px-4
                        py-2
                        rounded-lg
                        transition
                        hover:bg-white
                        hover:text-black
                      "

                    >

                      Edit

                    </button>

                    <button

                      onClick={() =>

                        handleDelete(

                          internship._id

                        )

                      }

                      className="
                        bg-black
                        text-white
                        border
                        border-black
                        px-4
                        py-2
                        rounded-lg
                        transition
                        hover:bg-white
                        hover:text-black
                      "

                    >

                      Delete

                    </button>

                  </div>

                </div>

              )

            )

          }

        </div>

      </div>

    </MainLayout>

  )

}
