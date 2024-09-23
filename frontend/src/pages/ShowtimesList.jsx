import { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogout } from "../auth/authSlice";
import {
  useDeleteShowtimeMutation,
  useGetShowtimeByTheaterQuery,
} from "../api/showtimeSlice";
import { toast } from "react-toastify";
import { useGetTheaterByIdQuery } from "../api/theaterSlice";
import formatTime from "../utils/formatTime";

export default function ShowtimesList() {
  const { id: theaterID } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const {
    data = {},
    isLoading,
    isError,
    error,
    refetch,
  } = useGetShowtimeByTheaterQuery(theaterID);
  const showtimes = data.showtimes || [];
  const { data: theaterData = {} } = useGetTheaterByIdQuery(theaterID);
  const theater = theaterData?.theater?.name || "";

  const [deleteShowtime] = useDeleteShowtimeMutation();

  const handleDelete = async (id) => {
    try {
      const res = await deleteShowtime(id).unwrap();
      refetch();
      toast.success(res.message);
    } catch (error) {
      if (error.status === 401) {
        dispatch(setLogout());
        navigate("/login");
        return;
      }
      toast.error(error.data.message);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredShowtimes = showtimes.filter((showtime) =>
    showtime.movieID.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div className="bg-gray-100 min-h-screen mt-[65px] py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">
            Showtimes of {theater}
          </h2>
          <button
            onClick={() => navigate(`/dashboard/showtimes/${theaterID}/add`)}
            className="bg-primary text-white hover:bg-indigo rounded-lg px-6 py-2"
          >
            + Add New
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Filter</h3>
          <hr className="mb-4" />
          <div>
            <label
              htmlFor="showtime-search"
              className="font-medium text-gray-700 mb-2 block"
            >
              Search:
            </label>
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3">
              <input
                type="text"
                id="showtime-search"
                className="border border-gray-300 rounded-lg p-2 flex-grow sm:flex-grow-0 sm:w-48 mb-4 sm:mb-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search for a movie"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse bg-white shadow-sm rounded-lg text-sm">
              <thead>
                <tr className="bg-blue-500 text-white">
                  <th className="border border-gray-300 p-3 text-left">No</th>
                  <th className="border border-gray-300 p-3 text-left">
                    Movie Name
                  </th>
                  <th className="border border-gray-300 p-3 text-left">
                    Showtime Date
                  </th>
                  <th className="border border-gray-300 p-3 text-left">
                    Showtime Time
                  </th>
                  <th className="border border-gray-300 p-3 text-left">
                    Actions
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
                  filteredShowtimes.map((showtime, index) => (
                    <tr key={showtime._id} className="border-b border-gray-300">
                      <td className="border border-gray-300 p-3">
                        {index + 1}
                      </td>
                      <td className="border border-gray-300 p-3">
                        {showtime.movieID.title}
                      </td>
                      <td className="border border-gray-300 p-3">
                        {new Date(showtime.date).toDateString()}
                      </td>
                      <td className="border border-gray-300 p-3">
                        {formatTime(showtime.time)}
                      </td>
                      <td className="border border-gray-300 p-3">
                        <div className="flex justify-center items-center">
                          <div className="flex gap-4">
                            <button
                              onClick={() =>
                                navigate(
                                  `/dashboard/showtimes/${theaterID}/edit/${showtime._id}`
                                )
                              }
                              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded flex items-center"
                            >
                              <FaEdit />
                            </button>
                            <button
                              onClick={() => handleDelete(showtime._id)}
                              className="bg-red-500 hover:bg-rose-600 text-white font-bold py-2 px-4 rounded flex items-center"
                            >
                              <FaTrashAlt />
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="mb-24"></div>
    </div>
  );
}
