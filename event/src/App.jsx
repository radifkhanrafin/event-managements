
import { Outlet } from "react-router-dom"
import "./App.css"
import Navbar from "./components/Navbar"
import Footer from "./shareComponent/footer"

function App() {
  return (<>
    <Navbar />
    <Outlet />
    <Footer />
  </>

  )
}

export default App
