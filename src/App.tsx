import './App.css'
import Footer from './componenets/text/footer'
import NavBar from './componenets/miscellaneous/navBar'
import Home from './pages/home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Education from './pages/education'
import Header from './componenets/miscellaneous/header'

function App() {
  return (
    <BrowserRouter>
      <div className="center-container">
        <div style={{flex:1, width:"100%"}}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/education" element={<Header><Education /></Header>} />
          </Routes>
        </div>
        <NavBar />
        <Footer />
      </div>
    </BrowserRouter>  
  )
}

export default App
