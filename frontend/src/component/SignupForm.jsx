import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { toggleShowLogin } from "../auth/authSlice";
import { useSignupMutation } from "../api/userApiSlice";

export default function SignupForm() {
  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const [signup, { isLoading }] = useSignupMutation();

  const toSignup = async (data) => {
    try {
      const res = await signup(data).unwrap();
      toast.success(res.message);
      reset();
      dispatch(toggleShowLogin());
    } catch (error) {
      const errorMessage = error?.data?.message || "An error occurred";
      toast.error(errorMessage);
      reset();
    }
  };

  const newPassword = watch("newPassword");

  return (
    <div className="max-w-sm mx-auto p-6 border border-gray-300 rounded-lg shadow-md bg-white/80">
      <div className="flex flex-col items-center">
        <img
          src="/moviepass_logo_white.png"
          alt="moviepass_logo"
          width="80"
          height="80"
          className="rounded-full"
        />
        <h2 className="text-2xl font-semibold text-center my-4">Sign Up</h2>
      </div>
      <form onSubmit={handleSubmit(toSignup)} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          className="input input-bordered w-full"
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && (
          <span className="text-red-500 text-sm">{errors.name.message}</span>
        )}
        <input
          type="text"
          placeholder="Phone"
          className="input input-bordered w-full"
          {...register("phone", { required: "Phone is required" })}
        />
        {errors.phone && (
          <span className="text-red-500 text-sm">{errors.phone.message}</span>
        )}
        <input
          type="email"
          placeholder="Email"
          className="input input-bordered w-full"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email.message}</span>
        )}

        <input
          type="password"
          placeholder="New Password"
          className="input input-bordered w-full"
          {...register("newPassword", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />
        {errors.newPassword && (
          <span className="text-red-500 text-sm">
            {errors.newPassword.message}
          </span>
        )}

        <input
          type="password"
          placeholder="Confirm Password"
          className="input input-bordered w-full"
          {...register("password", {
            required: "Please confirm your password",
            validate: (value) =>
              value === newPassword || "Passwords do not match",
          })}
        />
        {errors.password && (
          <span className="text-red-500 text-sm">
            {errors.password.message}
          </span>
        )}

        <button className="btn btn-primary w-full" disabled={isLoading}>
          {isLoading ? "Signing up..." : "Sign Up"}
        </button>
      </form>
      <p className="text-center text-sm mt-4">
        Already have an account?{" "}
        <span
          onClick={() => dispatch(toggleShowLogin())}
          className="text-blue-500 cursor-pointer"
        >
          Login here
        </span>
      </p>
    </div>
  );
}
