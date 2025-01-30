import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gray-700 fixed w-full z-20 top-0 start-0 fixed w-full z-20 top-0 left-0 shadow-lg p-4">
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
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
