import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ allowedRoles }) {
  const { userRole } = useSelector((state) => state.auth);

  if (userRole === "admin") {
    return <Outlet />;
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" />;
  } else {
    return <Outlet />;
  }
}
