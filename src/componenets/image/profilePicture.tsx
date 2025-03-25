import { useEffect } from 'react'
import './profilePicture.css'
import {motion} from 'framer-motion'

type PrimaryPictureProps = {
    imgUri: string
}

function ProfilePicture({imgUri}:PrimaryPictureProps){
    useEffect   (()=>{
        console.log(imgUri)})
    return (
        <motion.div className="profile-image-container" 
        whileInView={{width: "25vh", height: "25vh", transition: {duration: 1}}}
        whileHover={{border: "3.5px white dashed", scale:1.1, transition: {duration: 0.7, type: "spring", stiffness: 120}}}
        >
            <img src={imgUri} className='profile-image' alt='profile'/>
        </motion.div> 
    )
}

export default ProfilePicture