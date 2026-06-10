export async function createInternship(
  internshipData,
  token
) {

  const response =
    await fetch(
      "http://localhost:5000/internships",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",

          Authorization:
            `Bearer ${token}`
        },

        body: JSON.stringify(
          internshipData
        )

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
getMyInternships(
  token
) {

  const response =

    await fetch(

      "http://localhost:5000/my-internships",

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
deleteInternship(
  internshipId,
  token
) {

  const response =

    await fetch(

      `http://localhost:5000/internships/${internshipId}`,

      {

        method: "DELETE",

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
updateInternship(

  internshipId,

  internshipData,

  token

) {

  const response =

    await fetch(

      `http://localhost:5000/internships/${internshipId}`,

      {

        method: "PUT",

        headers: {

          "Content-Type":
            "application/json",

          Authorization:

            `Bearer ${token}`

        },

        body:

          JSON.stringify(

            internshipData

          )

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