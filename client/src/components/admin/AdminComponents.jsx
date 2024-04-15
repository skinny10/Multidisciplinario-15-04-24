import React, { useState, useEffect, Fragment } from 'react';
import HeaderAdmin from './HeaderAdmin/HeaderAdmin';
import bcrypt from 'bcryptjs';
import { Dialog, Transition } from '@headlessui/react';
import "../admin/AdminComponents.css"

const AdminComponents = () => {
  const [userData, setUserData] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editedUserData, setEditedUserData] = useState({
    username: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    const apiUrl = 'http://localhost:4000/api/auth/users';

    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = (userId) => {
    setSelectedUserId(userId);
    setIsDialogOpen(true);
  };

  const handleEdit = (userId) => {
    const selectedUser = userData.find((user) => user._id === userId);
    setSelectedUserId(userId);
    setEditedUserData({
      username: selectedUser.username,
      email: selectedUser.email,
      password: selectedUser.password,
    });
    setIsEditDialogOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const confirmDelete = async () => {
    try {
      if (!selectedUserId) {
        console.error('No user selected for deletion');
        return;
      }

      const apiUrl = `http://localhost:4000/api/auth/users/${selectedUserId}`;

      const response = await fetch(apiUrl, { method: 'DELETE' });

      if (!response.ok) {
        throw new Error(`Failed to delete user: ${response.status}`);
      }

      setUserData(userData.filter((user) => user._id !== selectedUserId));

      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const confirmEdit = async () => {
    try {
      if (!selectedUserId) {
        console.error('No user selected for edit');
        return;
      }

      const apiUrl = `http://localhost:4000/api/auth/users/${selectedUserId}`;

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(editedUserData.password, saltRounds);

      const editedUserWithHashedPassword = {
        ...editedUserData,
        password: hashedPassword,
      };

      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedUserWithHashedPassword),
      });

      if (!response.ok) {
        throw new Error(`Failed to edit user: ${response.status}`);
      }

      setUserData((prevUserData) =>
        prevUserData.map((user) =>
          user._id === selectedUserId ? { ...user, ...editedUserData } : user
        )
      );

      setIsEditDialogOpen(false);
    } catch (error) {
      console.error('Error editing user:', error);
    }
  };

  return (  
   

    <>
 
    <div className='header'>
    <HeaderAdmin/>
    </div>
     
    <div className="bg-white bg-auto min-h-screen   md:bg-left lg:bg-right">
    <div className="container mx-auto p-8  bg-white ">
        <h1 className="text-2xl font-bold mb-4 text-black">Tabla de usuarios</h1>
        <div className="overflow-x-auto shadow-lg">
          <table className="min-w-full bg-white text-gray-800 rounded-md">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Username</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Password</th>
                <th className="py-2 px-4 border-b">Creado en</th>
                <th className="py-2 px-4 border-b">Actualizado en</th>
                <th className="py-2 px-4 border-b">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {userData.map((user) => (
                <tr key={user._id}>
                  <td className="py-2 px-4 border-b">{user._id}</td>
                  <td className="py-2 px-4 border-b">{user.username}</td>
                  <td className="py-2 px-4 border-b">{user.email}</td>
                  <td className="py-2 px-4 border-b">{user.password}</td>
                  <td className="py-2 px-4 border-b">{user.createdAt}</td>
                  <td className="py-2 px-4 border-b">{user.updatedAt}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="bg-red-500 text-white hover:bg-red-700 px-3 py-2 rounded-md mx-1 mt-2"
                    >
                      Eliminar
                    </button>
                    <button
                      onClick={() => handleEdit(user._id)}
                      className="bg-blue-500 text-white hover:bg-blue-700 px-3 py-2 rounded-md mx-1 mt-2"
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Diálogo de confirmación para eliminar */}
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

      {/* Diálogo de edición de usuario */}
      <Transition show={isEditDialogOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => setIsEditDialogOpen(false)}
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
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white text-black shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Editar usuario
                </Dialog.Title>
                <div className="mt-2">
                  <form onSubmit={(e) => { e.preventDefault(); confirmEdit(); }}>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                      Nombre de usuario
                    </label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={editedUserData.username}
                      onChange={handleChange}
                      required
                      className="mt-1 p-2 border rounded-md w-full"
                    />

                    <label htmlFor="email" className="block mt-2 text-sm font-medium text-gray-700">
                      Correo electrónico
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={editedUserData.email}
                      onChange={handleChange}
                      required
                      className="mt-1 p-2 border rounded-md w-full"
                    />

                    <label htmlFor="password" className="block mt-2 text-sm font-medium text-gray-700">
                      Contraseña
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={editedUserData.password}
                      onChange={handleChange}
                      required
                      className="mt-1 p-2 border rounded-md w-full"
                    />

                    <div className="mt-4">
                      <button
                        type="submit"
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                      >
                        Guardar cambios
                      </button>
                      <button
                        type="button"
                        className="ml-3 inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 border border-transparent rounded-md hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                        onClick={() => setIsEditDialogOpen(false)}
                      >
                        Cancelar
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
  
    </div>
    
    

    </>
  );
};

export default AdminComponents;
