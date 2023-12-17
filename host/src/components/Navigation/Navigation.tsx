import React, { useState } from "react";

import s from "./Navigation.module.scss";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "@/context/AuthContext";

const Navigation = () => {
  const [state, setState] = useState(0);
  const auth = useAuthContext();

  const onStateChange = () => {
    setState((prev) => {
      console.log("INSIDE SETSTATE");
      return prev + 1;
    });
    console.log("OUTSIDE SETSTATE");
  };

  return (
    <div className={s.nav}>
      <NavLink to="/">Host-Home</NavLink>
      <NavLink to="/auth">Host-Auth</NavLink>
      <NavLink to="/admin">App1-Admin</NavLink>

      {auth.user && (
        <div>
          <div>{auth.user.name}</div>
          <div>
            <button onClick={auth.onLogout}>LOGOUT</button>
          </div>
        </div>
      )}

      <div onClick={onStateChange}>setState</div>
    </div>
  );
};

export default Navigation;

