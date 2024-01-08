import styles from "./Footer.module.css"
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer(){
    return (
        <footer className={styles.footer}>
            <ul className={styles.socialMedia}>
                <li>
                    <FaFacebook/>
                </li>
                <li>
                    <FaInstagram/>
                </li>
                <li>
                    <FaLinkedin/>
                </li>
            </ul>
            <p className={styles.text}><span>Finance </span>©️ 2023</p>
        </footer>
    )
}