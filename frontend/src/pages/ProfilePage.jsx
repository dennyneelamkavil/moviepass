import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetBookingsByUserQuery } from "../api/bookingSlice";
import formatTime from "../utils/formatTime";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { data, isLoading, isError, error } = useGetBookingsByUserQuery(
    user?._id
  );
  const bookings = data?.bookings || [];
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  return (
    <div
      className="min-h-screen p-6 flex flex-col items-center"
      style={{
        backgroundImage: 'url("/moviepass_bg.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: "0.8",
      }}
    >
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl w-full">
        <h1 className="text-3xl font-bold mb-4 text-center">Profile</h1>

        <div className="mb-8 flex flex-col items-center">
          <div className="space-y-2">
            <p>
              <strong>Name:</strong> {user?.name}
            </p>
            <p>
              <strong>Email:</strong> {user?.email}
            </p>
            <p>
              <strong>City:</strong> {user?.city || "Not Provided"}
            </p>
            {user?.role === "admin" ? (
              <p>
                <strong>User Role:</strong> Admin
              </p>
            ) : user?.role === "theaterOwner" ? (
              <p>
                <strong>User Role:</strong> Theater Owner
              </p>
            ) : null}
            <p>
              <strong>Last Login:</strong>{" "}
              {new Date(user?.lastLoggedIn).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Booking History Section */}
        <div>
          <h2 className="text-xl font-semibold text-center">Booking History</h2>
          {bookings?.length > 0 ? (
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse bg-white shadow-sm rounded-lg text-sm">
                  <thead>
                    <tr className="bg-blue-500 text-white">
                      <th className="border border-gray-300 p-3 text-left">
                        No
                      </th>
                      <th className="border border-gray-300 p-3 text-left">
                        Movie Name
                      </th>
                      <th className="border border-gray-300 p-3 text-left w-2/6">
                        Theater
                      </th>
                      <th className="border border-gray-300 p-3 text-left">
                        Date
                      </th>
                      <th className="border border-gray-300 p-3 text-left">
                        Time
                      </th>
                      <th className="border border-gray-300 p-3 text-left">
                        Seats
                      </th>
                      <th className="border border-gray-300 p-3 text-left">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading ? (
                      <tr>
                        <td colSpan="4" className="text-center">
                          Loading...
                        </td>
                      </tr>
                    ) : isError ? (
                      <tr>
                        <td colSpan="4" className="text-center text-red">
                          {error?.message}
                        </td>
                      </tr>
                    ) : (
                      bookings?.map((booking, index) => (
                        <tr
                          key={booking?._id}
                          className="border-b border-gray-300"
                        >
                          <td className="border border-gray-300 p-3">
                            {index + 1}
                          </td>
                          <td className="border border-gray-300 p-3">
                            <strong>
                              {booking?.showtimeID?.movieID?.title}
                            </strong>
                          </td>
                          <td className="p-3 pb-0 line-clamp-4">
                            {booking?.showtimeID?.theaterID?.name +
                              ", " +
                              booking?.showtimeID?.theaterID?.location}
                          </td>
                          <td className="border border-gray-300 p-3">
                            {new Date(booking?.showtimeID?.date).toDateString()}
                          </td>
                          <td className="border border-gray-300 p-3">
                            {formatTime(booking?.showtimeID?.time)}
                          </td>
                          <td className="border border-gray-300 p-3">
                            {booking?.seatID
                              .map((seat) => seat?.seatID)
                              .join(", ")}
                          </td>
                          <td className="border border-gray-300 p-3">
                            <strong>{booking?.status}</strong>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <p>No bookings found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
