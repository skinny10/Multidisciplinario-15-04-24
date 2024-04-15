import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { loginRequest, registerRequest, verifyTokenRequest } from "../api/auth";
import Cookies from "js-cookie";


// Los contextos te permiten compartir datos entre componentes
// en una aplicación React sin pasar explícitamente props por el árbol de componentes.
const AuthContext = createContext();

// Este hook personalizado, useAuth, se usa para acceder al AuthContext dentro de los componentes.
// Verifica si el contexto está disponible usando useContext(AuthContext).
// Si el contexto no está disponible, lanza un error recordándole al desarrollador 
// que use este hook dentro de un AuthProvider.
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within a AuthProvider");
  return context;
};

// Este componente actúa como proveedor del AuthContext.
// Utiliza el hook useState para administrar varias variables de estado.
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  
  
  const isAdmin = (email, password) => {
    const adminUser = {
      email: 'adminUser@gmail.com',
      password: '123456'
    };

    return email === adminUser.email && password === adminUser.password;
  };



// Este useEffect se ejecuta después de cualquier cambio en el estado errors.
// Si hay errores, establece un temporizador para borrarlos después de 5 segundos.
// Esto proporciona una visualización temporal de los mensajes de error.
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);


// Esta función asíncrona maneja el registro de usuarios.
// Toma un objeto user que contiene los detalles de registro.
// Llama a la función registerRequest (presumiblemente para la llamada a la API).
// Si la llamada a la API es exitosa (código de estado 200), 
// establece los datos del usuario y lo marca como autenticado.
// En caso de errores, registra la respuesta del error y establece el mensaje de error
  const signup = async (user) => { 
    try {
      const res = await registerRequest(user);
      if (res.status === 200) {
        setUser(res.data);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.log(error.response.data);
      setErrors(error.response.data.message);
    }
  };


// Esta función asíncrona probablemente maneja el inicio de sesión del usuario.
// Toma un objeto user que contiene las credenciales de inicio de sesión.
// Intenta llamar a la función loginRequest (presumiblemente para la llamada a la API).
// Si es exitoso (falta código para verificar el éxito), establece los datos del usuario y lo marca como autenticado.
// El manejo de errores esta incompleto, actualmente solo registra errores pero no establece ningún mensaje de error.
const signin = async (user, navigate) => {
  try {
    const res = await loginRequest(user);
    setUser(res.data);
    setIsAuthenticated(true);
    return res; // Devuelve la respuesta de la API
  } catch (error) {
    console.log(error.response.data);
    setErrors(error.response.data.message);
    navigate('/'); // Vuelve a la página de inicio de sesión en caso de error
  }
};

// Esta función maneja el cierre de sesión del usuario.
// Elimina la cookie "token" usando Cookies.remove.
// Reinicia los datos del usuario y el estado de autenticación.
  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    setIsAuthenticated(false);
  };


  useEffect(() => {
    // Función para la verificación inicial de autenticación
    const checkLogin = async () => {
      // Obtiene las cookies del navegador
      const cookies = Cookies.get();

      // Si no existe la cookie "token", el usuario no está autenticado
      if (!cookies.token) {
        setIsAuthenticated(false); // Actualiza el estado de autenticación
        setLoading(false); // Finaliza la carga inicial
        return; // Sale de la función
      }
  
      // Intenta verificar el token de autenticación
      try {
        // Realiza la llamada API para verificar el token
        const res = await verifyTokenRequest(cookies.token);
        console.log(res); // Registra la respuesta en la consola
  
        // Si la respuesta no contiene datos, la autenticación falla
        if (!res.data) return setIsAuthenticated(false);
  
        // Autenticación exitosa:
        setIsAuthenticated(true); // Actualiza el estado de autenticación
        setUser(res.data); // Establece los datos del usuario
        setLoading(false); // Finaliza la carga inicial
      } catch (error) {
        // Error durante la verificación del token:
        setIsAuthenticated(false); // Marca la autenticación como falsa
        setLoading(false); // Finaliza la carga inicial
      }
    };
  
    // Llama a la función de verificación de inicio de sesión
    checkLogin();
  }, []);


  return (
    // Esta parte devuelve el componente AuthContext.Provider.
    <AuthContext.Provider
    // Proporciona todas las variables de estado administradas (user, signup, signin, etc.)
    // como valores de contexto a los componentes secundarios.
      value={{
        user,
        signup,
        signin,
        logout,
        isAuthenticated,
        errors,
        loading,
        isAdmin,
      }}
    > 
      {children} 
    </AuthContext.Provider>
    // El prop children representa los componentes que tendrán acceso a este contexto.
  );
};

export default AuthContext;
