import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { useLoading } from './contexts/UserContext'

import Header from './Layout/Header/Header'
import Footer from './Layout/Footer/Footer'

import Home from './Pages/Home/Home'
import Login from './Pages/Login/Login'
import Dashboard from './Pages/Dashboard/Dashboard'
import Loading from './Pages/Loading'

function App() {

  const loading = useLoading();

  if (loading) {
    return (
      <Loading />
    )
  }

  return (
    <>
      <BrowserRouter>
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard/*" element={<Dashboard />} />
            </Routes>
          </main>
          <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
