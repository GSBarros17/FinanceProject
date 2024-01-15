import { Link } from "react-router-dom"
import styles from "./Cards.module.css"
import { BsPencil, BsFillTrashFill } from "react-icons/bs"
import { useDeleteDocument } from "../hooks/useDeleteDocument";
import Numeral from "../components/Numeral"

export default function Cards({service}){
  
  const {deleteDocument} = useDeleteDocument("services")

  return(
        <div className={styles.projectCard}>
          <div className={styles.tittleCard}>
            <h4>{service.titleService}</h4>
          </div>
          <p>
            <span>Total utilizado: R$</span><Numeral format="0,000.00">{service.cost}</Numeral>
          </p>
          <p className={styles.categoryText}>
            <span>Descrição do serviço:</span>{service.description}
          </p>
          <div className={styles.cardActions}>
            <Link to={`/ProjectDetail/${service.id}`}>
                <BsPencil/>Detalhe     
            </Link>
            <button onClick={()=> deleteDocument(service.id)}>
                <BsFillTrashFill/>Excluir
            </button>
          </div>
        </div>
       
    )
}