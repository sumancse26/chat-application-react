import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userLogin } from "../features/auth/authSlice";

export const useAuthChecking = () => {
  const [auth, setAuth] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const localAuth = localStorage.getItem("auth");
    if (localAuth) {
      const authInfo = JSON.parse(localAuth);
      if (authInfo?.accessToken && authInfo?.user) {
        dispatch(
          userLogin({ user: authInfo.user, accessToken: authInfo.accessToken })
        );
        setAuth(true);
      }
    }
  }, [dispatch]);

  return auth;
};
