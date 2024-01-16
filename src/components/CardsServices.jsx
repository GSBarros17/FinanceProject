import { Link } from "react-router-dom"
import styles from "./CardsServices.module.css"
import { BsPencil, BsFillTrashFill } from "react-icons/bs"
import { useDeleteDocument } from "../hooks/useDeleteDocument";
import Numeral from "../components/Numeral"

export default function CardsServices({service}){
  
  const {deleteDocument} = useDeleteDocument("services")

  return(
        <div className={styles.serviceCard}>
          <div className={styles.infoService}>
            <div className={styles.tittleCard}>
              <h4>{service.titleService}</h4>
            </div>
            <p className={styles.textService}>Total utilizado:</p>
            <p>
              R$<Numeral format="0,000.00">{service.cost}</Numeral>
            </p>
            <p className={styles.textService}>Descrição do serviço:</p>
            <p className={styles.categoryText}>
              {service.description}
            </p>
          </div>
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