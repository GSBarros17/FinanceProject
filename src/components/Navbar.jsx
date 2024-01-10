import { Link } from "react-router-dom"
import { FaBars } from "react-icons/fa";
import { useState, useEffect, useRef } from "react"
import useAuthetication from "../hooks/useAuthentication"
import { useAuthValue } from "../context/AuthContext"
import styles from "./Navbar.module.css"
import logo from "../img/logo.svg"

export default function Navbar(){
    
    const { user } = useAuthValue()
    const { logout } = useAuthetication()
    const [hideNavbar, setHideNavbar] = useState("false")

    const toggleClasse = () => {
      setHideNavbar(!hideNavbar)
    }
  
    const handleLinkClick = () =>{
      setHideNavbar(true)
    }
  
    const handleClickOutside = (e) =>{
      const navbarRef = navbarContainerRef.current
      if (navbarRef && !navbarRef.contains(e.target)) {
          setHideNavbar(true)
      }
    }
  
    useEffect(()=> {
      document.addEventListener("click", handleClickOutside)
      return () => {
          document.removeEventListener("click", handleClickOutside)
      }
    }, [])
  
    const navbarContainerRef = useRef(null)

    return (
        <div className={styles.navContainer}>
            <section className={styles.headerMenu}>
                <Link to="/" onClick={handleLinkClick}>
                    <img className={styles.logoNavbar} src={logo} alt="logo Finance Project" />
                </Link>
                <button onClick={toggleClasse} className={styles.menuBtn}>
                    <FaBars/>
                </button>
            </section>   
            <nav className={`${styles.navbar} ${!hideNavbar ? styles.navItensToggle : ''}`}>
                <ul className={styles.list}>
                    <li onClick={handleLinkClick}>
                        <Link to="/">Home</Link>
                    </li>
                    {user && (
                        <>
                            <li onClick={handleLinkClick}>
                                <Link to="/Projects">Projetos</Link>
                            </li>
                            <li onClick={handleLinkClick}>
                                <Link to="/CriarProjeto">Criar Projeto</Link>
                            </li>
                        </>
                    )}
                    <li onClick={handleLinkClick}>
                        <Link to="/Company">Empresa</Link>
                    </li>
                    <li onClick={handleLinkClick}>
                        <Link to="/Contact">Contato</Link>
                    </li>
                    {!user && (
                        <>
                            <li onClick={handleLinkClick}>
                                <Link to="/Register">Criar Conta</Link>
                            </li>  
                            <li onClick={handleLinkClick}>
                                <Link to="/Login">Login</Link>
                            </li>
                        </>
                    )}
                    {user && (
                        <li>
                            <button onClick={logout}>Sair</button>
                        </li>
                    )}
                </ul>
            </nav>
        </div>
    )
}