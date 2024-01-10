import { Link } from "react-router-dom"
import styles from "./Home.module.css"
import ImgBanner from "../../img/img1.png"


export default function Home(){
    return(
        <div className={styles.containerHome}>
            <h1>Bem vindo ao <span>FINANCE</span></h1>
            <p>Com a Finance, você consegue criar e gerir seu projetos na área de técnologia.</p>
            <p>Experimente, crie seu projeto agora mesmo!</p>
            <Link to="/CreateProject" className="btnForm">Criar Projeto</Link>
            <img className={styles.imgHome} src={ImgBanner} alt="banner principal finance" />
        </div>
    )
}