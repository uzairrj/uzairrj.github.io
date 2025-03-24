import { useEffect } from 'react'
import './profilePicture.css'

type PrimaryPictureProps = {
    imgUri: string
}

function ProfilePicture({imgUri}:PrimaryPictureProps){
    useEffect   (()=>{
        console.log(imgUri)})
    return (
        <div className="profile-image-container">
            <img src={imgUri} className='profile-image' alt='profile'/>
        </div> 
    )
}

export default ProfilePicture