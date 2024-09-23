import { FaMasksTheater, FaUsersLine } from "react-icons/fa6";
import { MdLocalMovies, MdOutlineTheaterComedy } from "react-icons/md";
import { LuMessagesSquare } from "react-icons/lu";
// import { SiShowtime } from "react-icons/si";
// import { GiTheater } from "react-icons/gi";
import Cards from "../ui/Cards";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth);

  const items = [
    {
      icon: <FaUsersLine />,
      title: "View User Interface",
      style: "bg-amber-500",
      path: "/movies",
    },
    {
      icon: <FaMasksTheater />,
      title: "Theater Owners",
      style: "bg-purple-500",
      path: "/dashboard/theaterOwnersList",
    },
    {
      icon: <MdOutlineTheaterComedy />,
      title: "Requests for Theater Owner Verification",
      style: "bg-yellow-500",
      path: "/dashboard/theaterOwnersList/requests",
    },
    {
      icon: <MdLocalMovies />,
      title: "Movies",
      style: "bg-teal-500",
      path: "/dashboard/movies",
    },
    {
      icon: <LuMessagesSquare />,
      title: "Messages",
      style: "bg-neutral-500",
      path: "/dashboard/contactmessages",
    },
  ];

  const handleCardClick = (path) => {
    navigate(path);
  };
  return (
    <div
      className="bg-gray-100 min-h-screen flex flex-col items-center pt-20 px-4 lg:px-16"
      style={{
        backgroundImage: 'url("/bg_admin.jpg")',
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        opacity: "0.8",
      }}
    >
      <div className="container mx-auto flex-grow">
        <div className="p-2">
          <div>
            <p className="text-black font-medium text-xs">OVERVIEW</p>
            <h1 className="m-0 text-lg leading-snug font-semibold text-black flex items-center">
              Dashboard
            </h1>
          </div>
          <div className="flex justify-center items-center mt-2">
            <h1 className="font-medium text-lg text-center text-black">
              Hi{" "}
              <span className="text-red text-xl font-bold">
                {user.userName},
              </span>{" "}
              Welcome to MoviePass
            </h1>
          </div>
        </div>
        <hr className="w-full border-gray-300 my-6" />

        {/* Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mx-3 md:mx-0">
          {items.length > 0 ? (
            items.map((card, index) => (
              <Cards
                key={index}
                title={card.title}
                icon={card.icon}
                style={card.style}
                handleNavigate={() => handleCardClick(card.path)}
              />
            ))
          ) : (
            <p className="text-center text-gray-500">
              No available items to display.
            </p>
          )}
        </div>
      </div>
      <div className="mb-24"></div>
    </div>
  );
}
