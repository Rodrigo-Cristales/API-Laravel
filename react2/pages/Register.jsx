import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post('http://127.0.0.1:8000/api/register', formData);

      localStorage.setItem('token', data.token);

      Swal.fire({
        icon: 'success',
        title: 'Registro exitoso',
        text: '✅ Usuario registrado correctamente.',
        timer: 2000,
        background: '#21252b',
        color: 'white',
        showConfirmButton: false,
        confirmButtonColor: '#374151'
      });

      setTimeout(() => navigate('/Home'), 2000); // Redirige después de 2s
    } catch (error) {
      if (error.response && error.response.data) {
        const errorData = error.response.data;
        let errorMessage = "";

        // Extrae mensajes de error del JSON
        if (typeof errorData === 'object') {
          Object.values(errorData).forEach(errors => {
            Object.values(errors).forEach(msgArray => {
              errorMessage += `• ${msgArray.join(' ')}\n`;
            });
          });
        }

        Swal.fire({
          icon: 'error',
          title: 'Error al registrar',
          text: errorMessage || 'Ocurrió un error inesperado.',
          background: '#21252b',
          color: 'white',
          confirmButtonColor: '#374151'
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error inesperado',
          text: 'Intenta de nuevo.',
          background: '#21252b',
          color: 'white',
          confirmButtonColor: '#374151'
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-96 bg-gray-900 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl text-center text-white mb-4">Registro</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white mb-2" htmlFor="name">Nombre</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Ingresa tu nombre"
              className="w-full p-2 bg-gray-800 text-white rounded-lg"
              required
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
              required
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
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 p-2 rounded-lg text-white"
            disabled={loading}
          >
            {loading ? 'Registrando...' : 'Registrarse'}
          </button>
        </form>

        <p className="text-sm text-center mt-2 text-white">
          ¿Ya tienes cuenta? <Link to={'/login'} className="text-blue-500">Inicia sesión</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
