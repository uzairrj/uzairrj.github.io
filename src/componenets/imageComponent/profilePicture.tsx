import './profilePicture.css'

type PrimaryPictureProps = {
    imgUri: string
}

function ProfilePicture({imgUri}:PrimaryPictureProps){
    return (
        <div>
            <img src={imgUri}  className='profileImage'/>
        </div> 
    )
}

export default ProfilePicture