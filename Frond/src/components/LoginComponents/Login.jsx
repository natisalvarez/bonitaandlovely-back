import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  const { user, isAuthenticated, isLoading } = useAuth0();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Enviamos la solicitud POST aquí
      await loginWithRedirect()
      if(isAuthenticated){
        const userData = {
          name: user.name,
          email: user.email
        }
        const response = await axios.post('/cliente', userData);
        const data = await response.json();
        console.log(data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  if(isAuthenticated){
    return(
        <div></div>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <button className="mr-2" type="submit"><strong>Iniciar Sesion</strong></button>
    </form>
  );
};

export default LoginButton;