import { useState } from "react"
import { useParams } from "react-router-dom"
import { useFetchDocument } from "../../hooks/useFetchDocument"
import Numeral from "../../components/Numeral"
import Loading from "../../components/Loading"
import styles from "./ProjectDetail.module.css"

export default function ProjectDetail(){
    
    const { id } = useParams()
    const {document: project, loading} = useFetchDocument("projects", id)
    const [showEditForm, setShowEditForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)

    function toggleEditForm(){
        setShowEditForm(!showEditForm)
    }

    function toggleServiceForm(){
        setShowServiceForm(!showServiceForm)
    }

    return(
        <div className={styles.containerProjectDetail}>
            {loading && <Loading/>}
            {project && (
                <>
                    <div>
                        <h1>{project.title}</h1>
                        <button className="btnForm" onClick={toggleEditForm}>
                        {!showEditForm ? "Editar Projeto" : "Fechar"}
                        </button>
                    </div>
                    {!showEditForm ? (
                        <div>
                            <p>Categoria: {project.categories}</p>  
                            <p>Orçamento R$: <Numeral format="0,000.00">{project.price}</Numeral></p>
                            <p>Utilizado R$: <Numeral format="0,000.00">{project.cost}</Numeral></p>
                        </div>
                    ) : (
                        <div>
                            Formulario de edição
                        </div>
                    )}  
                </>
            )}
            <hr />
            <div className={styles.serviceFormContainer}>
                <h2>Adicione Serviços</h2>
                <button className="btnForm" onClick={toggleServiceForm}>
                    {!showServiceForm ? "Criar Serviço" : "Fechar"}
                </button>
                {showServiceForm && (
                    <div>
                        Formulario do serviço
                    </div>
                )}
            </div>
        </div>
    )
}