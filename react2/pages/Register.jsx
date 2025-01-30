import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      alert('Usuario registrado exitosamente');
    } catch (error) {
      alert('Error al registrar: ' + error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="w-96 bg-gray-900 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl text-center text-white mb-4">Registro</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white mb-2" htmlFor="username">Nombre</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Ingresa tu nombre"
              className="w-full p-2 bg-gray-800 text-white rounded-lg"
            />
          </div>

          <div className="mb-4">
            <label className="block text-white mb-2" htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Ingresa tu correo"
              className="w-full p-2 bg-gray-800 text-white rounded-lg"
            />
          </div>

          <div className="mb-4">
            <label className="block text-white mb-2" htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Crea una contraseña"
              className="w-full p-2 bg-gray-800 text-white rounded-lg"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 p-2 rounded-lg text-white"
          >
            Registrarse
          </button>
        </form>

        <p className="text-sm text-center mt-2 text-white">
          ¿Ya tienes cuenta? <Link to={'/login'}  className="text-blue-500">Inicia sesión</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
