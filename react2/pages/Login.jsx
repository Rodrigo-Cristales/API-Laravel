import React from 'react';

const LoginForm = () => {
  return (
    <div className="rounded-lg px-6 py-8">
      <form className="max-w-md mx-auto p-6 bg-gray-900 rounded-lg shadow-lg loginForm dark:bg-gray-800">
        <h2 className="text-2xl text-center text-white mb-4">Login</h2>

        <div className="mb-4">
          <label className="block text-white mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full p-2 bg-gray-800 text-white rounded-lg"
            placeholder="Ingresa tu email"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-white mb-2">Password:</label>
          <input
            type="password"
            id="password"
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
          ¿Aún no tienes una cuenta? | <a href="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">¡Regístrate!</a>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
