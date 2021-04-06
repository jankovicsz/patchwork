import { Link } from "react-router-dom";

import GoogleLogin from "./GoogleLogin";

export default function SignIn() {
  return (
    <div className="container">
      <h1 className="mt-4">Jelentkezz be a Todo App használatához</h1>
      <GoogleLogin />
      <div>
        <Link to="/email">
          <button type="button" className="btn btn-primary mt-4">
            Bejelentkezés email címmel
          </button>
        </Link>
      </div>
      <div>
        <Link to="/signup">
          <button type="button" className="btn btn-primary mt-4">
            Regisztráció email címmel
          </button>
        </Link>
      </div>
    </div>
  );
}
