import { useEffect } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  useDeleteRequestMutation,
  useGetAllRequestsQuery,
  useUpdateUserMutation,
} from "../api/userApiSlice";
import { toast } from "react-toastify";

export default function RequestsList() {
  const navigate = useNavigate();
  const {
    data = {},
    isLoading,
    isError,
    error,
    refetch,
  } = useGetAllRequestsQuery();
  const requests = data.requests || [];
  const [editUser] = useUpdateUserMutation();
  const [deleteRequest] = useDeleteRequestMutation();

  const handleUpdateRole = async (id, requestID) => {
    try {
      const role = "theaterOwner";
      const userPayload = {
        role,
      };
      await editUser({ id, updatedUser: userPayload }).unwrap();
      toast.success("Request verified successfully");
      await deleteRequest(requestID).unwrap();
      refetch();
      navigate("/dashboard/theaterOwnersList");
    } catch (error) {
      toast.error(error.data.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await deleteRequest(id).unwrap();
      refetch();
      toast.success(res.message);
    } catch (error) {
      toast.error(error.data.message);
    }
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div className="bg-gray-100 min-h-screen mt-[65px] py-8">
      <div className="container mx-auto px-4">
        {/* Sub User Title */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">
            Requests for Theater Owner Verification
          </h2>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse bg-white shadow-sm rounded-lg text-sm">
              <thead>
                <tr className="bg-blue-500 text-white">
                  <th className="border border-gray-300 p-3 text-left">No</th>
                  <th className="border border-gray-300 p-3 text-left">Name</th>
                  <th className="border border-gray-300 p-3 text-left">
                    Phone
                  </th>
                  <th className="border border-gray-300 p-3 text-left">
                    Email
                  </th>
                  <th className="border border-gray-300 p-3 text-left">
                    Message
                  </th>
                  <th className="border border-gray-300 p-3 text-left">
                    Last Logged In
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
                  requests.map((request, index) => {
                    const user = request.userID;
                    return (
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
                          {request.message}
                        </td>
                        <td className="border border-gray-300 p-3">
                          {new Date(user.lastLoggedIn).toLocaleString()}
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
                                onClick={() =>
                                  handleUpdateRole(user._id, request._id)
                                }
                                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded flex items-center"
                              >
                                Update to Theater Owner
                              </button>
                              <button
                                onClick={() => handleDelete(request._id)}
                                className="bg-red-500 hover:bg-rose-600 text-white font-bold py-2 px-4 rounded flex items-center"
                              >
                                <FaTrashAlt />
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })
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
