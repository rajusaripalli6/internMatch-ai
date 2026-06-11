import { useState, useContext } from "react"

import MainLayout from "../../layouts/MainLayout"
import Button from "../../components/common/Button"
import FormField from "../../components/forms/FormField"

import {
  Link,
  useNavigate
} from "react-router-dom"

import { AuthContext }
from "../../context/AuthContext"

import { loginUser }
from "../../services/authService"

export default function Login() {

  const [email, setEmail] =
    useState("")

  const [password, setPassword] =
    useState("")

  const [showPassword,
    setShowPassword] =
    useState(false)

  const [errors, setErrors] =
    useState({})
  const [loading, setLoading] =
  useState(false)

  const { login } =
    useContext(AuthContext)

  const navigate =
    useNavigate()

  async function handleSubmit(e) {

    e.preventDefault()

    const newErrors = {}

    if (!email.trim()) {

      newErrors.email =
        "Email is required"

    }

    if (!password.trim()) {

      newErrors.password =
        "Password is required"

    }

    setErrors(newErrors)

    if (
      Object.keys(newErrors)
        .length > 0
    ) {

      return

    }
    setLoading(true)
    loginUser(
      email,
      password
    )

      .then((data) => {

          console.log(
            "LOGIN RESPONSE:",
            data
          )

          login(
            data.user,
            data.token
          )

          console.log(
            "USER IN STORAGE:",
            localStorage.getItem("user")
          )

          console.log(
            "TOKEN IN STORAGE:",
            localStorage.getItem("token")
          )

          if (
            data.user.role ===
            "student"
          ) {

            navigate(
              "/internships"
            )

          } else {

            navigate(
              "/recruiter/dashboard"
            )

          }

        })

      .catch((error) => {
          setLoading(false)
        setErrors({

          general:
            error.message,

        })

      })

  }

  return (

    <MainLayout>

      <div className="
        flex
        justify-center
        items-center
        py-20
      ">

        <form

          onSubmit={
            handleSubmit
          }

          className="
            bg-white
            p-10
            rounded-2xl
            shadow-lg
            w-full
            max-w-md
          "

        >

          <h1 className="
            text-4xl
            font-bold
            mb-8
            text-center
          ">

            Login

          </h1>

          <FormField
            label="Email"
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={email}

            onChange={(e) => {

              setEmail(
                e.target.value
              )

              setErrors(
                (prev) => ({

                  ...prev,

                  email: "",

                })
              )

            }}

            error={
              errors.email
            }
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

              setPassword(
                e.target.value
              )

              setErrors(
                (prev) => ({

                  ...prev,

                  password: "",

                })
              )

            }}

            error={
              errors.password
            }
          />

          <button

            type="button"

            onClick={() =>
              setShowPassword(
                !showPassword
              )
            }

            className="
              mb-6
              text-sm
              text-blue-600
            "

          >

            {showPassword
              ? "Hide Password"
              : "Show Password"}

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
                ? "Logging in..."
                : "Login"
            }

            disabled={loading}
          />

          <p className="
            text-center
            mt-6
            text-gray-600
          ">

            Don’t have an account?{" "}

            <Link

              to="/register"

              className="
                text-blue-600
                font-medium
                hover:underline
              "

            >

              Register

            </Link>

          </p>

        </form>

      </div>

    </MainLayout>

  )

}