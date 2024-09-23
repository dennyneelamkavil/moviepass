import { useSelector } from "react-redux";
import UserDashboard from "../component/UserDashboard";
import AdminDashboard from "../component/AdminDashboard";
import TheaterOwnerDashboard from "../component/TheaterOwnerDashboard";

export default function HomePage() {
  const { userRole } = useSelector((state) => state.auth);
  return (
    <>
      {userRole === "admin" ? (
        <AdminDashboard />
      ) : userRole === "theaterOwner" ? (
        <TheaterOwnerDashboard />
      ) : (
        <UserDashboard />
      )}
    </>
  );
}
