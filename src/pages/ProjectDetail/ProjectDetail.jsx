import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useFetchDocument } from "../../hooks/useFetchDocument"
import { useUpdateDocument } from "../../hooks/useUpdateDocument"
import { useAuthValue } from "../../context/AuthContext"
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
    const [formError, setFormError] = useState("")

    useEffect(() => {
        if(project){
            setTitle(project.title)
            setPrice(project.price)
            setCategories(project.categories)
        }
    }, [project])

    const {updateDocument, response} = useUpdateDocument("projects")
    const {user} = useAuthValue()

    function toggleEditForm(){
        setShowEditForm(!showEditForm)
    }

    function toggleServiceForm(){
        setShowServiceForm(!showServiceForm)
    }

    function handleSubmit(e){
        e.preventDefault()
        setFormError("")

        if(!title || !price || !categories){
            setFormError("preencha todos os campos!")
            return
        }

        if(formError){
            return
        }
        
        const data = {
            title,
            price,
            categories,
            uid: user.uid
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
                                {response && <button className="btnForm">Salvar</button>}
                            </form>
                            {response.error && <h4 className="err">{response.error}</h4>}
                            {formError && <h4 className="err">{formError}</h4>}
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