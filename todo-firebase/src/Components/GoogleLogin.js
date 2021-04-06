import auth, { AuthenticationProvider } from "../firebase/auth";

export default function GoogleLogin() {
  function handleGoogleLogin(e) {
    e.preventDefault();
    auth()
      .signInWithPopup(AuthenticationProvider)
      .catch((error) => {
        console.error(error);
      });
  }
  return (
    <div>
      <button
        type="button"
        className="btn btn-primary mt-4"
        onClick={handleGoogleLogin}
      >
        Bejelentkezés Goggle fiókkal
      </button>
    </div>
  );
}
