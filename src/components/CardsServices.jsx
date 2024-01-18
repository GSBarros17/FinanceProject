import { useState, useEffect } from "react";
import { BsPencil, BsFillTrashFill } from "react-icons/bs"
import { useParams } from "react-router-dom"
import { useFetchDocument } from "../hooks/useFetchDocument";
import { useDeleteDocument } from "../hooks/useDeleteDocument";
import { useUpdateDocument } from "../hooks/useUpdateDocument";
import { Link } from "react-router-dom"
import styles from "./CardsServices.module.css"
import Numeral from "../components/Numeral"

export default function CardsServices({service}){
  
  const { id } = useParams()
  const {document: project} = useFetchDocument("projects", id)
  const {deleteDocument} = useDeleteDocument("services")
  const {updateDocument} = useUpdateDocument("projects", id)
  const [cost, setCost] = useState("null")
  console.log(cost)
  useEffect(() => {
    if(project){
        setCost(project.costServices)
    }
  }, [project])

  function handleDeleteService(e){
      e.preventDefault()

      const costService = Number(service.cost)
      let newCost = cost - costService
      console.log(newCost)
      const data = {
        costServices: newCost,
      }
      
      updateDocument(id, data)
      .then(() => {
          window.location.reload();
      })
      .catch((error) => {
          console.error("Erro durante a atualização:", error);
      });

      deleteDocument(service.id)

  }

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
            <Link to={`/ServiceDetail/${service.id}`}>
                <BsPencil/>Detalhe     
            </Link>
            <button onClick={handleDeleteService}>
                <BsFillTrashFill/>Excluir
            </button>
          </div>
        </div>
       
    )
}