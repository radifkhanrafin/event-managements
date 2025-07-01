import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import calender from "../../src/assets/calander.png";
import { FaSignOutAlt, FaUser, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-blue-600 rounded flex items-center justify-center">
              <img src={calender} className="h-8" alt="Calendar" />
            </div>
            <span className="text-xl font-bold text-gray-900">EventHub</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium ${isActive("/") ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                }`}
            >
              Home
            </Link>

            <Link
              to="/events"
              className={`px-3 py-2 rounded-md text-sm font-medium ${isActive("/events") ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                }`}
            >
              Events
            </Link>

            {!user && (
              <Link to="/login">
                <button className="text-black px-4 py-2 rounded-md">
                  Sign In
                </button>
              </Link>
            )}

            {user && (
              <>
                <Link
                  to="/add-event"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${isActive("/add-event") ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                    }`}
                >
                  Add Event
                </Link>
                <Link
                  to="/my-events"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${isActive("/my-events") ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                    }`}
                >
                  My Events
                </Link>
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-100"
                  >
                    <img
                      src={user?.user?.photoURL || "https://via.placeholder.com/32"}
                      alt={user?.user?.name}
                      className="h-8 w-8 rounded-full"
                    />
                    <span className="text-sm">▼</span>
                  </button>
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                      <div className="px-4 py-2 text-sm text-gray-700 border-b flex items-center gap-2">
                        <FaUser /> {user?.user?.name}
                      </div>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <FaSignOutAlt /> Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="sm:flex  items-center  md:hidden ">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className=" text-2xl text-gray-800 focus:outline-none"
            >
              {mobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1 bg-transparent">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-3 py-2 rounded-md text-base font-medium ${isActive("/") ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
              }`}
          >
            Home
          </Link>

          <Link
            to="/events"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-3 py-2 rounded-md text-base font-medium ${isActive("/events") ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
              }`}
          >
            Events
          </Link>

          {!user && (
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600"
            >
              Sign In
            </Link>
          )}

          {user && (
            <>
              <Link
                to="/add-event"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${isActive("/add-event") ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                  }`}
              >
                Add Event
              </Link>
              <Link
                to="/my-events"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${isActive("/my-events") ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                  }`}
              >
                My Events
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600"
              >
                <FaSignOutAlt className="inline mr-2" /> Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
