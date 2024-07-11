import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './pages/Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashbord from './pages/Dashbord'
import Reservation from './pages/Reservation'
import NewStadium from './pages/NewStadium'
import Reservations from './pages/Reservations'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='Login' element={<Login />} />
          <Route path='Register' element={<Register />} />
          <Route path='dash' element={<Dashbord />} />
          <Route path='reservations' element={<Reservations />} />
          <Route path='reservation/:terrain' element={<Reservation />} />
        </Route>

        <Route path='admin/new' element={<NewStadium />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
