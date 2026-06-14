const API_URL =
  import.meta.env.VITE_API_URL

export async function getInternships() {

  const response = await fetch(
    `${API_URL}/internships`
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

export async function applyToInternship(
  internshipId,
  token
) {

  const response = await fetch(

    `${API_URL}/apply/${internshipId}`,

    {

      method: "POST",

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
export async function
getInternshipById(id) {

  const response =
    await fetch(

      `${API_URL}/internships/${id}`

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