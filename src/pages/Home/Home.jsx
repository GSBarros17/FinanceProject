import { Link } from "react-router-dom"
import { useAuthValue } from "../../context/AuthContext"
import styles from "./Home.module.css"
import ImgBanner from "../../img/img1.png"

export default function Home(){

    const {user} = useAuthValue()
    const firstName = user && user.displayName ? user.displayName.split(" ")[0] : "";
    const firstNameCapital = firstName.charAt(0).toUpperCase() + firstName.slice(1);

    return(
        <div className={styles.containerHome}>
            {firstNameCapital && <h1>{firstNameCapital}, bem vindo ao <span>FINANCE</span></h1>}    
            {!firstNameCapital && <h1>Bem vindo ao <span>FINANCE</span></h1>}    
            <p>Com a Finance, você consegue criar e gerir seu projetos na área de técnologia.</p>
            <p>Experimente, crie seu projeto agora mesmo!</p>
            {user && <Link to="/CreateProject" className="btnForm">Criar Projeto</Link>}
            <img className={styles.imgHome} src={ImgBanner} alt="banner principal finance" />
        </div>
    )
}