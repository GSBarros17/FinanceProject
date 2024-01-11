import { Link } from "react-router-dom"
import styles from "./Cards.module.css"
import { BsPencil, BsFillTrashFill } from "react-icons/bs"
import Numeral from "../components/Numeral"

export default function Cards({project}){
  
  
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
          <p className={styles.categoryText}>
            <span className={`${styles[project.categories.toLowerCase()]}`}></span>{project.categories}
          </p>
          <div className={styles.cardActions}>
            <Link to="/">
                <BsPencil/>Detalhe     
            </Link>
            <button>
                <BsFillTrashFill/>Excluir
            </button>
          </div>
        </div>
       
    )
}