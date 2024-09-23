import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials, toggleShowLogin } from "../auth/authSlice";
import { useLoginMutation } from "../api/userApiSlice";

export default function LoginForm() {
  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();
  const [login] = useLoginMutation();
  const navigate = useNavigate();

  const toLogin = async (data) => {
    try {
      const res = await login(data).unwrap();
      toast.success(res.message);
      navigate(-1);
      dispatch(
        setCredentials({
          user: res.user,
          token: res.token,
          lastLoggedIn: new Date().toISOString(),
        })
      );
    } catch (error) {
      const errorMessage = error?.data?.message || "Login failed";
      toast.error(errorMessage);
      reset();
    }
  };

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
        <h2 className="text-2xl font-semibold text-center my-4">Login</h2>
      </div>
      <form onSubmit={handleSubmit(toLogin)} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="input input-bordered w-full"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}

        <input
          type="password"
          placeholder="Password"
          className="input input-bordered w-full"
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}

        <button className="btn btn-primary w-full">Login</button>
      </form>
      <p className="text-center text-sm mt-4">
        Don&#39;t have an account?&nbsp;
        <span
          onClick={() => dispatch(toggleShowLogin())}
          className="text-blue-500 cursor-pointer"
        >
          Sign Up here
        </span>
      </p>
    </div>
  );
}
