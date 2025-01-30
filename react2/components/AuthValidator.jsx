import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const AuthValidator = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const { data } = await axios.post(
          "http://127.0.0.1:8000/api/refresh-token",
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if(data.msj != 'El token actual aún es válido'){
            Swal.fire({
                icon: "error",
                title: "Sesión Expirada",
                text: "Debes iniciar sesión nuevamente.",
                background: "#21252b",
                color: "white",
                confirmButtonColor: "#374151"
              });
            localStorage.removeItem("token");
        }  

      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Sesión Expirada",
          text: "Hubo un error",
          background: "#21252b",
          color: "white",
          confirmButtonColor: "#374151"
        });
        localStorage.removeItem("token");
        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    };

    validateToken();
  }, [navigate]);

  if (isLoading) {
    return <div className="text-center text-white">Verificando sesión...</div>;
  }

  return children;
};

export default AuthValidator;
