import { useAuthValue } from "../../context/AuthContext"
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import Loading from "../../components/Loading"
import Cards from "../../components/Cards";
import styles from "./Projects.module.css"

export default function Projects(){
    
    const {user} = useAuthValue()
    const uid = user.uid
    const {documents: projects, loading} = useFetchDocuments("projects", uid)
    
    return(
        <div className={styles.containerProject}>
            <h1>Projetos</h1>
            <div className={styles.containerCards}>
                {loading && <Loading/>}
                {projects && projects.map((projects)=> (
                    <Cards key={projects.id} project={projects} />
                ))}
            </div>
            
        </div>
    )
}