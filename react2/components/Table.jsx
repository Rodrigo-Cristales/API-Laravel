import { useState } from 'react';

function Table({ data, onEdit, onDelete }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentRow, setCurrentRow] = useState(null);

  const openEditModal = (row) => {
    setCurrentRow(row);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (index) => {
    setCurrentRow({ ...data[index], index }); // Guardamos el índice junto con los datos
    setIsDeleteModalOpen(true);
  };

  const closeModals = () => {
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
    setCurrentRow(null);
  };

  const handleEditSubmit = (updatedData) => {
    onEdit(currentRow.index, updatedData); // Pasa los datos actualizados y el índice
    closeModals();
  };

  const handleDeleteConfirm = () => {
    onDelete(currentRow.index); // Eliminar la fila
    closeModals();
  };

  return (
    <div>
      <table className="min-w-full table-auto mt-6">
        <thead>
          <tr>
            <th className="px-4 py-2">Nombre</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{row.name}</td>
              <td className="border px-4 py-2">{row.email}</td>
              <td className="border px-4 py-2">
                <button onClick={() => openEditModal(row)} className="text-yellow-500">Editar</button>
                <button onClick={() => openDeleteModal(index)} className="text-red-500 ml-4">Borrar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal de Edición */}
      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-xl font-semibold mb-4">Editar Usuario</h2>
            <div>
              <label className="block mb-2">Nombre</label>
              <input
                type="text"
                defaultValue={currentRow?.name}
                onChange={(e) => setCurrentRow({ ...currentRow, name: e.target.value })}
                className="border px-4 py-2 w-full mb-4"
              />
              <label className="block mb-2">Email</label>
              <input
                type="email"
                defaultValue={currentRow?.email}
                onChange={(e) => setCurrentRow({ ...currentRow, email: e.target.value })}
                className="border px-4 py-2 w-full mb-4"
              />
              <div className="flex justify-end">
                <button onClick={closeModals} className="bg-gray-500 text-white px-4 py-2 mr-4">Cancelar</button>
                <button
                  onClick={() => handleEditSubmit(currentRow)}
                  className="bg-blue-500 text-white px-4 py-2"
                >
                  Guardar Cambios
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Confirmación de Eliminación */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-xl font-semibold mb-4">¿Estás seguro de eliminar este usuario?</h2>
            <div className="flex justify-end">
              <button onClick={closeModals} className="bg-gray-500 text-white px-4 py-2 mr-4">Cancelar</button>
              <button
                onClick={handleDeleteConfirm}
                className="bg-red-500 text-white px-4 py-2"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Table;
