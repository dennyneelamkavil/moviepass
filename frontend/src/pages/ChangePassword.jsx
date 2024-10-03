import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setLogout } from "../auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useChangePasswordRequestMutation } from "../api/userApiSlice";

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [changePasswordRequest, { isLoading }] =
    useChangePasswordRequestMutation();

  const onSubmit = async (formData) => {
    try {
      const { oldPassword, newPassword } = formData;
      const res = await changePasswordRequest({
        oldPassword,
        newPassword,
      }).unwrap();
      toast.success(res.message);
      reset();
      navigate("/");
    } catch (error) {
      if (error.status === 401) {
        dispatch(setLogout());
        navigate("/login");
      }
      toast.error(error.data.message);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6"
      style={{
        backgroundImage: 'url("/moviepass_bg.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: "0.8",
      }}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          Change Password
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-left text-gray-600 font-medium">
              Current Password
            </label>
            <input
              type="password"
              {...register("oldPassword", {
                required: "Current password is required",
              })}
              className="w-full p-3 border rounded-lg"
              placeholder="Enter current password"
            />
            {errors.oldPassword && (
              <p className="text-red-500 text-sm">
                {errors.oldPassword.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-left text-gray-600 font-medium">
              New Password
            </label>
            <input
              type="password"
              {...register("newPassword", {
                required: "New password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="w-full p-3 border rounded-lg"
              placeholder="Enter new password"
            />
            {errors.newPassword && (
              <p className="text-red-500 text-sm">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-left text-gray-600 font-medium">
              Confirm New Password
            </label>
            <input
              type="password"
              {...register("confirmPassword", {
                required: "Please confirm your new password",
                validate: (value) =>
                  value === watch("newPassword") || "Passwords do not match",
              })}
              className="w-full p-3 border rounded-lg"
              placeholder="Confirm new password"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-primary bg-blue-500 text-white w-full p-3 rounded-lg hover:bg-blue-600"
            disabled={isLoading}
          >
            {isLoading ? "Changing Password ..." : "Change Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
