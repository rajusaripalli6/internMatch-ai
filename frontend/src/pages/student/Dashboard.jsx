import MainLayout from "../../layouts/MainLayout"

export default function Dashboard() {
  return (
    <MainLayout>

      <div className="p-10">

        <h1 className="text-4xl font-bold mb-4">
          Student Dashboard
        </h1>

        <p className="text-gray-600">
          Manage internships and recommendations.
        </p>

      </div>

    </MainLayout>
  )
}