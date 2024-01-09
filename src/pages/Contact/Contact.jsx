import { BsPaperclip , BsGlobe2 , BsGithub , BsWhatsapp , BsLinkedin } from "react-icons/bs"
import styles from "./Contact.module.css"
import Devimg from "../../img/devimg.jpg"
import Docdev from "../../../docs/curriculoGuilherme.docx"
export default function Contact(){
    return (
        <div className={styles.containerContact}>
            <h1>Contatos</h1>
            <div className={styles.sectionContact}>
                <img src={Devimg} alt="imagem do desenvolvedor"/>
                <div className={styles.sectionTexts}>
                    <h2>Olá, me chamo <span>Guilherme Barros.</span></h2>
                    <p>Sou o responsável por desenvolver esta página!</p>
                    <h3>Caso você tenha interesse no meu trabalho,
                    entre em contato comigo pelas minhas redes sociais:</h3>
                    <div className={styles.socialMidia}>
                        <a aria-label="currículo do desenvolvedor" href={Docdev}><BsPaperclip/></a>
                        <a aria-label="link do site do desenvolvedor"href="https://www.devguilhermebarros.com.br"><BsGlobe2/></a>
                        <a aria-label="link para whatsapp"href="https://wa.me/5561999767446"><BsWhatsapp/></a>
                        <a aria-label="link do github do desenvolvedor" href="https://github.com/GSBarros17"><BsGithub/></a>
                        <a aria-label="link do linkedin desenvolvedor" href="https://www.linkedin.com/in/guilherme-barros-b05632294"><BsLinkedin/></a>
                    </div>
                </div>
            </div>
        </div>
    )

}