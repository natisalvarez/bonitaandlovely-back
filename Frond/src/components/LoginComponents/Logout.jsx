import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout } = useAuth0();
  const { user, isAuthenticated, isLoading } = useAuth0();
  if(!isAuthenticated){
    return(
        <div></div>
    )
  }
  return (
    <button className="ml-2" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
        <strong>Log out</strong>
    </button>
  );
};

export default LogoutButton;