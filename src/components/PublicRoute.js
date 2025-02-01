import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthChecking } from "../hooks/useAuthChecking";

const PublicRoute = ({ children }) => {
  const auth = useAuthChecking();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth) {
      navigate("/inbox");
    }
  }, [auth, navigate]);

  if (auth) return null;

  return children;
};

export default PublicRoute;
