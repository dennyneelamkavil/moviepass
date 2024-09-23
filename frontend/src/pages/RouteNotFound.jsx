import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const RouteNotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg mb-6">
        The page you are looking for does not exist.
      </p>
      <p className="m-4 text-lg text-gray-700">
        You will be redirected to the home page shortly.
      </p>
      <Link to="/" className="btn btn-primary">
        Go Back to Home
      </Link>
    </div>
  );
};

export default RouteNotFound;
