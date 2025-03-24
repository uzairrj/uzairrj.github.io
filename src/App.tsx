import './App.css'
import ProfilePicture from './componenets/image/profilePicture'
import AnimatedIntroText from './componenets/text/animatedIntroText'

function App() {
  return (
    <div className="center-container">
      <ProfilePicture imgUri={"/profilePicture.jpeg"} />
      <div className='intro-text'>
        <AnimatedIntroText  text="I'm <name>, a <p1> with a passion for <p2>, transforming <p3> into real-world impact through intelligent systems that <p4> and <p5>."  replacements={
          {
            '<p1>': [
              "AI Engineer",
              "Deep Learning Researcher",
              "Robotics Innovator",
              "Ph.D. in Predictive Maintenance",
              "Full-Stack Developer",
              "Industrial Data Scientist",
              "Machine Learning Architect"
            ],
            '<p2>':  [
              "solving real-world problems",
              "pushing the boundaries of automation",
              "building next-gen solutions",
              "exploring the frontiers of intelligence",
              "turning theory into applications",
              "crafting scalable AI",
              "decoding complexity with code"
            ],
            '<p3>': [
              "deep learning",
              "robotics",
              "predictive maintenance",
              "industrial AI",
              "computer vision",
              "neural networks",
              "smart automation"
            ],
            '<p4>': [
              "reduce downtime",
              "optimize efficiency",
              "enhance reliability",
              "predict failures",
              "automate complexity",
              "unlock performance"
            ],
            '<p5>':  [
              "shape the future",
              "reimagine industries",
              "empower innovation",
              "drive smarter decisions",
              "redefine possibilities",
              "accelerate progress"
            ],
            '<name>': ["Uzair Khan"]
          }
        }/>
      </div>
    </div>
  )
}

export default App
