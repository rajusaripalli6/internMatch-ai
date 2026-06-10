import { useState, useContext }
from "react"

import MainLayout from "../../layouts/MainLayout"
import Button from "../../components/common/Button"
import FormField from "../../components/forms/FormField"

import { Link } from "react-router-dom"

import { registerUser }
from "../../services/authService"

import { AuthContext }
from "../../context/AuthContext"

export default function Register() {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [showPassword, setShowPassword] = useState(false)

  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const { login } = useContext(AuthContext)
  const [role, setRole] =
  useState("student")

  async function handleSubmit(e) {

    e.preventDefault()

    const newErrors = {}

    if (!name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!email.trim()) {
      newErrors.email = "Email is required"
    }

    if (!password.trim()) {
      newErrors.password = "Password is required"
    }

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword =
        "Confirm password is required"
    }

    if (
      password &&
      confirmPassword &&
      password !== confirmPassword
    ) {
      newErrors.confirmPassword =
        "Passwords do not match"
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) {
      return
    }

    try {

      setLoading(true)

      const response =
        await registerUser(
          name,
          email,
          password,
          role
        )

      login(
        response.user,
        response.token
      )

    } catch (error) {

      setErrors({
        general: error.message,
      })

    } finally {

      setLoading(false)

    }

  }

  return (
    <MainLayout>

      <div className="flex justify-center items-center py-20">

        <form
          onSubmit={handleSubmit}
          className="
            bg-white
            p-10
            rounded-2xl
            shadow-lg
            w-full
            max-w-md
          "
        >

          <h1 className="text-4xl font-bold mb-8 text-center">
            Register
          </h1>

          <FormField
            label="Name"
            id="name"
            name="name"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => {

              setName(e.target.value)

              setErrors((prev) => ({
                ...prev,
                name: "",
              }))

            }}
            error={errors.name}
          />

          <FormField
            label="Email"
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {

              setEmail(e.target.value)

              setErrors((prev) => ({
                ...prev,
                email: "",
              }))

            }}
            error={errors.email}
          />

          <FormField
            label="Password"
            id="password"
            name="password"
            type={
              showPassword
                ? "text"
                : "password"
            }
            placeholder="Enter your password"
            value={password}
            onChange={(e) => {

              setPassword(e.target.value)

              setErrors((prev) => ({
                ...prev,
                password: "",
              }))

            }}
            error={errors.password}
          />

          <FormField
            label="Confirm Password"
            id="confirmPassword"
            name="confirmPassword"
            type={
              showPassword
                ? "text"
                : "password"
            }
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => {

              setConfirmPassword(e.target.value)

              setErrors((prev) => ({
                ...prev,
                confirmPassword: "",
              }))

            }}
            error={errors.confirmPassword}
          />
          <div className="mb-6">

              <label className="
                block
                mb-2
                font-medium
              ">
                Role
              </label>

              <select

                value={role}

                onChange={(e) =>
                  setRole(e.target.value)
                }

                className="
                  w-full
                  border
                  rounded-lg
                  p-3
                "

              >

                <option value="student">
                  Student
                </option>

                <option value="recruiter">
                  Recruiter
                </option>

              </select>

            </div>

          <button
            type="button"
            onClick={() =>
              setShowPassword(!showPassword)
            }
            className="
              mb-6
              text-sm
              text-blue-600
            "
          >
            {showPassword
              ? "Hide Passwords"
              : "Show Passwords"}
          </button>

          {errors.general && (
            <p className="
              text-red-500
              text-sm
              mb-4
              text-center
            ">
              {errors.general}
            </p>
          )}

          <Button
            text={
              loading
                ? "Creating Account..."
                : "Register"
            }
          />

          <p className="
            text-center
            mt-6
            text-gray-600
          ">
            Already have an account?{" "}

            <Link
              to="/login"
              className="
                text-blue-600
                font-medium
                hover:underline
              "
            >
              Login
            </Link>

          </p>

        </form>

      </div>

    </MainLayout>
  )
}