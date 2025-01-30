import { useState } from 'react';

function Modal({ showModal, setShowModal, type, onSubmit, data = {} }) {
  const [formData, setFormData] = useState({
    name: data?.name || '',
    price: data?.price || '',
    category: data?.category || '',
    description: data?.description || '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Llamamos a la función que maneja el envío del formulario
    setShowModal(false); // Cerramos el modal
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    showModal && (
      <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
          <div className="flex justify-between items-center border-b pb-4 mb-4">
            <h3 className="text-lg font-semibold text-black-900">{type === 'edit' ? 'Editar Producto' : 'Nuevo Producto'}</h3>
            <button onClick={closeModal} className="text-gray-600 hover:text-gray-900">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Nombre del producto"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700">Precio</label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Precio"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">Categoría</label>
                  <select
                    id="category"
                    name="category"
                    className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    <option value="">Seleccionar categoría</option>
                    <option value="TV">TV/Monitores</option>
                    <option value="PC">PC</option>
                    <option value="GA">Gaming/Consolas</option>
                    <option value="PH">Teléfonos</option>
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción</label>
                <textarea
                  id="description"
                  name="description"
                  rows="4"
                  className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Escribe una descripción del producto"
                  value={formData.description}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium py-2 px-4 rounded-md"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700"
                >
                  {type === 'edit' ? 'Actualizar Producto' : 'Añadir Producto'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  );
}

export default Modal;
