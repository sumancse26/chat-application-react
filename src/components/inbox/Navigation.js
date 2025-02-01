import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { userLogout } from "../../features/auth/authSlice";

export default function Navigation() {
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(userLogout());
    localStorage.clear();
  };
  return (
    <nav className="border-general sticky top-0 z-40 border-b bg-violet-700 transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between h-16 items-center">
          <Link to="/inbox">Chat Application</Link>
          <ul>
            <li className="text-white">
              <span onClick={logOut} className="cursor-pointer">
                Logout
              </span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
