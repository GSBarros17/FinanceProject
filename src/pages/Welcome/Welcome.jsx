import styles from "./Welcome.module.css"
import { Link } from "react-router-dom"
import imgLogo from "../../img/logo-finance.svg"

export default function Welcome(){
    return(
        <div className={styles.welcomeContainer}>
            <div className={styles.welcomeCard}>
                <img src={imgLogo} alt="Logo"/>
                <h1>Cadastro realizado com sucesso!</h1>
                <h2>Seja bem-vindo(a)</h2>
                <p>Crie e administre seus projetos na área de tecnologia</p>
                <p>Acesse nossa Home ou crie o seu primeiro projeto;</p>
                <div className={styles.linksContainer}>
                    <Link to="/" className="btnForm">Home</Link>
                    <Link to="/CreateProject" className="btnForm">Criar Projeto</Link>
                </div>
            </div>
        </div>
    )
}