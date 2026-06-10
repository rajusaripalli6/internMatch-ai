import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"

export default function ProtectedRoute({ children }) {

  const { user, loading } =
    useContext(AuthContext)

  console.log("ProtectedRoute user:", user)
  console.log("ProtectedRoute loading:", loading)

  if (loading) {
    return <h1>Loading...</h1>
  }

  if (!user) {
    console.log("REDIRECTING TO LOGIN")
    return <Navigate to="/login" />
  }

  console.log("ALLOWING ACCESS")

  return children
}