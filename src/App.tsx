import './App.css'
import ProfilePicture from './componenets/imageComponent/profilePicture'
import profileImage from '../public/profilePicture.jpeg'

function App() {
  return (
    <>
      <div className='profile-image-container'>
        <ProfilePicture imgUri={profileImage} />
      </div>
    </>
  )
}

export default App
