export default function Logout({ handleLogout }) {
  return (
    <button type="button" onClick={handleLogout} className="btn btn-primary">
      Kijelentkezés
    </button>
  );
}
