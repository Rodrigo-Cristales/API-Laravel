import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthValidator from "../components/AuthValidator";

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [users, setUsers] = useState([]);
  const [editUserId, setEditUserId] = useState(null);
  const navigate = useNavigate();

  // Cargar los usuarios al cargar la página
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Asumiendo que tienes un token en localStorage
        },
      });
      setUsers(response.data.user);
    } catch (error) {
      console.error("Error al obtener usuarios", error);
    }
  };

  const handleModalOpen = (user = null) => {
    if (user) {
      setFormData({ name: user.name, email: user.email });
      setEditUserId(user.id);
    } else {
      setFormData({ name: "", email: "" });
      setEditUserId(null);
    }
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setFormData({ name: "", email: "" });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editUserId) {
        // Editar usuario existente
        await axios.put(`http://127.0.0.1:8000/api/users/${editUserId}`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
      } else {
        // Crear nuevo usuario
        await axios.post("http://127.0.0.1:8000/api/users", formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
      }
      fetchUsers(); // Volver a cargar los usuarios después de la operación
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error al guardar el usuario", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchUsers(); // Volver a cargar los usuarios después de eliminar
    } catch (error) {
      console.error("Error al eliminar el usuario", error);
    }
  };

  return (
    <AuthValidator>
      <div className="container mx-auto pt-8 mt-6">
        {/* Botón para abrir el modal */}
        {/* <button
          onClick={() => handleModalOpen()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Abrir Formulario
        </button> */}

        {/* Tabla */}
        <div className="overflow-x-auto mt-4">
          <table className="table-auto w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">Nombre</th>
                <th scope="col" className="px-6 py-3">Correo</th>
                <th scope="col" className="px-6 py-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                  <td className="px-6 py-4">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleModalOpen(user)}
                      className="px-3 py-1 bg-gray-600 text-white rounded-lg text-xs"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded-lg text-xs ml-2"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal con Formulario */}
        {isModalOpen && (
          <div
            className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50"
            onClick={handleModalClose} // Cierra el modal si haces clic fuera del formulario
          >
            <div
              className="bg-gray-800 p-8 rounded-lg shadow-lg w-96 text-white"
              onClick={(e) => e.stopPropagation()} // Impide que el clic en el formulario cierre el modal
            >
              <h2 className="text-xl font-bold mb-4">Formulario de Usuario</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium">
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md bg-transparent text-gray-800 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium">
                    Correo
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md bg-transparent text-gray-800 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    disabled
                  />
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    type="button"
                    onClick={handleModalClose}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition duration-300"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition duration-300"
                  >
                    Enviar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}


      </div>
    </AuthValidator>
  );
}

export default Home;
