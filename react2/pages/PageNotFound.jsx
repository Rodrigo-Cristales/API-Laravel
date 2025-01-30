import { Link } from 'react-router-dom';
const NotFound = () => {
    return (
      <div className="text-center mt-10">
        <h1 className="text-8xl font-bold">404</h1>
        <p className="text-xl">Página no encontrada</p>
         <p className="text-sm text-center mt-2 text-white">
            <Link to={'/login'}  className="text-red-500 underline">Volver Al Login</Link>
         </p>
      </div>
    );
  };
  
  export default NotFound;
  