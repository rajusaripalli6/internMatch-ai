export async function loginUser(email, password) {

  const response = await fetch(
    "http://localhost:5000/login",
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        email,
        password,
      }),
    }
  )

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message)
  }

  return data
}
export async function registerUser(
  name,
  email,
  password,
  role
) {

  const response = await fetch(
    "http://localhost:5000/register",
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name,
        email,
        password,
        role,
      }),
    }
  )

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message)
  }

  return data
}