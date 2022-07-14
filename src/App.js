import logo from './logo.svg';
import './App.css';
import Nav from "./components/header"
import Login from "./pages/login"
import Modal from "./components/Modal"
import { AuthProvider } from "./context/AuthContext"
import MyRoutes from "./router"
import "./assets/style/global.css"

function App() {
  return (
    <>
    
    <AuthProvider>
      <MyRoutes></MyRoutes>
    </AuthProvider>
    </>
  );
}

export default App;
