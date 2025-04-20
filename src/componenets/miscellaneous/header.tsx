
import ProfilePicture from "../image/profilePicture"
import "./header.css"

function Header({children}: {children: React.ReactNode}) {
    return(
        <div className="header-container">
            <ProfilePicture imgUri={"/profilePicture.jpeg"} size="10vh" borderOnHover={false} customClass="header-picture"/>
            <div style={{flex: 1}}>
                {children}
            </div>
        </div>
    )
}

export default Header;