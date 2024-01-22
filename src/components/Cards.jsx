import { Link } from "react-router-dom"
import { useState } from "react";
import styles from "./Cards.module.css"
import { BsPencil, BsFillTrashFill, BsXCircle } from "react-icons/bs"
import { useDeleteDocument } from "../hooks/useDeleteDocument";
import Modal from "react-modal"
import Numeral from "../components/Numeral"

export default function Cards({project}){
  
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const {deleteDocument} = useDeleteDocument("projects")

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  return(
        <div className={styles.projectCard}>
          <div className={styles.tittleCard}>
            <h4>{project.title}</h4>
          </div>
          <p>
            <span>Orçamento: R$</span><Numeral format="0,000.00">{project.price}</Numeral>
          </p>
          <p>
            <span>Total utilizado: R$</span><Numeral format="0,000.00">{project.costServices}</Numeral>
          </p>
          <p>
            <span>Saldo: R$</span><Numeral format="0,000.00">{project.price - project.costServices}</Numeral>
          </p>
          <p className={styles.categoryText}>
            <span className={`${styles[project.categories.toLowerCase()]}`}></span>{project.categories}
          </p>
          <div className={styles.cardActions}>
            <Link to={`/ProjectDetail/${project.id}`}>
                <BsPencil/>Detalhe     
            </Link>
            <button onClick={openModal}>
                <BsFillTrashFill/>Excluir
            </button>
          </div>
          <Modal
            ariaHideApp={false}
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Example Modal"
            className="modalContainer"
          >
            <div className="modalDeleteHeader">
              <h2>Excluir Projeto</h2>
              <button onClick={closeModal}><BsXCircle /></button>
            </div>
            <p>Após excluir o projeto, o mesmo não poderá ser recuperado!</p>
            <button className="btnModal" onClick={()=> deleteDocument(project.id)}>
                <BsFillTrashFill/>Excluir
            </button>
          </Modal>
        </div>
    )
}