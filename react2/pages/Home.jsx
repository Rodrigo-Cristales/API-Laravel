import React, { useState } from "react";
import AuthValidator from "../components/AuthValidator";

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí podrías manejar el envío de los datos
    console.log("Formulario enviado:", formData);
    setIsModalOpen(false);
  };

  return (
    <>
      <AuthValidator>
        <div className="container mx-auto p-4">
          {/* Botón para abrir el modal */}
          <button
            onClick={handleModalOpen}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Abrir Formulario
          </button>

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
                <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                  <td className="px-6 py-4">Juan Pérez</td>
                  <td className="px-6 py-4">juan@email.com</td>
                  <td className="px-6 py-4">
                    <button
                      className="px-3 py-1 bg-gray-600 text-white rounded-lg text-xs"
                    >
                      Editar
                    </button>
                    <button
                      className="px-3 py-1 bg-red-600 text-white rounded-lg text-xs ml-2"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
                {/* Puedes agregar más filas aquí */}
              </tbody>
            </table>
          </div>

          {/* Modal con Formulario */}
          {isModalOpen && (
            <div
              className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50"
              onClick={handleModalClose}
            >
              <div
                className="bg-white p-8 rounded-lg shadow-lg w-96"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-xl font-bold mb-4 text-gray-800">Formulario de Usuario</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Nombre
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Correo
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={handleModalClose}
                      className="px-4 py-2 bg-gray-400 text-white rounded-lg"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg"
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
    </>
  );
}

export default Home;
