import { useState, useEffect } from "react"
import useAuthentication from "../../hooks/useAuthentication"
import styles from "./Register.module.css"

export default function Register(){

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")
    const {createUser, error: authError, loading} = useAuthentication()

    const handleSubmit = async (e) =>{
        e.preventDefault()

        setError("")

        const user = {
            name,
            email,
            password
        }
        console.log(user)

        if (name.trim() === "" || email.trim() === "" || password.trim() === "") {
            setError("Preencha todos os campos");
            return;
           } else if (password !== confirmPassword) {
            setError("As senhas precisam ser iguais!");
            return;
           }
    
        const res = await createUser(user)
        console.log(res)
    }

    useEffect(() => {
      
        if(authError){
            setError(authError)
        }
    
    }, [authError])

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
                {!loading && <button className="btnForm">Cadastrar</button>}
                {loading && <button className="btnForm">Aguarde...</button>}
            </form>
            {error && <h4 className="err">{error}</h4>}
        </div>
    )
}