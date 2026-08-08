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
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const { login } = useContext(AuthContext)
  const [role, setRole] =
  useState("student")
  function validatePassword(password) {

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

  return passwordRegex.test(password)

}
      function getPasswordStrength(password) {

        let score = 0

        if (password.length >= 8) score++
        if (/[A-Z]/.test(password)) score++
        if (/[a-z]/.test(password)) score++
        if (/\d/.test(password)) score++
        if (/[@$!%*?&]/.test(password)) score++

        if (score <= 2)
          return {
            text: "Weak",
            color: "text-red-500"
          }

        if (score <= 4)
          return {
            text: "Medium",
            color: "text-yellow-500"
          }

        return {
          text: "Strong",
          color: "text-green-600"
        }

      }
      function passwordChecks(password) {

        return {

          length:
            password.length >= 8,

          uppercase:
            /[A-Z]/.test(password),

          lowercase:
            /[a-z]/.test(password),

          number:
            /\d/.test(password),

          special:
            /[@$!%*?&]/.test(password),

        }

      }
  async function handleSubmit(e) {

    e.preventDefault()
    if (!validatePassword(password)) {

      toast.error(

        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character."

      )

      return

    }

    if (password !== confirmPassword) {

      toast.error(

        "Passwords do not match."

      )

      return

    }
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
        if (!validatePassword(password)) {
          toast.error(
            "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character."
            )

      return

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

                  setErrors(prev => ({
                    ...prev,
                    name: ""
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

                  setErrors(prev => ({
                    ...prev,
                    email: ""
                  }))

                }}
                error={errors.email}
              />

              {/* PASSWORD */}

              <div className="mb-5">

                <label className="block mb-2 font-medium">
                  Password
                </label>

                <div className="relative">

                  <input

                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }

                    value={password}

                    onChange={(e) => {

                      setPassword(
                        e.target.value
                      )

                      setErrors(prev => ({
                        ...prev,
                        password: ""
                      }))

                    }}

                    placeholder="Enter password"

                    className="
                      w-full
                      border
                      rounded-lg
                      p-3
                      pr-12
                    "

                  />

                  <button

                    type="button"

                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }

                    className="
                      absolute
                      right-3
                      top-1/2
                      -translate-y-1/2
                    "

                  >

                    {
                      showPassword
                        ? "🙈"
                        : "👁"
                    }

                  </button>

                </div>

              </div>

              {/* PASSWORD STRENGTH */}

              <div className="mb-4">

                <p className="font-medium">

                  Password Strength

                </p>

                <p
                  className={
                    getPasswordStrength(password).color
                  }
                >

                  {
                    getPasswordStrength(password).text
                  }

                </p>

              </div>

              {/* PASSWORD CHECKLIST */}

              <div className="mb-5 space-y-1 text-sm">

                <p className={
                  passwordChecks(password).length
                    ? "text-green-600"
                    : "text-gray-500"
                }>
                  {
                    passwordChecks(password).length
                      ? "✔"
                      : "✖"
                  } Minimum 8 characters
                </p>

                <p className={
                  passwordChecks(password).uppercase
                    ? "text-green-600"
                    : "text-gray-500"
                }>
                  {
                    passwordChecks(password).uppercase
                      ? "✔"
                      : "✖"
                  } One uppercase letter
                </p>

                <p className={
                  passwordChecks(password).lowercase
                    ? "text-green-600"
                    : "text-gray-500"
                }>
                  {
                    passwordChecks(password).lowercase
                      ? "✔"
                      : "✖"
                  } One lowercase letter
                </p>

                <p className={
                  passwordChecks(password).number
                    ? "text-green-600"
                    : "text-gray-500"
                }>
                  {
                    passwordChecks(password).number
                      ? "✔"
                      : "✖"
                  } One number
                </p>

                <p className={
                  passwordChecks(password).special
                    ? "text-green-600"
                    : "text-gray-500"
                }>
                  {
                    passwordChecks(password).special
                      ? "✔"
                      : "✖"
                  } One special character
                </p>

              </div>

              {/* CONFIRM PASSWORD */}

              <div className="mb-6">

                <label className="block mb-2 font-medium">

                  Confirm Password

                </label>

                <div className="relative">

                  <input

                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }

                    value={confirmPassword}

                    onChange={(e) =>
                      setConfirmPassword(
                        e.target.value
                      )
                    }

                    placeholder="Confirm Password"

                    className="
                      w-full
                      border
                      rounded-lg
                      p-3
                      pr-12
                    "

                  />

                  <button

                    type="button"

                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }

                    className="
                      absolute
                      right-3
                      top-1/2
                      -translate-y-1/2
                    "

                  >

                    {
                      showConfirmPassword
                        ? "🙈"
                        : "👁"
                    }

                  </button>

                </div>

                {

                  confirmPassword &&
                  password !== confirmPassword && (

                    <p className="
                      text-red-500
                      text-sm
                      mt-2
                    ">

                      Passwords do not match

                    </p>

                  )

                }

              </div>

              {/* ROLE */}

              <div className="mb-6">

                <label className="block mb-2 font-medium">
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

              {

                errors.general && (

                  <p className="
                    text-red-500
                    text-center
                    mb-4
                  ">

                    {errors.general}

                  </p>

                )

              }

              <button

                  type="submit"

                  disabled={
                    loading ||
                    !validatePassword(password) ||
                    password !== confirmPassword
                  }

                  className={`

                    w-full
                    py-3
                    rounded-lg
                    font-semibold
                    transition

                    ${
                      loading ||
                      !validatePassword(password) ||
                      password !== confirmPassword

                        ? "bg-gray-400 cursor-not-allowed text-white"

                        : "bg-blue-600 hover:bg-blue-700 text-white"

                    }

                  `}

                >

                  {

                    loading

                      ? "Creating Account..."

                      : "Register"

                  }

                </button>

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