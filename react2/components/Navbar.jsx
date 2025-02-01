import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

function Navbar() {
  const navigate = useNavigate()
  const token = localStorage.getItem('token');

  const handleLogout = async () => {
    try {
      
      const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: '¿Deseas cerrar sesión?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, cerrar sesión',
        cancelButtonText: 'No, cancelar',
        cancelButtonColor: '#b0454c',
        confirmButtonColor: '#1e553c',
        reverseButtons: true, 
        background: '#21252b',
        color: 'white',
      });
  
    
      if (result.isConfirmed) {
        // Obtener el token del localStorage
        const token = localStorage.getItem('token');
        if (!token) {
          Swal.fire({
            icon: 'warning',
            title: 'No has iniciado sesión',
            text: 'Por favor, inicia sesión antes de cerrar sesión.',
          });
          return;
        }
  
        // Realizar la solicitud de logout
        const response = await axios.post(
          'http://localhost:8000/api/logout',
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        localStorage.removeItem('token');
        localStorage.removeItem('expires_at');

        Swal.fire({
          icon: 'success',
          text: '✅ Cerrando Sesión...',
          timer: 2000,
          background: '#21252b',
          color: 'white',
          showConfirmButton: false,
        });
  
        navigate('/login');
      }
    } catch (error) {
      // Mostrar SweetAlert de error
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al cerrar sesión.',
        timer: 2000,
        background: '#21252b',
        color: 'white',
        showConfirmButton: false,
      });
    }
  };
  

  return (
    <nav className="bg-gray-700 fixed w-full z-20 top-0 start-0 shadow-lg p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/Home" className="flex items-center space-x-2 text-white text-2xl font-semibold hover:text-yellow-300">
          <img
            src="../src/assets/LogoKodigo.png" // Reemplaza con la URL de tu logo
            alt="Logo Kodigo"
            className="h-16"
          />
          <span>Kodigo</span>
        </Link>
        <ul className="flex space-x-6 ml-auto">
          <li>
            <Link
              to="/Home"
              className="text-white text-lg hover:text-yellow-300 transition-colors duration-300"
            >
              Home
            </Link>
          </li>
          
          {token && (
            <li>
              <Link
                to="/estadisticas"
                className="text-white text-lg hover:text-yellow-300 transition-colors duration-300 outline-none pe-5"
              >
                Estadísticas
              </Link>

              <Link
                onClick={handleLogout}
                className="text-white text-lg hover:text-yellow-300 transition-colors duration-300 outline-none"
              >
                Salir
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
