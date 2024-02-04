import { Route, Routes, Link } from "react-router-dom"

import BaseDashboard from "./Bases/BaseDashboard"
import MissileDashboard from "./Missiles/MissileDashboard"

import MissilePage from "./Missiles/MissilePage"
import BasePage from "./Bases/BasePage"

import { Button } from "../../Components/Button"

function Dashboard() {
  return (
    <>
      <h1 className="text-center">Dashboard</h1>

      <div className="flex justify-center">
        <Link to="/dashboard/base">
          <Button className=" mr-5">
            Bases
          </Button>
        </Link>
        <Link to="/dashboard/missile">
          <Button>
            Missiles
          </Button>
        </Link>
      </div>
      <Routes>
        <Route path="/base" element={<BaseDashboard />} />
        <Route path="/base/:id" element={<BasePage />} />
        
        <Route path="/missile" element={<MissileDashboard />} />
        <Route path="/missile/:id" element={<MissilePage />} />
      </Routes>
    </>
  )
}

export default Dashboard