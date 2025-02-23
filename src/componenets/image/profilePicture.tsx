import './profilePicture.css'

type PrimaryPictureProps = {
    imgUri: string
}

function ProfilePicture({imgUri}:PrimaryPictureProps){
    return (
        <div className='profile-image-container'>
            <img src={imgUri}  className='profileImage'/>
        </div> 
    )
}

export default ProfilePicture