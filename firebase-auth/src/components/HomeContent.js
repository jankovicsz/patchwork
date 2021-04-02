import { Link } from "react-router-dom";

export default function HomeContent() {
  return (
    <main>
      <h1>Home content</h1>
      <Link to="/"><button className="btn btn-primary mt-4">Home</button></Link>
    </main>
  );
}
