import { Link, useNavigate } from "react-router-dom"
import { useContext, useState } from "react"

import { AuthContext } from "../../context/AuthContext"

export default function Navbar() {

  const { user, logout } =
    useContext(AuthContext)

  const navigate =
    useNavigate()
  const [menuOpen, setMenuOpen] =
  useState(false)
  function handleLogout() {

    logout()

    navigate("/")

  }


return (

  <nav className="
    bg-black
    text-white
    px-6
    py-4
  ">

    <div className="
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

      <button

        className="
          md:hidden
          text-3xl
        "

        onClick={() =>

          setMenuOpen(
            !menuOpen
          )

        }

      >

        ☰

      </button>

      <div className="
        hidden
        md:flex
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

    </div>

    {menuOpen && (

      <div className="
        md:hidden
        flex
        flex-col
        gap-4
        mt-4
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
              className="text-left"
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

    )}

  </nav>

)
}
