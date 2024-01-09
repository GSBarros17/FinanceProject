import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { useState, useEffect } from 'react'
import { AuthProvider } from "./context/AuthContext"
import { onAuthStateChanged } from 'firebase/auth'
import useAuthentication from './hooks/useAuthentication'
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./pages/Home/Home"
import Register from './pages/Register/Register'
import Login from './pages/Login/Login'
import Company from './pages/Company/Company'
import Contact from './pages/Contact/Contact'
import './App.css'







function App() {

  const [user, setUser] = useState(undefined)
  const {auth} = useAuthentication()

  const loadingUser = user === undefined

  useEffect(()=>{

    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
  }, [auth])

  if(loadingUser){
    return <p>carregando...</p>
  }


  return (
    <>
      <div>
        <AuthProvider value={{user}}>
          <BrowserRouter>
                <Navbar/>
                <div className="container">
                  <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/Register" element={!user ? <Register/> : <Navigate to="/"/>}/>
                    <Route path="/Login" element={!user ? <Login/> : <Navigate to="/"/>}/>
                    <Route path="/Company" element={<Company/>}/>
                    <Route path="/Contact" element={<Contact/>}/>
                  </Routes>
                </div>
                <Footer/>
          </BrowserRouter>
        </AuthProvider>
      </div>
    </>
  )
}

export default App
