import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const navigate = useNavigate();

  const slides = [
    {
      title: "The Fall Guy",
      description:
        "A stuntman, fresh off an almost career-ending accident, has to track down a missing movie star, solve a conspiracy and try to win back the love of his life while still doing his day job. What could possibly go right?",
      image: "fallguy_banner.jpeg",
      id: "66e08d07e797f3242f92f326",
    },
    {
      title: "The Painter",
      description:
        "An ex-CIA operative is thrown back into a dangerous world when a mysterious woman from his past resurfaces. Now exposed and targeted by a relentless killer and a rogue black ops program, he must rely on skills he thought he left behind.",
      image: "painter_banner.jpg",
      id: "66e0980482be89bb591222ac",
    },
    {
      title: "No Hard Feelings",
      description:
        "On the brink of losing her home, Maddie finds an intriguing job listing: helicopter parents looking for someone to bring their introverted 19-year-old son out of his shell before college. She has one summer to make him a man or die trying.",
      image: "nohardfeelings_banner.jpg",
      id: "66ec7658e862441f706eae9b",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.matchMedia("(min-width: 1024px)").matches);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  });

  return (
    <div className="carousel w-full relative">
      <div className="carousel-inner w-full h-96 overflow-hidden">
        {isLargeScreen
          ? slides.map((slide, index) => (
              <div
                key={index}
                className={`carousel-item absolute w-full h-full transition-transform duration-500 ease-in-out bg-no-repeat ${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                }`}
              >
                <div
                  className="w-full h-full bg-no-repeat bg-cover"
                  style={{
                    backgroundImage: `url(${slide.image})`,
                    backgroundPosition: "center",
                  }}
                ></div>
                <div className="flex flex-col justify-center items-start p-8 bg-gray-900 text-white z-10 w-1/2">
                  <h2 className="text-4xl font-bold mb-4">{slide.title}</h2>
                  <p className="text-lg mb-6">{slide.description}</p>
                  <button
                    className="btn btn-ghost hover:bg-gray-500 text-white font-bold py-2 px-4 rounded w-full"
                    onClick={() => navigate(`/movies/${slide.id}`)}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))
          : slides.map((slide, index) => (
              <div
                key={index}
                className={`carousel-item absolute w-full h-full transition-opacity duration-500 ease-in-out bg-no-repeat ${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                }`}
              >
                {/* Image with content overlay */}
                <div
                  className="w-full h-full bg-no-repeat bg-cover"
                  style={{
                    backgroundImage: `url(${slide.image})`,
                    backgroundPosition: "center",
                  }}
                ></div>

                {/* Content: Adjust layout based on screen size */}
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end items-start px-8 text-white">
                  <div className="w-full max-w-lg">
                    <h2 className="text-2xl md:text-4xl font-bold mb-4">
                      {slide.title}
                    </h2>
                    <p className="text-sm md:text-lg mb-6">
                      {slide.description}
                    </p>
                    <button
                      className="btn btn-ghost hover:bg-gray-500 text-white font-bold py-2 px-4 rounded w-full md:w-auto"
                      onClick={() => navigate(`/movies/${slide.id}`)}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
      </div>

      {/* Previous button */}
      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 z-20"
        onClick={prevSlide}
      >
        &#10094;
      </button>

      {/* Next button */}
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 z-20"
        onClick={nextSlide}
      >
        &#10095;
      </button>
    </div>
  );
}
