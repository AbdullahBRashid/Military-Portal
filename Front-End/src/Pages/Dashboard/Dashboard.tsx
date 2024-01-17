import { Route, Routes, Link } from "react-router-dom"
import BaseDashboard from "./Bases/BaseDashboard"
import MissileDashboard from "./Missiles/MissileDashboard"
import MissilePage from "./Missiles/MissilePage"
import { Button } from "../../Components/Button"

function Dashboard() {
  return (
    <>
      <h1 className="text-center">Dashboard</h1>

      <div className="flex justify-center">
        <Button className=" mr-5">
          <Link to="/dashboard/base">Bases</Link>
        </Button>
        <Button>
          <Link to="/dashboard/missile">Missiles</Link>
        </Button>
      </div>
      <Routes>
        <Route path="/base" element={<BaseDashboard />} />
        <Route path="/missile" element={<MissileDashboard />} />
        <Route path="/missile/:id" element={<MissilePage />} />
      </Routes>
    </>
  )
}

export default Dashboard