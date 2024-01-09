import styles from "./Company.module.css"
import img2 from "../../img/img2.png"
import SectionContainer from "../../components/SectionContainer"

export default function Company(){
    return (
        <div className={styles.companyContainer}>
            <div>
                <h1>Sobre a <span>FINANCE</span></h1>
            </div>
            <SectionContainer text1="Finance nasceu de um projeto criado em paralelo a um curso de React do prof.
            Matheus Battisti." text2="A Finance é um site de gestão de projetos da área de TI,
            seu objetivo é auxiliar nas despesas de gastos no decorrer dos projetos." 
            img={img2} altText={"banner2 Finance"} />
        </div>   
    )
}