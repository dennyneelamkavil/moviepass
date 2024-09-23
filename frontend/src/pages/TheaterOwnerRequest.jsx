import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useRequestVerificationMutation } from "../api/userApiSlice";

export default function TheaterOwnerRequest() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const [requestVerification] = useRequestVerificationMutation();

  const onSubmit = async (formData) => {
    if (!user) {
      navigate("/login");
      toast.info("Please login to send verification request");
      return;
    }
    try {
      const res = await requestVerification({ request: formData }).unwrap();
      toast.success(res.message);
      navigate("/");
    } catch (error) {
      toast.error(error.data.message);
    }
  };

  return (
    <div className="container mx-auto px-4 md:px-8 pt-20 pb-10 max-w-3xl">
      <div className="bg-white rounded-lg shadow-lg p-4">
        <h2 className="text-xl font-bold text-center text-gray-800 mb-4">
          Request Theater Owner Verification
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              {...register("message", { required: "Message is required" })}
              className="w-full border border-gray-300 rounded-md p-2"
              rows="4"
              placeholder="Please explain why you would like to be verified as a theater owner..."
            ></textarea>
            {errors.message && (
              <p className="text-red-500 text-sm">{errors.message.message}</p>
            )}
          </div>

          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                {...register("permission", { required: true })}
                className="mr-2"
              />
              I give permission to review my account for verification.
            </label>
            {errors.permission && (
              <p className="text-red-500 text-sm">You must give permission.</p>
            )}
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="bg-blue-500 text-white hover:opacity-90 px-6 py-2 rounded-lg"
            >
              Send Request
            </button>
          </div>
        </form>
        <p className="mt-4 text-gray-600 text-sm text-center">
          Our team will reach out to you for verification within the next 24
          hours. Once you’re verified, you’ll be able to access your dashboard
          with the same login credentials. Thanks for your patience!
        </p>
      </div>
    </div>
  );
}
