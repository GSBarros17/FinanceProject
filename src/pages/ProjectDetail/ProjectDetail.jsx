import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useFetchDocument } from "../../hooks/useFetchDocument"
import { useFetchDocuments } from "../../hooks/useFetchDocuments"
import { useUpdateDocument } from "../../hooks/useUpdateDocument"
import { useInsertDocument } from "../../hooks/useInsertDocument"
import { useAuthValue } from "../../context/AuthContext"
import Numeral from "../../components/Numeral"
import CardsServices from "../../components/CardsServices"
import Loading from "../../components/Loading"
import styles from "./ProjectDetail.module.css"




export default function ProjectDetail(){
    
    const { id } = useParams()
    const {document: project, loading} = useFetchDocument("projects", id)
    const {documents: services} = useFetchDocuments("services", null, id)
    const {insertDocument} = useInsertDocument("services")
    const [showEditForm, setShowEditForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("null")
    const [categories, setCategories] = useState("")
    const [titleService, setTitleService] = useState("")
    const [cost, setCost] = useState("null")
    const [description, setDescription] = useState("")
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

    function handleSubmitService(e){
        e.preventDefault()

        if(!titleService || !cost || !description){
            setFormError("Por favor, preencha todos os campos!")
            return
        }

        if(formError){
            return
        }

        insertDocument({
            titleService,
            cost,
            description,
            idService: id
        })

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
                        <form onSubmit={handleSubmitService}>
                            <label>
                                <span>Titulo do Serviço:</span>
                                <input 
                                    type="text"
                                    name="Name_service" 
                                    placeholder="Digite o nome do serviço"
                                    value={titleService}
                                    onChange={(e) => setTitleService(e.target.value)}
                                    maxLength={35}
                                />
                            </label>
                            <label>
                                <span>Custo do serviço:</span>
                                <input 
                                    type="number"
                                    name="Cost_service"
                                    placeholder="Digite o valor total do serviço"
                                    value={cost}
                                    onChange={(e) => setCost(e.target.value)}
                                />
                            </label>
                            <label>
                                <span>Categoria:</span>
                                <textarea 
                                    name="body" 
                                    placeholder="Detalhes do serviço"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    maxLength={300}
                                ></textarea>
                            </label>
                            {response && <button className="btnForm">Criar Serviço</button>}
                        </form>
                        {response.error && <h4 className="err">{response.error}</h4>}
                        {formError && <h4 className="err">{formError}</h4>}
                    </div>
                )}
            </div>
            <hr />
            <div className={styles.serviceContainer}>
                <h2>Serviços</h2>
                {services && services.length === 0 ? (
                    <div className={styles.noPosts}>
                        <p>Você não possui serviços</p>
                    
                    </div>
                ) : (
                    <div className={styles.containerServiceCards}>
                    {loading && <Loading/>}
                    {services && services.map((service)=> (
                        <CardsServices key={service.idService} service={service} />
                    ))}
                    </div>
                )}    
            </div>
        </div>
    )
}