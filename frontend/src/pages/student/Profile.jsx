import {
  useState,
  useEffect
} from "react"

import MainLayout
from "../../layouts/MainLayout"

import {
  updateSkills,
  uploadResume,
  getProfile
}
from "../../services/profileService"
import { toast }
from "react-toastify"
const availableSkills = [

  "React",
  "JavaScript",
  "Node.js",
  "MongoDB",
  "Express",
  "HTML",
  "CSS",
  "Java",
  "Python",
  "C",
  "C++",
  "Git",
  "GitHub",
  "SQL"

]

export default function Profile() {

  const [skills,
    setSkills] =
    useState("")

  const [savedSkills,
    setSavedSkills] =
    useState([])

  const [resume,
    setResume] =
    useState(null)

  

  useEffect(() => {

    async function loadProfile() {

      try {

        const token =
          localStorage.getItem(
            "token"
          )

        const data =
          await getProfile(
            token
          )

        setSavedSkills(
          data.user.skills || []
        )

      } catch (error) {

        console.log(error)

      }

    }

    loadProfile()

  }, [])

  function addSkill(
    skill
  ) {

    const currentSkills =

      skills
        .split(",")
        .map(
          s => s.trim()
        )
        .filter(
          s => s !== ""
        )

    if (
      !currentSkills.includes(
        skill
      )
    ) {

      setSkills(

        [
          ...currentSkills,
          skill
        ].join(", ")

      )

    }

  }

  async function
  handleResumeUpload() {

    try {

      if (!resume) {

        toast.error(
          "Please select a PDF."
        )

        return

      }

      const token =
        localStorage.getItem(
          "token"
        )

      const data =
        await uploadResume(
          resume,
          token
        )

      setSavedSkills(
        data.skills
      )

      setSkills("")

      setMessage(
        "✅ Resume uploaded successfully!"
      )

    } catch (error) {

      toast.error(
        error.message
      )

    }

  }

  async function
handleSave(
  e
) {

  e.preventDefault()

  try {

    const token =
      localStorage.getItem(
        "token"
      )

    const updatedSkills =

      skills
        .split(",")
        .map(
          skill =>
            skill.trim()
        )
        .filter(
          skill =>
            skill !== ""
        )

    if (
      updatedSkills.length === 0
    ) {

      toast.error(
        "Please enter at least one skill"
      )

      return

    }

    await updateSkills(
      updatedSkills,
      token
    )

    setSavedSkills(
      updatedSkills
    )

    setSkills("")

    toast.success(
      "Skills updated successfully!"
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
        max-w-3xl
        mx-auto
        mt-10
        bg-white
        p-8
        rounded-2xl
        shadow-lg
      ">

        <h1 className="
          text-3xl
          font-bold
          mb-6
        ">
          My Profile
        </h1>

        

        <div className="mb-6">

          <label className="
            block
            mb-2
            font-semibold
          ">
            Upload Resume
          </label>

          <input

            type="file"

            accept=".pdf"

            onChange={(e) =>
              setResume(
                e.target.files[0]
              )
            }

            className="
              w-full
              border
              rounded-lg
              p-3
            "

          />

          <button

            type="button"

            onClick={
              handleResumeUpload
            }

            className="
              mt-3
              bg-green-600
              hover:bg-green-700
              text-white
              px-5
              py-2
              rounded-lg
            "

          >

            Upload Resume

          </button>

        </div>

        <div className="mb-6">

          <h2 className="
            font-semibold
            mb-3
          ">

            Quick Add Skills

          </h2>

          <div className="
            flex
            flex-wrap
            gap-2
          ">

            {

              availableSkills.map(

                (
                  skill,
                  index
                ) => (

                  <button

                    key={index}

                    type="button"

                    onClick={() =>
                      addSkill(
                        skill
                      )
                    }

                    className="
                      bg-gray-100
                      hover:bg-blue-100
                      border
                      px-3
                      py-1
                      rounded-full
                      text-sm
                    "

                  >

                    {skill}

                  </button>

                )

              )

            }

          </div>

        </div>

        <label className="
          block
          mb-2
          font-semibold
        ">

          Add Skills

        </label>

        <textarea

          rows="4"

          value={skills}

          onChange={(e) =>
            setSkills(
              e.target.value
            )
          }

          placeholder="
Enter skills separated by commas...

Example:
React, JavaScript, Node.js
"

          className="
            w-full
            border
            rounded-lg
            p-4
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
          "

        />

        {savedSkills.length > 0 && (

          <div className="
            mt-6
          ">

            <h2 className="
              font-semibold
              mb-3
            ">

              Current Skills

            </h2>

            <div className="
              flex
              flex-wrap
              gap-2
            ">

              {

                savedSkills.map(

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
                        text-sm
                        font-medium
                      "

                    >

                      {skill}

                    </span>

                  )

                )

              }

            </div>

          </div>

        )}

        <button

          onClick={
            handleSave
          }

          className="
            mt-6
            bg-blue-600
            hover:bg-blue-700
            text-white
            px-6
            py-3
            rounded-lg
            font-semibold
          "

        >

          Save Skills

        </button>

      </div>

    </MainLayout>

  )

}