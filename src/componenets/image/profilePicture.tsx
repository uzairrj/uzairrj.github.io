import './profilePicture.css'
import {motion} from 'framer-motion'

type PrimaryPictureProps = {
    imgUri: string,
    borderOnHover?: boolean,
    customClass?: string,
    customStyle?: React.CSSProperties,
    size?: string
}

function ProfilePicture({imgUri, size='25vh', borderOnHover=true, customClass='', customStyle={}}:PrimaryPictureProps){
    return (
        <motion.div className={`profile-image-container ${customClass}`} style={{...customStyle,  width: size, height: size}}
        whileInView={{width: size, height: size, transition: {duration: 1}}}
        whileHover={borderOnHover ? {border: "3.5px white dashed", scale:1.1, transition: {duration: 0.7, type: "spring", stiffness: 120}}: {}}
        >
            <img src={imgUri} className='profile-image' alt='profile'/>
        </motion.div> 
    )
}

export default ProfilePicture