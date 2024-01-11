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
                    categories={"design"}
                />
                <Cards
                    name={"PlutoPlutoPlutoPluto"}
                    price={10000}
                    categories={"infraestrutura"}
                />
                <Cards
                    name={"PlutoPlutoPlutoPluto"}
                    price={10000}
                    categories={"desenvolvimento"}
                />
                <Cards
                    name={"PlutoPlutoPlutoPluto"}
                    price={10000}
                    categories={"planejamento"}
                />
                <Cards
                    name={"PlutoPlutoPlutoPluto"}
                    price={10000}
                    categories={"manutenção"}
                />
                <Cards
                    name={"PlutoPlutoPlutoPluto"}
                    price={10000}
                    categories={"Design"}
                />
                <Cards
                    name={"PlutoPlutoPlutoPluto"}
                    price={10000}
                    categories={"Design"}
                />
            </div>
            
        </div>
    )
}