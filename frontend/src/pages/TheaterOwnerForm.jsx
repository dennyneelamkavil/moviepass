import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogout } from "../auth/authSlice";
import cities from "../assets/cities.json";
import {
  useGetUserByIdQuery,
  useSignupMutation,
  useUpdateUserMutation,
} from "../api/userApiSlice";
import { toast } from "react-toastify";

export default function TheaterOwnerForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isEditMode = Boolean(id);

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm();

  const { data, refetch } = useGetUserByIdQuery(id, {
    skip: !isEditMode,
  });

  const [editUser] = useUpdateUserMutation();
  const [addUser] = useSignupMutation();

  useEffect(() => {
    if (isEditMode && data?.user) {
      const theaterOwner = data.user;
      setValue("name", theaterOwner.name || "");
      setValue("phone", theaterOwner.phone || "");
      setValue("email", theaterOwner.email || "");
      setValue("status", theaterOwner.isVerified ? "Verified" : "Not Verified");
      setValue("city", theaterOwner.city || "");
      setValue(
        "lastLoggedIn",
        theaterOwner.lastLoggedIn
          ? new Date(theaterOwner.lastLoggedIn).toLocaleString()
          : ""
      );
    }
  }, [data, isEditMode, setValue]);

  const onSubmit = async (formData) => {
    try {
      const { name, phone, email, status, city, password } = formData;
      const isVerified = status === "Verified";
      const role = "theaterOwner";
      const userPayload = {
        name,
        phone,
        email,
        isVerified,
        city,
        role,
      };
      if (!isEditMode) {
        userPayload.password = password;
      }

      let res;
      if (isEditMode) {
        res = await editUser({ id, updatedUser: userPayload }).unwrap();
        refetch();
      } else {
        res = await addUser(userPayload).unwrap();
      }

      navigate("/dashboard/theaterOwnersList");
      toast.success(res.message);
    } catch (error) {
      if (error.status === 401) {
        dispatch(setLogout());
        navigate("/login");
      }
      toast.error(error.data.message);
    }
  };

  return (
    <div className="container mx-auto px-4 md:px-8 pt-20 pb-10 max-w-5xl">
      <div className="flex space-x-4">
        <div className="flex-1 bg-white rounded-lg shadow-lg p-4">
          <div className="bg-white p-3 rounded-t-lg">
            <div className="flex justify-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                {isEditMode ? "Edit Theater Owner" : "Add Theater Owner"}
              </h2>
            </div>
          </div>

          <div className="p-4 rounded-b-lg">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="flex justify-between space-x-4 mb-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    {...register("name", { required: "Name is required" })}
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    {...register("phone", {
                      required: "Phone number is required",
                    })}
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-between space-x-4 mb-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    {...register("email", { required: "Email is required" })}
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                {isEditMode ? (
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Last Logged In
                    </label>
                    <input
                      type="text"
                      {...register("lastLoggedIn")}
                      readOnly
                      className="w-full border border-gray-300 rounded-md p-2"
                    />
                  </div>
                ) : (
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <input
                      type="password"
                      {...register("password", {
                        required: !isEditMode && "Password is required",
                      })}
                      className="w-full border border-gray-300 rounded-md p-2"
                    />
                    {errors.password && (
                      <p className="text-red-500 text-sm">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                )}
              </div>

              <div className="flex justify-between space-x-4 mb-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Verification Status
                  </label>
                  <select
                    {...register("status", {
                      required: "Verification status is required",
                    })}
                    className="w-full border border-gray-300 rounded-md p-2"
                  >
                    <option value="Verified">Verified</option>
                    <option value="Not Verified">Not Verified</option>
                  </select>
                  {errors.status && (
                    <p className="text-red-500 text-sm">
                      {errors.status.message}
                    </p>
                  )}
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    City
                  </label>
                  <select
                    {...register("city", { required: "City is required" })}
                    className="w-full border border-gray-300 rounded-md p-2"
                  >
                    <option value="">Select City</option>
                    {cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                  {errors.city && (
                    <p className="text-red-500 text-sm">
                      {errors.city.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="bg-red-500 text-white hover:opacity-90 px-6 py-2 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white hover:opacity-90 px-6 py-2 rounded-lg"
                >
                  {isEditMode ? "Update Theater Owner" : "Add Theater Owner"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
