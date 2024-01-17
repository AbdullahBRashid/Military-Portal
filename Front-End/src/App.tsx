import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import {useLoading} from './contexts/UserContext'

import Header from './Layout/Header/Header'
import Footer from './Layout/Footer/Footer'

import Home from './Pages/Home/Home'
import Login from './Pages/Login/Login'
import Dashboard from './Pages/Dashboard/Dashboard'

function App() {

  const loading = useLoading();

  if (loading) {
    return (
      <>Loading ...</>
    )
  }

  return (
    <>
      <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
          </Routes>
          <Footer />
      </Router>
    </>
  )
}

export default App
