import './App.css'
import ProfilePicture from './componenets/image/profilePicture'
import profileImage from '../public/profilePicture.jpeg'
import AnimatedIntroText from './componenets/text/animatedIntroText'

function App() {
  return (
    <div>
      <ProfilePicture imgUri={profileImage} />
      <div>
        <AnimatedIntroText  text='Hello World <p1>. This is new word <p2>. This is another <p3> new word'  replacements={
          {
            '<p1>': ['Blah'],
            '<p2>': ['Hello'],
            '<p3>': ['Yello']
          }
        }/>
      </div>
    </div>
  )
}

export default App
