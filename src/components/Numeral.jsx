import numeral from "numeral"
import styles from "./Numeral.module.css"

export default function Numeral({children, format}){
    return(
        <span className={styles.number}>
            {numeral(children).format(format)}
        </span>
    )
}