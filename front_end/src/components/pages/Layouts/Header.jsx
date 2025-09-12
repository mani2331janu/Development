import { useNavigate } from "react-router-dom";
import { UserContent } from "../../../App";
import { useContext, useState } from "react";

const Header = () => {
  const user = useContext(UserContent);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  let handleLogOut = () => {
    navigate("login")
  }



  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white/70 backdrop-blur-md border-b border-white/20 z-50 flex items-center justify-between px-6 font-semibold">
      <span>My Application</span>

      <div className="fixed top-1 right-4 bg-white shadow-md rounded-full px-4 py-2">
        <button
          className="flex items-center gap-2 px-3 py-1 rounded hover:bg-gray-100"
          onClick={() => setOpen(!open)}
        >
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
            {user.uName.charAt(0).toUpperCase()}
          </div>

          <span className="text-gray-700">{user.uName}</span>
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg border">
            <ul className="py-2 text-sm text-gray-700">
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Profile
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Settings
              </li>
              <li onClick={handleLogOut} className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500">
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
