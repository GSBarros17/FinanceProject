import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./pages/Home/Home"
import './App.css'

function App() {

  return (
    <>
      <div>
        <BrowserRouter>
              <Navbar/>
              <div>
                <Routes>
                  <Route path="/" element={<Home/>}/>
                </Routes>
              </div>
              <Footer/>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
