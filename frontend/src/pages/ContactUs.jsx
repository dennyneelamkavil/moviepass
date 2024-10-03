import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useContactUsRequestMutation } from "../api/userApiSlice";
import { useNavigate } from "react-router-dom";

const ContactUs = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const [contactUsRequest, { isLoading }] = useContactUsRequestMutation();

  const onSubmit = async (formData) => {
    try {
      const res = await contactUsRequest(formData).unwrap();
      toast.success(res.message);
      reset();
      navigate("/");
    } catch (error) {
      toast.error(error.data.message);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6"
      style={{
        backgroundImage: 'url("/contact_page.jpg")',
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        opacity: "0.8",
      }}
    >
      <div className="bg-white/50 p-8 rounded-lg shadow-lg max-w-3xl text-center">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Contact Us</h1>
        <p className="text-black text-lg mb-6">
          Got a question? We&apos;re here to help! Feel free to reach out to us
          with any inquiries or feedback.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-left text-black font-medium">
              Your Name
            </label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full p-3 border rounded-lg bg-white/50"
              placeholder="John Doe"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label className="block text-left text-black font-medium">
              Your Email
            </label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^@ ]+@[^@ ]+\.[^@ .]+$/,
                  message: "Email is not valid",
                },
              })}
              className="w-full p-3 border rounded-lg bg-white/50"
              placeholder="johndoe@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label className="block text-left text-black font-medium">
              Message
            </label>
            <textarea
              {...register("message", { required: "Message is required" })}
              className="w-full p-3 border rounded-lg bg-white/50"
              rows="4"
              placeholder="Your message..."
            ></textarea>
            {errors.message && (
              <p className="text-red-500 text-sm">{errors.message.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-primary bg-blue-500 text-white w-full p-3 rounded-lg hover:bg-blue-600"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
