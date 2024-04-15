import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreatePublication from './CreatePublication';
import '@fortawesome/fontawesome-free/css/all.min.css';
import "../CreatePublication/Publicacion.css"
import { useAuth } from '../../../context/authContext';

export default function Publicación() {
  const [publicaciones, setPublicaciones] = useState([]);
  const { isAuthenticated, user } = useAuth();
  console.log(isAuthenticated, user)


  useEffect(() => {
    async function fetchPublicaciones() {
      try {
        const response = await axios.get('http://localhost:5000/api/imagenes');
        setPublicaciones(response.data.data);
      } catch (error) {
        console.error('Error al obtener las publicaciones:', error.message);
      }
    }
    fetchPublicaciones();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 justify-center text-center p-4 md:p-8 gap-4 md:gap-8 mt-0">
      {/* Primer Section */}
      <div className="p-4 rounded-lg mb-4 mt-4 md:mb-8 md:mt-8">
        <main className="py-4 md:py-8">
          <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row text-center text-black">
              <CreatePublication />
            </div>
          </div>
        </main>
      </div>
      {/* Segunda sección - Contenido de las publicaciones */}
      <div className="p-4 rounded-lg mb-4 mt-4 md:mb-8 md:mt-8">
        <main className="py-4 md:py-8">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center text-black">
              <h1 className="text-3xl font-bold mb-6">Contenido de las publicaciones</h1>
              <div className="grid grid-cols-1 gap-8">
                {publicaciones.map((publicacion) => (
                  <div key={publicacion._id} className="bg-white rounded-lg shadow-md overflow-hidden flex">
                    <img
                      src={`http://localhost:5000/${publicacion.imagen}`}
                      alt={publicacion.nombre}
                      className="w-64 h-64 object-cover object-center"
                    />
                    <div className="p-4 w-1/2">
                      <h2 className="text-xl font-semibold mb-2 text-left">{publicacion.nombre}</h2>
                      <p className="text-gray-700 mb-8 mr-14">{publicacion.texto}</p>
                      <p className="text-gray-800 text-sm text-left mt--20"> {isAuthenticated && user && user.username}  </p>
                      <p className="text-gray-500 text-sm text-left mt--20">
                        Fecha: {new Date(publicacion.fecha).toLocaleDateString()}
                      </p>

           <div className="redes">

            {publicacion.facebook && (
            <a href={publicacion.facebook} target="_blank"  rel="noopener noreferrer" className=" text-blue-600 hover:text-blue-800 mr-2">
              <i className="fab fa-facebook-f text-2xl"></i> 
           </a>
           )}

           {publicacion.whatsapp && (
           <a href={publicacion.whatsapp} target="_blank" rel="noopener noreferrer"  className=" text-green-600 hover:text-green-800 mr-2">
             <i className="fab fa-whatsapp text-2xl"></i>
           </a>
            )}

           {publicacion.instagram && (
           <a href={publicacion.instagram}   target="_blank"  rel="noopener noreferrer" className="text-pink-600 hover:text-pink-800">
            <i className="fab fa-instagram text-2xl"></i>
          </a>
           )}

         </div>


                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}