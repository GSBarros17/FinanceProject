import { useAuthValue } from "../../context/AuthContext"
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { Link } from "react-router-dom";
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
            {projects && projects.length === 0 ? (
                <div className={styles.noPosts}>
                    <p>Você não possui projetos</p>
                    <Link className="btnForm" to="/CreatePost">Criar primeiro post</Link>
                </div>
            ) : (
                <div className={styles.containerCards}>
                {loading && <Loading/>}
                {projects && projects.map((project)=> (
                    <Cards key={project.id} project={project} />
                ))}
                </div>
            )}    
        </div>
    )
}