import { Link, useNavigate } from "react-router-dom"
import { useContext } from "react"

import { AuthContext } from "../../context/AuthContext"

export default function Navbar() {

  const { user, logout } =
    useContext(AuthContext)

  const navigate =
    useNavigate()

  function handleLogout() {

    logout()

    navigate("/")

  }

  return (

    <nav className="
      bg-black
      text-white
      px-8
      py-4
      flex
      justify-between
      items-center
    ">

      <h1 className="
        text-2xl
        font-bold
      ">
        InternMatch AI
      </h1>

      <div className="
        flex
        gap-6
        items-center
      ">

        <Link to="/">
          Home
        </Link>

        {user ? (

          <>

            {user.role === "student" && (

              <>

                <Link to="/internships">
                  Internships
                </Link>

                <Link to="/my-applications">
                  My Applications
                </Link>
                <Link to="/profile">
                  Profile
                </Link>

              </>

            )}

            {user.role === "recruiter" && (

              <>

                <Link to="/recruiter/dashboard">
                  Dashboard
                </Link>

                <Link to="/create-internship">
                  Create Internship
                </Link>

              </>

            )}

            <button
              onClick={handleLogout}
            >
              Logout
            </button>

          </>

        ) : (

          <>

            <Link to="/login">
              Login
            </Link>

            <Link to="/register">
              Register
            </Link>

          </>

        )}

      </div>

    </nav>

  )

}