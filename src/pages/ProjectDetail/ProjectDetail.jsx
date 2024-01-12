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
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("null")
    const [categories, setCategories] = useState("")

    function toggleEditForm(){
        setShowEditForm(!showEditForm)
    }

    function toggleServiceForm(){
        setShowServiceForm(!showServiceForm)
    }

    function handleSubmit(e){
        e.precentDefault()
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
                            <form onSubmit={handleSubmit}>
                                <label>
                                    <span>Titulo do Projeto:</span>
                                    <input 
                                        type="text"
                                        name="Name_project" 
                                        placeholder="Digite o nome do projeto"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        maxLength={35}
                                    />
                                </label>
                                <label>
                                    <span>Custo total:</span>
                                    <input 
                                        type="number"
                                        name="Value_project"
                                        placeholder="Digite o valor total do projeto"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                </label>
                                <label>
                                    <span>Categoria:</span>
                                    <select 
                                        name="categories" 
                                        value={categories}
                                        onChange={(e) => setCategories(e.target.value)}
                                    >
                                        <option value=""></option>
                                        <option value="Infraestrutura">Infraestrutura</option>
                                        <option value="Desenvolvimento">Desenvolvimento</option>
                                        <option value="Design">Design</option>
                                        <option value="Planejamento">Planejameto</option>
                                        <option value="Manutenção">Manutenção</option>
                                    </select>
                                </label>
                                <button className="btnForm">Editar</button>
                            </form>
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
            <hr />
            <div className={styles.serviceContainer}>
                <h2>Serviços</h2>
            </div>
        </div>
    )
}