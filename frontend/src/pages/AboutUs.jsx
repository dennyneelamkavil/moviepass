const AboutUs = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl text-center">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">About Us</h1>
        <p className="text-gray-600 text-lg">
          Welcome to MoviePass! We are committed to delivering the best movie
          booking experience for our users. With access to the latest movies,
          trending shows, and top-rated films, we make sure your movie-going
          experience is seamless and enjoyable. Our platform allows users to
          easily find, book, and enjoy the latest blockbusters in theaters near
          you.
        </p>
        <p className="mt-4 text-gray-600 text-lg">
          Whether you are looking for the newest releases or want to explore
          hidden gems, we are here to help. Join us on this cinematic journey!
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
