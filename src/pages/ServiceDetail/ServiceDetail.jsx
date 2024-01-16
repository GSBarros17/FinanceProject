import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useFetchDocument } from "../../hooks/useFetchDocument"
import { useUpdateDocument } from "../../hooks/useUpdateDocument"
import styles from "./ServiceDetail.module.css"
import Numeral from "../../components/Numeral"
import Loading from "../../components/Loading"


export default function ServiceDetail(){
    const { id } = useParams()
    const {document: service, loading} = useFetchDocument("services", id)
    const [showEditForm, setShowEditForm] = useState(false)
    const [titleService, setTitleService] = useState("")
    const [cost, setCost] = useState("null")
    const [description, setDescription] = useState("")
    const [formError, setFormError] = useState("")

    useEffect(() => {
        if(service){
            setTitleService(service.titleService)
            setCost(service.cost)
            setDescription(service.description)
        }
    }, [service])

    const {updateDocument, response} = useUpdateDocument("services")
    

    function toggleEditForm(){
        setShowEditForm(!showEditForm)
    }

    function handleSubmit(e){
        e.preventDefault()
        setFormError("")

        if(!titleService || !cost || !description){
            setFormError("preencha todos os campos!")
            return
        }

        if(formError){
            return
        }
        
        const data = {
            titleService,
            cost,
            description,
        }

        updateDocument(id, data)
        .then(() => {
            window.location.reload();
        })
        .catch((error) => {
            console.error("Erro durante a atualização:", error);
        });

    }
    
    return(
        <div className={styles.containerProjectDetail}>
            {loading && <Loading/>}
            {service && (
                <>
                    <div>
                        <h1>{service.title}</h1>
                        <button className="btnForm" onClick={toggleEditForm}>
                        {!showEditForm ? "Editar Projeto" : "Fechar"}
                        </button>
                    </div>
                    {!showEditForm ? (
                        <div>
                            <p>Utilizado R$: <Numeral format="0,000.00">{service.cost}</Numeral></p>
                            <p>Descrição: {service.description}</p>  
                        </div>
                    ) : (
                        <div>
                            <form onSubmit={handleSubmit}>
                                <label>
                                    <span>Titulo do serviço:</span>
                                    <input 
                                        type="text"
                                        name="Name_project" 
                                        placeholder="Digite o nome do projeto"
                                        value={titleService}
                                        onChange={(e) => setTitleService(e.target.value)}
                                        maxLength={35}
                                    />
                                </label>
                                <label>
                                    <span>Custo do serviço:</span>
                                    <input 
                                        type="number"
                                        name="Value_project"
                                        placeholder="Digite o valor total do projeto"
                                        value={cost}
                                        onChange={(e) => setCost(e.target.value)}
                                    />
                                </label>
                                <label>
                                    <span>Descrição:</span>
                                    <textarea 
                                        name="body" 
                                        placeholder="Detalhes do serviço"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        maxLength={300}
                                    ></textarea>
                                </label>
                                {response && <button className="btnForm">Salvar</button>}
                            </form>
                            {response.error && <h4 className="err">{response.error}</h4>}
                            {formError && <h4 className="err">{formError}</h4>}
                        </div>
                    )}  
                </>
            )}
        </div>
    )
}