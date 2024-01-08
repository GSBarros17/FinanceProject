import { useState } from "react"
import styles from "./Register.module.css"

export default function Register(){

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")

    const handleSubmit = async (e) =>{
        e.preventDefault()

        setError("")
    }

    return(
        <div className={styles.registerContainer}>
            <h1>Cadastre-se no <span>Finance Project</span></h1>
            <p>Crie projetos e acompanhe o seu desenvolvimento!</p>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Nome:</span>
                    <input 
                        type="text" 
                        name="nameUser"
                        placeholder="Digite seu nome completo"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <label>
                    <span>E-mail:</span>
                    <input 
                        type="email" 
                        name="emailUser" 
                        placeholder="Digite seu e-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <label>
                    <span>Senha:</span>
                    <input 
                        type="password"
                        name="passwordUser" 
                        placeholder="Digite sua senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <label>
                    <span>Confirmação de senha:</span>
                    <input 
                        type="password"
                        name="confirmPasswordUser" 
                        placeholder="Confirme a sua senha"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </label>
                <button className="btnForm">Cadastrar</button>
            </form>
            {error}
        </div>
    )
}