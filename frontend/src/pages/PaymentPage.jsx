import { useLocation } from "react-router-dom";
import { useGetTheaterByIdQuery } from "../api/theaterSlice";
import { loadStripe } from "@stripe/stripe-js";
import { useMakePaymentMutation } from "../api/bookingSlice";
import { toast } from "react-toastify";
import ErrorComponent from "./ErrorPage";

export default function PaymentPage() {
  const location = useLocation();
  const {
    totalAmount,
    selectedSeats,
    showtimeID,
    movieID,
    theaterID,
    showtimeDate,
    showtimeTime,
  } = location.state || {};
  if (!totalAmount || !selectedSeats || !showtimeID || !theaterID) {
    return (
      <ErrorComponent message="No booking details found. Please go back and try again." />
    );
  }
  const { data: theaterData } = useGetTheaterByIdQuery(theaterID?._id); //eslint-disable-line
  const theater = theaterData?.theater || {};
  const [makePayment, { isLoading }] = useMakePaymentMutation(); //eslint-disable-line
  const getSeatID = (seatId) => {
    const seat = theater.seatingLayout.find((s) => s._id === seatId);
    return seat ? seat.seatID : "Unknown seat";
  };

  const dataToBackend = {
    showtimeID,
    movieID: movieID._id,
    theaterID: theaterID._id,
    totalAmount,
    selectedSeats,
  };

  const completePayment = async () => {
    try {
      const stripe = await loadStripe(
        import.meta.env.VITE_STRIPE_Publishable_Key
      );
      const session = await makePayment(dataToBackend).unwrap();
      await stripe.redirectToCheckout({
        sessionId: session.sessionId,
      });
    } catch (error) {
      toast.error(error.data.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-4 flex flex-col place-items-center justify-center bg-purple-50">
      <div
        className="relative card shadow-xl w-full md:w-1/2"
        style={{
          backgroundImage: `url(${movieID?.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: "1",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-65"></div>
        <div className="relative card-body text-white p-5">
          <figure>
            <img
              src={movieID?.image}
              alt={movieID?.title}
              className="w-full h-auto max-h-96 object-contain"
            />
          </figure>
          <div className="card-body items-center">
            <h2 className="card-title text-xl">{movieID?.title}</h2>
            <div className="flex flex-col items-center">
              <div className="flex gap-4 items-center">
                <h2 className="text-lg font-semibold">Duration: </h2>
                <p>{movieID?.duration} minutes</p>
              </div>
              <div className="flex gap-4 items-center">
                <h2 className="text-lg font-semibold">Genre: </h2>
                <p>{movieID?.genre}</p>
              </div>
            </div>
          </div>
          <div className="mb-5">
            <h3 className="text-xl font-semibold text-center m-5">
              Selected Showtime and Theater
            </h3>
            <ul className="flex flex-col text-center gap-4">
              <li className="text-md font-semibold">Date: {showtimeDate}</li>
              <li className="text-md font-semibold">Time: {showtimeTime}</li>
              <li className="text-md font-semibold">
                Theater: {theaterID?.name}, {theaterID?.location}
              </li>
              <li className="text-md font-semibold">
                Total Amount: ₹{totalAmount}
              </li>
              <li className="text-md font-semibold">
                Selected Seats:
                {selectedSeats.map((seatId) => (
                  <button className="btn btn-sm disabled mx-1" key={seatId}>
                    {getSeatID(seatId)}
                  </button>
                ))}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <button
        className="btn btn-primary mt-5"
        onClick={completePayment}
        disabled={isLoading}
      >
        {isLoading ? "Initiating payment..." : "Pay Now"}
      </button>
    </div>
  );
}
