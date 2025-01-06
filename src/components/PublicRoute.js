// import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  return !auth ? children : <Navigate to="/inbox" />;
};

export default PrivateRoute;
