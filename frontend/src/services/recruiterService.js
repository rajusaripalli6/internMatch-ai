export async function getApplicants(
  token
) {
const API_URL = import.meta.env.VITE_API_URL
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

  if (!response.ok) {

    throw new Error(
      data.message
    )

  }

  return data

}

export async function updateApplicationStatus(
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

        body: JSON.stringify({
          status
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