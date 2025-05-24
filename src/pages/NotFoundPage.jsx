import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>404</h1>
      <p>Page not found. Please check the URL and try again.</p>
      <Link to="/" style={{ color: "tomato", textDecoration: "underline" }}>
        Go to Home Page
      </Link>
    </div>
  );
}

export default NotFoundPage;
