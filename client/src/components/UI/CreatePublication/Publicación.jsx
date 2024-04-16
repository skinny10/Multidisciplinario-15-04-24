import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import CreatePublication from './CreatePublication';
import '@fortawesome/fontawesome-free/css/all.min.css';
import "../CreatePublication/Publicacion.css"
import { useAuth} from '../../../context/authContext';
import { Dialog, Transition } from '@headlessui/react';

export default function Publicación() {
  const [userData, setUserData] = useState([]);
  const [publicaciones, setPublicaciones] = useState([]);
  const { isAuthenticated, user } = useAuth();
  console.log(isAuthenticated, user)
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDelete = () => {
    setPublicaciones(publicaciones);
    setIsDialogOpen(true);
  };


  const confirmDelete = async () => {
    try {
      if (!publicaciones) {
        console.error('No user selected for deletion');
        return;
      }

      const apiUrl = `http://localhost:4000/api/auth/users/${publicaciones}`;

      const response = await fetch(apiUrl, { method: 'DELETE' });

      if (!response.ok) {
        throw new Error(`Failed to delete user: ${response.status}`);
      }

      setPublicaciones(userData.filter((user) => user._id !== selectedUserId));

      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };



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
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="bg-red-500 text-white hover:bg-red-700 px-3 py-2 rounded-md mx-1 mt-2"
                    >
                      Eliminar
                    </button>

                      <h2 className="text-xl font-semibold mb-2 text-left">{publicacion.nombre}</h2>
                      <p className="text-gray-700 mb-8 mr-14">{publicacion.texto}</p>
                      <p className="text-gray-800 text-sm text-left mt--20"> {isAuthenticated && user && publicacion.userdueno}  </p>
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

      <Transition show={isDialogOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => setIsDialogOpen(false)}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
            </Transition.Child>

            <span className="inline-block h-screen align-middle">&#8203;</span>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-black shadow-xl rounded-2xl text-white">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6"
                >
                  Confirmar eliminación
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm">
                    ¿Estás seguro de que deseas eliminar este usuario?
                  </p>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-500 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={confirmDelete}
                  >
                    Eliminar
                  </button>
                  <button
                    type="button"
                    className="ml-3 inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 border border-transparent rounded-md hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}