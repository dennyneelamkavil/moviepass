import { Link } from "react-router-dom";

const Terms = () => {
  return (
    <div
      className="min-h-screen flex flex-col items-end justify-center p-6"
      style={{
        backgroundImage: 'url("/terms_page.jpg")',
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        opacity: "0.8",
      }}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl text-left">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Terms of Service & Privacy Policy
        </h1>

        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          Terms of Service
        </h2>
        <p className="text-gray-600 mb-6">
          By accessing and using MoviePass, you agree to comply with our terms
          of service. We provide access to movie listings and booking services,
          and you are responsible for ensuring that your use of the platform is
          lawful and respectful. We reserve the right to modify these terms at
          any time.
        </p>

        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          Privacy Policy
        </h2>
        <p className="text-gray-600 mb-6">
          Your privacy is important to us. We collect and use your personal
          information only for the purposes of enhancing your experience on
          MoviePass. We do not sell your data to third parties. For more
          information about how we handle your data, please read the full
          privacy policy.
        </p>

        <p className="text-gray-600">
          If you have any questions regarding our terms or privacy policy, feel
          free to{" "}
          <Link to="/contact-us" className="text-blue-500 hover:underline">
            contact us
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default Terms;
