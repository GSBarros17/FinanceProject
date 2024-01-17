import { Link } from "react-router-dom"
import styles from "./Cards.module.css"
import { BsPencil, BsFillTrashFill } from "react-icons/bs"
import { useDeleteDocument } from "../hooks/useDeleteDocument";
import Numeral from "../components/Numeral"

export default function Cards({project}){
  
  const {deleteDocument} = useDeleteDocument("projects")

  return(
        <div className={styles.projectCard}>
          <div className={styles.tittleCard}>
            <h4>{project.title}</h4>
          </div>
          <p>
            <span>Orçamento: R$</span><Numeral format="0,000.00">{project.price}</Numeral>
          </p>
          <p>
            <span>Total utilizado: R$</span><Numeral format="0,000.00">{project.cost}</Numeral>
          </p>
          <p>
            <span>Saldo: R$</span><Numeral format="0,000.00">{project.price - project.cost}</Numeral>
          </p>
          <p className={styles.categoryText}>
            <span className={`${styles[project.categories.toLowerCase()]}`}></span>{project.categories}
          </p>
          <div className={styles.cardActions}>
            <Link to={`/ProjectDetail/${project.id}`}>
                <BsPencil/>Detalhe     
            </Link>
            <button onClick={()=> deleteDocument(project.id)}>
                <BsFillTrashFill/>Excluir
            </button>
          </div>
        </div>
       
    )
}