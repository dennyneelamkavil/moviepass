import { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import { MdBlock } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogout } from "../auth/authSlice";
import {
  useDeleteUserMutation,
  useGetTheaterOwnersQuery,
  useVerifyUserMutation,
} from "../api/userApiSlice";
import { toast } from "react-toastify";

export default function TheaterOwnersList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const {
    data = {},
    isLoading,
    isError,
    error,
    refetch,
  } = useGetTheaterOwnersQuery();
  const theaterOwners = data.theaterOwners || [];

  const [deleteUser] = useDeleteUserMutation();
  const [verifyUser] = useVerifyUserMutation();

  const handleDelete = async (id) => {
    try {
      const res = await deleteUser({ id }).unwrap();
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

  const handleVerify = async (id) => {
    try {
      const res = await verifyUser(id).unwrap();
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

  const filteredTheaterOwners = theaterOwners.filter(
    (theaterOwner) =>
      theaterOwner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      theaterOwner.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div className="bg-gray-100 min-h-screen mt-[65px] py-8">
      <div className="container mx-auto px-4">
        {/* Sub User Title */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Theater Owners</h2>
          <button
            onClick={() => navigate("/dashboard/theaterOwnersList/add")}
            className="bg-primary text-white hover:bg-indigo rounded-lg px-6 py-2"
          >
            + Add New
          </button>
        </div>

        {/* Filter Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Filter</h3>
          <hr className="mb-4" />
          <div>
            <label
              htmlFor="user-search"
              className="font-medium text-gray-700 mb-2 block"
            >
              Search:
            </label>
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3">
              <input
                type="text"
                id="user-search"
                className="border border-gray-300 rounded-lg p-2 flex-grow sm:flex-grow-0 sm:w-48 mb-4 sm:mb-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search by name or email"
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
                    Full Name
                  </th>
                  <th className="border border-gray-300 p-3 text-left">
                    Phone
                  </th>
                  <th className="border border-gray-300 p-3 text-left">
                    Email
                  </th>
                  <th className="border border-gray-300 p-3 text-left">
                    Last Logged In
                  </th>
                  <th className="border border-gray-300 p-3 text-left">
                    Verification Status for adding movies
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
                  filteredTheaterOwners.map((user, index) => (
                    <tr key={user._id} className="border-b border-gray-300">
                      <td className="border border-gray-300 p-3">
                        {index + 1}
                      </td>
                      <td className="border border-gray-300 p-3">
                        {user.name}
                      </td>
                      <td className="border border-gray-300 p-3">
                        {user.phone}
                      </td>
                      <td className="border border-gray-300 p-3">
                        {user.email}
                      </td>
                      <td className="border border-gray-300 p-3">
                        {new Date(user.lastLoggedIn).toLocaleString()}
                      </td>
                      <td className="border border-gray-300 p-3">
                        {user.isVerified ? "Verified" : "Not Verified"}
                      </td>
                      <td className="border border-gray-300 p-3">
                        <div className="flex justify-center items-center">
                          <div className="flex gap-4">
                            <button
                              onClick={() =>
                                navigate(
                                  `/dashboard/theaterOwnersList/edit/${user._id}`
                                )
                              }
                              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded flex items-center"
                            >
                              <FaEdit />
                            </button>
                            <button
                              onClick={() => handleVerify(user._id)}
                              className={`${
                                user.isVerified
                                  ? "bg-orange-500 hover:bg-orange-600"
                                  : "bg-green-500 hover:bg-green-600"
                              } text-white font-bold py-2 px-4 rounded flex items-center`}
                            >
                              {user.isVerified ? <MdBlock /> : <TiTick />}
                            </button>
                            <button
                              onClick={() => handleDelete(user._id)}
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
