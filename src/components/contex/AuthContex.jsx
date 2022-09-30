import React from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const AuthContex = React.createContext([null, () => {}]);

export const AuthProvider = (props) => {
  const [auth, setAuth] = useLocalStorage("auth", null);
  return (
    <AuthContex.Provider value={[auth, setAuth]}>
      {props.children}
    </AuthContex.Provider>
  );
};

export default AuthContex;
