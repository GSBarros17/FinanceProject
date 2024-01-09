import styles from "./SectionContainer.module.css"
import { BsCheckLg } from "react-icons/bs"

export default function SectionContainer({img , altText, text1, text2}){
    return (
        <div className={styles.containerSection}>
            <div>
                <p><span><BsCheckLg/></span>{text1}</p>
                <p><span><BsCheckLg/></span>{text2}</p>
            </div>
            <div>
                <img src={img} alt={altText} />
            </div>
        </div>   
    )
}