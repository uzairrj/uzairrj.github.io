import './App.css'
import Footer from './componenets/text/footer'
import NavBar from './componenets/miscellaneous/navBar'
import Home from './pages/home'

function App() {
  return (
    <div className="center-container">
      <Home></Home>
      <NavBar></NavBar>
      <Footer></Footer>
    </div> 
  )
}

export default App
