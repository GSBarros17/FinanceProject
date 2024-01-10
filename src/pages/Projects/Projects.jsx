import Cards from "../../components/Cards";
import styles from "./Projects.module.css"

export default function Projects(){
    return(
        <div className={styles.containerProject}>
            <h1>Projetos</h1>
            <Cards
                name={"Projeto1"}
                price={10000}
                category={"Design"}
            />
        </div>
    )
}