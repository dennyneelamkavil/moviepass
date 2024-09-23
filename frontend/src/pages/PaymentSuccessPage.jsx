import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  useCheckStatusMutation,
  useGetBookingsByUserQuery,
} from "../api/bookingSlice";
import ErrorComponent from "./ErrorPage";

export default function PaymentSuccessPage() {
  const { userID } = useSelector((state) => state.auth);
  const { data, isLoading, isError, error } = useGetBookingsByUserQuery(userID);
  const bookings = data?.bookings || [];
  const latestBooking = bookings[0]?.sessionID;
  const [checkStatus] = useCheckStatusMutation();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);
    return () => clearTimeout(timer);
  }, [navigate]);

  useEffect(() => {
    async function fetchData() {
      if (latestBooking) {
        await checkStatus(latestBooking).unwrap();
      }
    }
    fetchData();
  }, [latestBooking, checkStatus]);
  if (isLoading) return <div>Loading...</div>;
  if (isError) {
    return <ErrorComponent message={error.message} />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-green-600">
          Payment Successful!
        </h1>
        <p className="mt-4 text-lg text-gray-700">
          Thank you for your purchase! Your payment has been processed
          successfully.
          <strong> Booking Details are available on your profile.</strong>
        </p>
        <p className="mt-4 text-lg text-gray-700">
          You will be redirected to the home page shortly.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="btn btn-success text-white px-6 py-3 rounded-lg hover:bg-green-700"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
