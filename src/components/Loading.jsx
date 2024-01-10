import styles from "./Loading.module.css"
import Loader from "../img/loading.svg"


export default function Loading(){
    return(
        <div className={styles.loaderContainer}>
            <img className={styles.loaderImg} src={Loader} alt="Loading"/>
        </div>
    )
}