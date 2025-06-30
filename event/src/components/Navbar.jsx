import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate("/"); // redirect to home after logout
  };

  const isActive = (path) => location.pathname === path;

  // console.log(user)
  return (
    <nav className="bg-white shadow-lg border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white font-bold">📅</span>
              </div>
              <span className="text-xl font-bold text-gray-900">EventHub</span>
            </Link>
          </div>

          <div className="flex items-center space-x-8">
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
            {user ? <>
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

            </> : <></>}


            {
              user ? <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-100"
                >
                  <img
                    src={user.photoURL || "https://via.placeholder.com/32"}
                    alt={user.name}
                    className="h-8 w-8 rounded-full"
                  />
                  <span className="text-sm">▼</span>
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <div className="px-4 py-2 text-sm text-gray-700 border-b">👤 {user.name}</div>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      🚪 Logout
                    </button>
                  </div>
                )}
              </div> :
                <Link to='/login'> <button

                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 hidden"
                >
                  Sign In
                </button></Link>

            }

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
