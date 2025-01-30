import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/login', { 
        email,
        password
      });

      const { access_token, expires_at } = response.data;

      localStorage.setItem('token', access_token);
      localStorage.setItem('expires_at', expires_at);

      Swal.fire({
        icon: 'success',
        title: 'Inicio de Sesión',
        text: '✅ Ingresando...',
        timer: 2000,
        background: '#21252b',
        color: 'white',
        showConfirmButton: false,
        confirmButtonColor: '#374151'
      });

      navigate('/Home');

    } catch (error) {
      if (error.response && error.response.status === 401) {
        Swal.fire({
                  icon: 'error',
                  title: 'Inicio de Sesión',
                  text: 'Credenciales incorrectas.',
                  background: '#21252b',
                  color: 'white',
                  confirmButtonColor: '#374151'
                });
      } else {
       Swal.fire({
                 icon: 'error',
                 title: 'Error',
                 text: 'Intenta de nuevo.',
                 background: '#21252b',
                 color: 'white',
                 confirmButtonColor: '#374151'
               });
      }
    }
  };

  return (
    <div className="rounded-lg px-6 py-8">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-gray-900 rounded-lg shadow-lg loginForm dark:bg-gray-800">
        <h2 className="text-2xl text-center text-white mb-4">Login</h2>

        <div className="mb-4">
          <label className="block text-white mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 bg-gray-800 text-white rounded-lg"
            placeholder="Ingresa tu email"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-white mb-2">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 bg-gray-800 text-white rounded-lg"
            placeholder="Ingresa tu contraseña"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 p-2 rounded-lg text-white"
        >
          Login
        </button>
        <br /><br />
        <p className="text-sm font-light text-white dark:text-gray-400">
          ¿Aún no tienes una cuenta? | <Link to="/" className="font-medium text-primary-600 hover:underline dark:text-primary-500">¡Regístrate!</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
