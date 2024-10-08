import { Link } from "react-router-dom";

export default function Footer() {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <footer className="footer flex flex-col justify-center items-center bg-base-200 text-base-content p-10 w-full">
        <div className="footer-title flex flex-row">
          <div>Want to list your theater?</div>
          <Link to="/partner" className="link link-hover">
            Partner with us!
          </Link>
        </div>
        <div className="flex flex-row justify-around w-full">
          <div className="flex flex-col gap-3 text-center">
            <h6 className="footer-title">Movies</h6>
            <button
              className="link link-hover"
              onClick={() => scrollToSection("trending")}
            >
              Trending
            </button>
            <button
              className="link link-hover"
              onClick={() => scrollToSection("comingsoon")}
            >
              Coming Soon
            </button>
            <button
              className="link link-hover"
              onClick={() => scrollToSection("latest")}
            >
              Latest Releases
            </button>
            <button
              className="link link-hover"
              onClick={() => scrollToSection("movies")}
            >
              All Movies
            </button>
          </div>
          <div className="flex flex-col gap-3 text-center">
            <h6 className="footer-title">Help</h6>
            <Link to="/about-us" className="link link-hover">
              About Us
            </Link>
            <Link to="/contact-us" className="link link-hover">
              Contact Us
            </Link>
            <Link to="/terms" className="link link-hover">
              Terms of Service & <br />
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
      <footer className="footer bg-base-200 text-base-content border-base-300 border-t px-10 py-4">
        <aside className="grid-flow-col items-center">
          <img
            src="/moviepass_logo.png"
            alt="moviepass_logo"
            width="50"
            height="50"
            className="rounded-full"
          />
          <p>
            MoviePass Ltd.
            <br />
            Your gateway to the latest movies, since 2024
          </p>
        </aside>
        <nav className="md:place-self-center md:justify-self-end">
          <div className="grid grid-flow-col gap-4">
            <a href="https://twitter.com/" aria-label="Twitter">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
              </svg>
            </a>
            <a href="https://www.youtube.com/" aria-label="YouTube">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
              </svg>
            </a>
            <a href="https://www.facebook.com/" aria-label="Facebook">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
              </svg>
            </a>
          </div>
        </nav>
      </footer>
      <p className="m-0 py-2 bg-base-200 text-black flex justify-center items-center gap-2 border-base-content border-t">
        Made With
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="red"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M6.979 3.074a6 6 0 0 1 4.988 1.425l.037 .033l.034 -.03a6 6 0 0 1 4.733 -1.44l.246 .036a6 6 0 0 1 3.364 10.008l-.18 .185l-.048 .041l-7.45 7.379a1 1 0 0 1 -1.313 .082l-.094 -.082l-7.493 -7.422a6 6 0 0 1 3.176 -10.215z"></path>
        </svg>
        By
        <a href="https://dennynj.vercel.app/" target="_blank">
          Denny N J
        </a>
      </p>
    </>
  );
}
