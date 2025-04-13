import "./socialBar.css"
import {motion} from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faGithub, faKaggle, faHackerrank, faLinkedin, faGoogleScholar} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

function SocialBar () {
    return (
        <motion.div className="social-bar" initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 1}}>
            <motion.a href="mailto:uzair.khan@univr.it" target="_blank" rel="noreferrer" whileHover={{scale: 1.1, color: "rgb(255, 255, 255)", transition:{duration:0.5, type:"spring", stiffness:120}}} >
                <FontAwesomeIcon icon={faEnvelope} />
            </motion.a>
            <motion.a href="https://www.facebook.com/uzairkhan1199/" target="_blank" rel="noreferrer" whileHover={{scale: 1.1, color: "rgb(255, 255, 255)", transition:{duration:0.5, type:"spring", stiffness:120}}} >
                <FontAwesomeIcon icon={faFacebook} />
            </motion.a>
            <motion.a href="https://www.instagram.com/uzairhkhan/" target="_blank" rel="noreferrer" whileHover={{scale: 1.1, color: "rgb(255, 255, 255)", transition:{duration:0.5, type:"spring", stiffness:120}}} >
                <FontAwesomeIcon icon={faInstagram} />
            </motion.a>
            <motion.a href="https://github.com/uzairrj" target="_blank" rel="noreferrer" whileHover={{scale: 1.1, color: "rgb(255, 255, 255)", transition:{duration:0.5, type:"spring", stiffness:120}}} >
                <FontAwesomeIcon icon={faGithub} />
            </motion.a>
            <motion.a href="https://www.kaggle.com/uzairrj" target="_blank" rel="noreferrer" whileHover={{scale: 1.1, color: "rgb(255, 255, 255)", transition:{duration:0.5, type:"spring", stiffness:120}}} >
                <FontAwesomeIcon icon={faKaggle} />
            </motion.a>
            <motion.a href="https://www.hackerrank.com/uzairrj" target="_blank" rel="noreferrer" whileHover={{scale: 1.1, color: "rgb(255, 255, 255)", transition:{duration:0.5, type:"spring", stiffness:120}}} >
                <FontAwesomeIcon icon={faHackerrank} />
            </motion.a>
            <motion.a href="https://www.linkedin.com/in/uzairkhan42/" target="_blank" rel="noreferrer" whileHover={{scale: 1.1, color: "rgb(255, 255, 255)", transition:{duration:0.5, type:"spring", stiffness:120}}} >
                <FontAwesomeIcon icon={faLinkedin} />
            </motion.a>
            <motion.a href="https://www.linkedin.com/in/uzairkhan42/" target="_blank" rel="noreferrer" whileHover={{scale: 1.1, color: "rgb(255, 255, 255)", transition:{duration:0.5, type:"spring", stiffness:120}}} >
                <FontAwesomeIcon icon={faGoogleScholar} />
            </motion.a>
        </motion.div>
    )
}

export default SocialBar;