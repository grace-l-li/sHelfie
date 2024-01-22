import { GoogleLogout } from "react-google-login";

//const clientId = ;

function Logout() {
  const onSuccess = () => {
    console.log("Logout Success!");
  };

  return (
    <div id="signOutButton">
      <GoogleLogout clientId={clientId} buttonText="Logout" onLogoutSuccess={onSuccess} />
    </div>
  );
}

export default Logout;
