import { AuthProvider } from "./contexts/AuthContext"
import AppRouter from "./components/AppRouter"
import DemoData from "./components/DemoData"
import "./App.css"

function App() {
  return (
    <AuthProvider>
      <DemoData />
      <div className="min-h-screen bg-gray-50">
        <AppRouter />
      </div>
    </AuthProvider>
  )
}

export default App
