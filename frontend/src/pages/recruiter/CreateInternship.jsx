import { useState } from "react"
import { toast }
from "react-toastify"
import MainLayout
from "../../layouts/MainLayout"

import {
  createInternship
}
from "../../services/createInternshipService"

export default function CreateInternship() {

  const [title,
    setTitle] =
    useState("")

  const [company,
    setCompany] =
    useState("")

  const [location,
    setLocation] =
    useState("")

  const [skills,
    setSkills] =
    useState("")

  const [description,
    setDescription] =
    useState("")

  async function handleSubmit(
    e
  ) {

    e.preventDefault()

    try {

      const token =
        localStorage.getItem(
          "token"
        )

      await createInternship(

        {
          title,
          company,
          location,

          skills:

    skills.split(",").map(
      skill =>
        skill.trim()
    ),

          description

        },

        token

      )

      toast.success(
        "Internship created"
      )

      setTitle("")
      setCompany("")
      setLocation("")
      setSkills("")
      setDescription("")

    } catch (error) {

      toast.error(
        error.message
      )

    }

  }

  return (

    <MainLayout>

      <div className="p-10">

        <h1 className="
          text-4xl
          font-bold
          mb-8
        ">
          Create Internship
        </h1>

        <form
            onSubmit={handleSubmit}
            className="
                bg-white
                p-8
                rounded-2xl
                shadow-lg
                max-w-4xl
            "
            >

            <div className="mb-5">

                <label className="
                block
                font-medium
                mb-2
                ">
                Internship Title
                </label>

                <input
                type="text"
                placeholder="Frontend Developer Intern"
                value={title}
                onChange={(e) =>
                    setTitle(e.target.value)
                }
                className="
                    w-full
                    border
                    rounded-lg
                    px-4
                    py-3
                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-500
                "
                />

            </div>

            <div className="mb-5">

                <label className="
                block
                font-medium
                mb-2
                ">
                Company Name
                </label>

                <input
                type="text"
                placeholder="Google"
                value={company}
                onChange={(e) =>
                    setCompany(e.target.value)
                }
                className="
                    w-full
                    border
                    rounded-lg
                    px-4
                    py-3
                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-500
                "
                />

            </div>

            <div className="mb-5">

                <label className="
                block
                font-medium
                mb-2
                ">
                Location
                </label>

                <input
                type="text"
                placeholder="Remote"
                value={location}
                onChange={(e) =>
                    setLocation(e.target.value)
                }
                className="
                    w-full
                    border
                    rounded-lg
                    px-4
                    py-3
                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-500
                "
                />

            </div>

            <div className="mb-5">

                <label className="
                block
                font-medium
                mb-2
                ">
                Required Skills
                </label>

                <input
                type="text"
                placeholder="React, JavaScript, Node.js"
                value={skills}
                onChange={(e) =>
                    setSkills(e.target.value)
                }
                className="
                    w-full
                    border
                    rounded-lg
                    px-4
                    py-3
                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-500
                "
                />

            </div>

            <div className="mb-6">

                <label className="
                block
                font-medium
                mb-2
                ">
                Description
                </label>

                <textarea
                rows="5"
                placeholder="Describe the internship..."
                value={description}
                onChange={(e) =>
                    setDescription(e.target.value)
                }
                className="
                    w-full
                    border
                    rounded-lg
                    px-4
                    py-3
                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-500
                "
                />

            </div>

            <button
                type="submit"
                className="
                bg-black
                hover:bg-blue-700
                text-white
                px-6
                py-3
                rounded-lg
                font-semibold
                transition
                "
            >
                Create Internship
            </button>

            </form>

      </div>

    </MainLayout>

  )

}