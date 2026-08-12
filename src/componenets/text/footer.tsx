import "./footer.css";
import { motion } from "framer-motion";

function Footer() {
  return (
    <footer className="footer">
      <p>
        Designed and developed by me.{" "}
        <motion.a
          className="source-code"
          href="https://github.com/uzairrj/uzairrj.github.io"
          target="_blank"
          rel="noreferrer"
          whileHover={{ scale: 1.05 }}
        >
          source code
        </motion.a>
      </p>
    </footer>
  );
}

export default Footer;