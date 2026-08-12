import './App.css'
import VerticalNav from './componenets/miscellaneous/verticalNav'
import Home from './pages/home'
import Education from './pages/education'
import Experience from './pages/experience'
import Teaching from './pages/teaching'
import Publications from './pages/publications'
import Reviewer from './pages/reviewer'
import Honors from './pages/honors'
import Skills from './pages/skills'
import Footer from './componenets/text/footer'

function App() {
  return (
    <div className="center-container">
      <VerticalNav />
      <div id="section-home">         <Home />         </div>
      <div id="section-education">    <Education />    </div>
      <div id="section-experience">   <Experience />   </div>
      <div id="section-teaching">     <Teaching />     </div>
      <div id="section-publications"> <Publications /> </div>
      <div id="section-reviewer">     <Reviewer />     </div>
      <div id="section-honors">       <Honors />       </div>
      <div id="section-skills">       <Skills />       </div>
      <Footer />
    </div>
  )
}

export default App
