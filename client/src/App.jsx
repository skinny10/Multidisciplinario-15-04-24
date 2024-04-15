import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import { ProtectedRoute } from "./routes";
import Perfil from "./Pages/Perfil.jsx";
import Home from "./Pages/Home.jsx";
import Admin from "./Pages/Admin.jsx";
import Login from "./Pages/Login.jsx";
import Register from "./Pages/Register.jsx";
import HeaderAdmin from "./components/admin/HeaderAdmin/HeaderAdmin.jsx";
import HomeAdmin from "./Pages/HomeAdmin.jsx";

function App() {
  return (
    <AuthProvider>

        <BrowserRouter>
       
            <Routes>
              
              <Route path="/" element={<Login/>} />
              <Route path="/Register" element={<Register/>}/>
              
              <Route element={<ProtectedRoute />}>
                 <Route path="/perfil" element={<Perfil/>}/>
                 <Route path="/home" element={<Home/>}/>
                 <Route path="/Admin" element={<Admin/>}/>
                 <Route path="/HomeAdmin" element={<HomeAdmin/>}/>
              </Route>

            </Routes>
       
        </BrowserRouter>
    
    </AuthProvider>
  );
}

export default App;
