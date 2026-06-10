import Navbar from "../components/navbar/Navbar"
import Footer from "../components/footer/Footer"

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">

      <Navbar />

      <main className="flex-grow">
        {children}
      </main>

      <Footer />

    </div>
  )
}