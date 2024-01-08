import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./pages/Home/Home"
import Register from './pages/Register/Register'
import './App.css'


function App() {

  return (
    <>
      <div>
        <BrowserRouter>
              <Navbar/>
              <div className="container">
                <Routes>
                  <Route path="/" element={<Home/>}/>
                  <Route path="/Register" element={<Register/>}/>
                </Routes>
              </div>
              <Footer/>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
