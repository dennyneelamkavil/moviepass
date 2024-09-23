import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ErrorComponent = ({ message }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold text-red-600">Error</h1>
        <p className="mt-4 text-lg text-gray-700">{message}</p>
        <div className="mt-6">
          <button
            className="btn btn-error text-white px-6 py-3 rounded-lg hover:bg-red-700"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
          <Link
            to="/"
            className="btn btn-success text-white px-6 py-3 rounded-lg hover:bg-red-700 ml-6"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

ErrorComponent.propTypes = {
  message: PropTypes.string,
};

export default ErrorComponent;
