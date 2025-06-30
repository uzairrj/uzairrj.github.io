
import ProfilePicture from "../image/profilePicture"
import "./header.css"

function Header() {
    return(
        <div className="header-container">
            <ProfilePicture imgUri={"/profilePicture.jpeg"} size="10vh" borderOnHover={false} customClass="header-picture"/>
            <p className="header-text">Uzair Khan</p>
        </div>
    )
}

export default Header;