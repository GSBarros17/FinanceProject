import { useState } from "react"
import styles from "./CreateProject.module.css"

export default function CreateProject(){
    
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("null")
    const [categories, setCategories] = useState("")
    const [formError, setFormError] = useState("")

    const handleSubmit = (e) =>{
        e.preventDefault()
        setFormError("")
       
    }

    return(
        <div className={styles.containerCreateProject}>
            <h1>Criar Projeto</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Titulo do Projeto:</span>
                    <input 
                        type="text"
                        name="Name_project" 
                        placeholder="Digite o nome do projeto"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
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
                <button className="btnForm">Cadastrar</button>
            </form>
            {formError && <h4 className="err">{formError}</h4>}
        </div>
    )
}