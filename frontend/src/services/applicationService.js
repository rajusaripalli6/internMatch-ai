const API_URL =
  import.meta.env.VITE_API_URL
export async function getMyApplications(
  token
) {

  const response = await fetch(
    `${API_URL}/my-applications`,
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
export async function getMatchScore(
  internshipId,
  token
) {

  const response =
    await fetch(
      `${API_URL}/match-score/${internshipId}`,
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

export async function
getApplicants(
  token
) {

  const response =
    await fetch(

      `${API_URL}/my-applicants`,

      {

        headers: {

          Authorization:

            `Bearer ${token}`

        }

      }

    )

  const data =
    await response.json()

  if (
    !response.ok
  ) {

    throw new Error(
      data.message
    )

  }

  return data

}


export async function
updateApplicationStatus(

  applicationId,

  status,

  token

) {

  const response =

    await fetch(

      `${API_URL}/applications/${applicationId}`,

      {

        method: "PATCH",

        headers: {

          "Content-Type":
            "application/json",

          Authorization:

            `Bearer ${token}`

        },

        body:

          JSON.stringify({

            status

          })

      }

    )

  const data =

    await response.json()

  if (
    !response.ok
  ) {

    throw new Error(
      data.message
    )

  }

  return data

}

