import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setCredentials, setLogout } from "../auth/authSlice";
import { useState, useEffect, useRef } from "react";
import cities from "../assets/cities.json";
import { useUpdateUserMutation } from "../api/userApiSlice";
import { toast } from "react-toastify";
import { IoMdContact } from "react-icons/io";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [updateUser] = useUpdateUserMutation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCities, setFilteredCities] = useState(cities);
  const [modalOpen, setModalOpen] = useState(false);
  const modalRef = useRef(null);

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    if (query) {
      const results = cities.filter((city) =>
        city.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredCities(results);
    } else {
      setFilteredCities(cities);
    }
  };

  const handleLogout = () => {
    dispatch(setLogout());
    toast.success("Logged out successfully");
  };

  const handleCitySelect = async (city) => {
    if (user && user.city !== city) {
      const res = await updateUser({
        id: user._id,
        updatedUser: { city },
      }).unwrap();
      toast.success("City updated successfully");
      dispatch(setCredentials({ user: res.user }));
    } else if (!user) {
      navigate("/login");
      toast.info("Please login to change city");
    } else {
      toast.info("City already selected");
    }
    setModalOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        modalOpen &&
        modalRef.current &&
        !modalRef.current.contains(event.target)
      ) {
        setModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalOpen]);

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link
          to="/"
          className="btn btn-ghost hover:bg-transparent text-xl h-14"
        >
          <img
            src="/moviepass_logo_white.png"
            alt="moviepass_logo"
            width="50"
            height="50"
            className="rounded-full"
          />
          Movie Pass
        </Link>
      </div>
      <div className="flex-none gap-2">
        <button
          className="btn hidden md:block"
          onClick={() => setModalOpen(true)}
        >
          {user?.city || "Select City"}
        </button>

        {modalOpen && (
          <dialog className="modal" open>
            <div
              className="modal-box w-11/12 max-w-4xl"
              ref={modalRef}
              style={{ scrollbarWidth: "none" }}
            >
              <div className="form-control">
                <input
                  type="text"
                  placeholder="Search cities"
                  className="input input-bordered w-full"
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {filteredCities.map((city, index) => (
                  <div
                    key={index}
                    className="bg-base-200 rounded-md p-4 cursor-pointer hover:bg-base-300"
                    onClick={() => handleCitySelect(city)}
                  >
                    {city}
                  </div>
                ))}
              </div>
            </div>
          </dialog>
        )}
        {/* <label className="swap swap-rotate">
          <input type="checkbox" className="theme-controller" value="dark" />
          <svg
            className="swap-off h-10 w-10 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>
          <svg
            className="swap-on h-10 w-10 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        </label> */}
        {user ? (
          <div
            className="dropdown dropdown-end"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <div tabIndex={0} role="button" className="flex items-center">
              <div className="avatar">
                <IoMdContact size={30} />
              </div>
              <p className="hidden md:block ml-2">Hi, {user.name}</p>
            </div>
            {dropdownOpen && (
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <Link to="/change-password">Change Password</Link>
                </li>
                <li onClick={handleLogout}>
                  <a>Logout</a>
                </li>
              </ul>
            )}
          </div>
        ) : (
          <Link to="/login">
            <button className="btn btn-primary">Login / Signup</button>
          </Link>
        )}
      </div>
    </div>
  );
}
