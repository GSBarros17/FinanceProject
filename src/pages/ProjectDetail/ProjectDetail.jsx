import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useFetchDocument } from "../../hooks/useFetchDocument"
import { useFetchDocuments } from "../../hooks/useFetchDocuments"
import { useUpdateDocument } from "../../hooks/useUpdateDocument"
import { useInsertDocument } from "../../hooks/useInsertDocument"
import { useAuthValue } from "../../context/AuthContext"
import { BsFillArrowLeftSquareFill } from "react-icons/bs"
import { Link } from "react-router-dom"
import Numeral from "../../components/Numeral"
import CardsServices from "../../components/CardsServices"
import Loading from "../../components/Loading"
import styles from "./ProjectDetail.module.css"




export default function ProjectDetail(){
    
    const { id } = useParams()
    const {document: project, loading} = useFetchDocument("projects", id)
    const {documents: services} = useFetchDocuments("services", null, id)
    const {insertDocument} = useInsertDocument("services")
    const {updateDocument, response} = useUpdateDocument("projects")
    const [showEditForm, setShowEditForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("null")
    const [categories, setCategories] = useState("")
    const [titleService, setTitleService] = useState("")
    const [cost, setCost] = useState("null")
    const [description, setDescription] = useState("")
    const [formError, setFormError] = useState("")
    const {user} = useAuthValue()
    const totalServicesCost = services ? services.reduce((total, service) => total + parseFloat(service.cost), 0) : 0
    const projectPrice = parseFloat(price)

    useEffect(() => {
        if(project){
            setTitle(project.title)
            setPrice(project.price)
            setCategories(project.categories)
        }
    }, [project])

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

        if (totalServicesCost > projectPrice) {
            setFormError("Custo do serviço é maior que o orçamento do projeto!")
            setTimeout(() => {
                setFormError("");
            }, 3000);
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

    function handleSubmitService(e) {
        e.preventDefault()
        setFormError("")
    
        let newCost = totalServicesCost + Number(cost);
    
        if (!titleService || !cost || !description) {
            setFormError("Por favor, preencha todos os campos!")
            return
        }
    
        if (newCost > projectPrice) {
            setFormError("Custo do serviço é maior que o orçamento do projeto!")
            setTimeout(() => {
                setFormError("");
            }, 3000);
            return
        }
    
        if (formError) {
            return
        }
    
        const newService = {
            titleService,
            cost,
            description,
            idService: id,
        };
    
        insertDocument(newService)
            .then(() => {
                console.log("Serviço criado com sucesso!")
                
                const updatedProject = {
                    ...project,
                    cost: newCost,
                };
    
                return updateDocument(id, updatedProject)
            })
            .then(() => {
                console.log("Projeto atualizado com sucesso!")
                window.location.reload()
            })
            .catch((error) => {
                console.error("Erro durante a operação:", error)
            })
    }


    return(
        <div className={styles.containerProjectDetail}>
            <div className="returnBtn">
                <Link to="/projects">
                    <BsFillArrowLeftSquareFill/>
                </Link>
            </div>
            {loading && <Loading/>}
            {project && (
                <>
                    <div>
                        <h1>{title.toUpperCase()}</h1>
                        <button className="btnForm" onClick={toggleEditForm}>
                        {!showEditForm ? "Editar Projeto" : "Fechar"}
                        </button>
                    </div>
                    {!showEditForm ? (
                        <div>
                            <p>Categoria: {categories}</p>  
                            <p>Orçamento R$: <Numeral format="0,000.00">{price}</Numeral></p>
                            <p>Utilizado R$: <Numeral format="0,000.00">{totalServicesCost}</Numeral></p>
                            <p>Saldo do projeto R$: <Numeral format="0,000.00">{price - totalServicesCost}</Numeral></p>
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
                                <span>Descrição do serviço:</span>
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
                    {services && services.map((service, index) => (
                        <CardsServices key={`${service.idService}_${index}`} service={service} />
                    ))}
                    </div>
                )}    
            </div>
        </div>
    )
}