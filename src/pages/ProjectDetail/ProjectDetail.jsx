import { useParams } from "react-router-dom"
import { useFetchDocument } from "../../hooks/useFetchDocument"
import Loading from "../../components/Loading"
import styles from "./ProjectDetail.module.css"

export default function ProjectDetail(){
    
    const { id } = useParams()
    const {document: project, loading} = useFetchDocument("projects", id)
    
    return(
        <div className={styles.containerProjectDetail}>
            {loading && <Loading/>}
            {project && (
                <h1>{project.title}</h1>
            )}
            
        </div>
    )
}