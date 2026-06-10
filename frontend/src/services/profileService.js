export async function updateSkills(
  skills,
  token
) {
const API_URL = import.meta.env.VITE_API_URL
  const response =
    await fetch(
      `${API_URL}/update-skills`,
      {
        method: "PUT",

        headers: {
          "Content-Type":
            "application/json",

          Authorization:
            `Bearer ${token}`
        },

        body: JSON.stringify({
          skills
        })

      }
    )

  const data =
    await response.json()

  if (!response.ok) {

    throw new Error(
      data.message
    )

  }

  return data

}
export async function uploadResume(
  file,
  token
) {

  const formData =
    new FormData()

  formData.append(
    "resume",
    file
  )

  const response =
    await fetch(

      `${API_URL}/upload-resume`,

      {
        method: "POST",

        headers: {
          Authorization:
            `Bearer ${token}`
        },

        body:
          formData

      }

    )

  const data =
    await response.json()

  if (!response.ok) {

    throw new Error(
      data.message
    )

  }

  return data

}
export async function
getProfile(
  token
) {

  const response =
    await fetch(

      `${API_URL}/profile`,

      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }

    )

  const data =
    await response.json()

  if (!response.ok) {

    throw new Error(
      data.message
    )

  }

  return data

}