import { Link,NavLink, useNavigate } from "react-router-dom"
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
                <NavLink

                  to="/student/dashboard"

                  className={({ isActive }) =>

                    isActive

                      ? "border-b-2 border-white pb-1"

                      : ""

                  }

                >

                  Dashboard

                </NavLink>
                <NavLink

                  to="/internships"

                  className={({ isActive }) =>

                    isActive
                      ? "border-b-2 border-white pb-1"
                      : ""

                  }

                >

                  Internships

                </NavLink>

                <NavLink

                  to="/my-applications"

                  className={({ isActive }) =>

                    isActive
                      ? "border-b-2 border-white pb-1"
                      : ""

                  }

                >

                  My Applications

                </NavLink>

                <NavLink

                  to="/profile"

                  className={({ isActive }) =>

                    isActive
                      ? "border-b-2 border-white pb-1"
                      : ""

                  }

                >

                  Profile

                </NavLink>

              </>

            )}

            {user.role === "recruiter" && (

              <>

                <NavLink

                  to="/recruiter/dashboard"

                  className={({ isActive }) =>

                    isActive

                      ? "border-b-2 border-white pb-1"

                      : ""

                  }

                >

                  Dashboard

                </NavLink>

                <NavLink

                  to="/create-internship"

                  className={({ isActive }) =>

                    isActive
                      ? "border-b-2 border-white pb-1"
                      : ""

                  }

                >

                  Create Internship

                </NavLink>

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
                <NavLink

                  to="/student/dashboard"

                  className={({ isActive }) =>

                    isActive

                      ? "border-b-2 border-white pb-1"

                      : ""

                  }

                >

                  Dashboard

                </NavLink>
                <NavLink

                    to="/internships"

                    className={({ isActive }) =>

                      isActive
                        ? "border-b-2 border-white pb-1"
                        : ""

                    }

                  >

                    Internships

                  </NavLink>

                <NavLink

                  to="/my-applications"

                  className={({ isActive }) =>

                    isActive
                      ? "border-b-2 border-white pb-1"
                      : ""

                  }

                >

                  My Applications

                </NavLink>

                <NavLink

                  to="/profile"

                  className={({ isActive }) =>

                    isActive
                      ? "border-b-2 border-white pb-1"
                      : ""

                  }

                >

                  Profile

                </NavLink>

              </>

            )}

            {user.role === "recruiter" && (

              <>

                <NavLink

                  to="/recruiter/dashboard"

                  className={({ isActive }) =>

                    isActive

                      ? "border-b-2 border-white pb-1"

                      : ""

                  }

                >

                  Dashboard

                </NavLink>

                <NavLink

                  to="/create-internship"

                  className={({ isActive }) =>

                    isActive
                      ? "border-b-2 border-white pb-1"
                      : ""

                  }

                >

                  Create Internship

                </NavLink>

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
