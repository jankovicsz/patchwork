import { Link } from "react-router-dom";
import auth, { AuthenticationProvider } from "../firebase/auth";
import { useState, useEffect } from "react";

export default function GoogleLogin() {
  const [googleAlertType, setGoogleAlertType] = useState("");
  const [googleAlertText, setGoogleAlertText] = useState("");
  const [googleUser, setGoogleUser] = useState(null);

  useEffect(() => {
    auth()
      .onAuthStateChanged((user) => {
        if (user) {
            setGoogleUser(user);
            console.log(googleUser);
        }
      });
  }, [ googleUser, setGoogleUser ]);

  function googleButtonHandler() {
    auth()
      .signInWithPopup(AuthenticationProvider)
      .then((result) => {
        setGoogleAlertText(
          "Sikeres bejelentkezés. Felhasználó név: " +
            result.user.displayName
        );
        setGoogleAlertType("success");
        console.log(result);
      })
      .catch((error) => {
        console.error(error);
        setGoogleAlertText("Hiba történt");
        setGoogleAlertType("danger");
      });
  }
  return (
    <main>
      <h1 className="mt-4">Google bejelentkezés</h1>
      <button
        type="button"
        onClick={googleButtonHandler}
        className="btn btn-primary btn-google"
      >
        Bejelentkezés Google fiókkal
      </button>
      {googleAlertText && (
        <div className={`alert mt-2 alert-${googleAlertType}`}>
          {googleAlertText}
        </div>
      )}
      {googleUser && <div className='mt-3'>Bejelentkezve: {googleUser.displayName}</div>}
      <div>
      <Link to="/">
          Bejelentkezés email címmel és jelszóval
      </Link>
      </div>
      <div>
      <Link to="/email">
          Regisztráció email címmel és jelszóval
        {/* <button className="btn btn-primary mt-4">Email</button> */}
      </Link>
      </div>
    </main>
  );
}
