import Cards from "../../components/Cards";
import styles from "./Projects.module.css"

export default function Projects(){
    return(
        <div className={styles.containerProject}>
            <h1>Projetos</h1>
            <div className={styles.containerCards}>
                <Cards
                    name={"PlutoPlutoPlutoPluto"}
                    price={10000}
                    category={"Design"}
                />
                <Cards
                    name={"PlutoPlutoPlutoPluto"}
                    price={10000}
                    category={"Design"}
                />
                <Cards
                    name={"PlutoPlutoPlutoPluto"}
                    price={10000}
                    category={"Design"}
                />
                <Cards
                    name={"PlutoPlutoPlutoPluto"}
                    price={10000}
                    category={"Design"}
                />
                <Cards
                    name={"PlutoPlutoPlutoPluto"}
                    price={10000}
                    category={"Design"}
                />
            </div>
            
        </div>
    )
}