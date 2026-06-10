export async function getInternships() {

  const response = await fetch(
    "http://localhost:5000/internships"
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

    `http://localhost:5000/apply/${internshipId}`,

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