import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = () => {
  const { token } = useSelector((state) => state.auth);

  if (token) {
    return <Navigate to="/" />;
  } else {
    return <Outlet />;
  }
};

export default PublicRoute;
