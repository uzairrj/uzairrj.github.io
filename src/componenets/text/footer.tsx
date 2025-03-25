import "./footer.css"
import { motion } from "motion/react";

function Footer () {
    return (
        <div className="footer">
            <p>Designed and devloped by me.&nbsp;
                <motion.a className="source-code" href="https://github.com/uzairrj/uzairrj.github.io" target="_blank"
                    whileHover={{ color: "rgb(255, 255, 255)" }}
                >source code</motion.a></p>
        </div>
    )
}

export default Footer;