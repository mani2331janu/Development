import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { Menu as MenuIcon } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

const Header = ({ sidebarWidth = 250, onToggleSidebar }) => {
  
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const { logout, user } = useAuth();   // <-- get user

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <header
      style={{ left: sidebarWidth }}
      className="fixed top-0 right-0 h-16 bg-white/70 backdrop-blur-md border-b border-white/20 z-50 flex items-center justify-between px-6 font-semibold"
    >
      {/* Left side */}
      <div className="flex items-center gap-4">
        <button
          className="md:hidden p-2 rounded hover:bg-gray-200"
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
        >
          <MenuIcon size={20} />
        </button>
        <span>My Application</span>
      </div>

      {/* Right side */}
      <div
        className="relative bg-white w-44 shadow-lg ring-1 ring-gray-200 rounded-md"
        ref={dropdownRef}
      >
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 px-3 py-1 rounded-full hover:bg-gray-100"
        >
          <div className="w-9 h-9 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">
            {user?.name?.[0]?.toUpperCase()}
          </div>
          <span className="hidden sm:inline text-gray-700">
            {user?.name}
          </span>
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-44 bg-white shadow-lg rounded-lg border border-gray-200">
            <ul className="py-2 text-sm text-gray-700">
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Profile
              </li>
              <li
                onClick={handleLogout}
                className="px-4 py-2 hover:bg-gray-100 text-red-500 cursor-pointer"
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
