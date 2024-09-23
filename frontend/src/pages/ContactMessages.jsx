import { useEffect } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogout } from "../auth/authSlice";
import {
  useDeleteContactRequestMutation,
  useGetContactRequestQuery,
} from "../api/userApiSlice";
import { toast } from "react-toastify";

export default function ContactMessages() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    data = {},
    isLoading,
    isError,
    error,
    refetch,
  } = useGetContactRequestQuery();
  const contactUsRequests = data.contactUsRequests || [];

  const [deleteContactRequest] = useDeleteContactRequestMutation();

  const handleDelete = async (id) => {
    try {
      const res = await deleteContactRequest(id).unwrap();
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

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div className="bg-gray-100 min-h-screen mt-[65px] py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Meassages</h2>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse bg-white shadow-sm rounded-lg text-sm">
              <thead>
                <tr className="bg-blue-500 text-white">
                  <th className="border border-gray-300 p-3 text-left">No</th>
                  <th className="border border-gray-300 p-3 text-left">Name</th>
                  <th className="border border-gray-300 p-3 text-left">
                    Email
                  </th>
                  <th className="border border-gray-300 p-3 text-left">
                    Message
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
                  contactUsRequests.map((request, index) => (
                    <tr key={request._id} className="border-b border-gray-300">
                      <td className="border border-gray-300 p-3">
                        {index + 1}
                      </td>
                      <td className="border border-gray-300 p-3">
                        {request.name}
                      </td>
                      <td className="border border-gray-300 p-3">
                        {request.email}
                      </td>
                      <td className="border border-gray-300 p-3">
                        {request.message}
                      </td>
                      <td className="border border-gray-300 p-3">
                        <div className="flex justify-center items-center">
                          <div className="flex gap-4">
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
