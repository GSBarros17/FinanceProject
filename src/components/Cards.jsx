import { Link } from "react-router-dom"
import styles from "./Cards.module.css"
import { BsPencil, BsFillTrashFill } from "react-icons/bs"
import Numeral from "../layout/Numeral"

export default function Cards({name, budget, category, cost}){
  
  
  return(
        <div className={styles.projectCard}>
          <div className={styles.tittleCard}>
            <h4>{name}</h4>
          </div>
          <p>
            <span>Orçamento: R$</span><Numeral format="0,000.00">{budget}</Numeral>
          </p>
          <p>
            <span>Total utilizado: R$</span><Numeral format="0,000.00">{cost}</Numeral>
          </p>
          <p className={styles.categoryText}>
            <span className={`${styles[category.toLowerCase()]}`}></span>{category}
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