"use client";
import { useEffect, useState } from "react";
import { CiCircleChevUp } from "react-icons/ci";

const FloatingButton = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-1 z-40">
      {isScrolled && (
        <button
          onClick={scrollToTop}
          className="btn-circle bg-lime-400 text-white text-5xl flex items-center justify-center shadow-lg hover:bg-lime-500 hover:scale-105 transition-colors"
        >
          <CiCircleChevUp />
        </button>
      )}
    </div>
  );
};

export default FloatingButton;
