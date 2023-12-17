import React, { useEffect, useState } from "react";
import s from "./AuthPage.module.scss";
import { useAuthContext } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const auth = useAuthContext();
  const nav = useNavigate();

  const handleSumbit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pass && name) {
      auth.onLogin(name, pass);
    }
  };

  useEffect(() => {
    if (auth.user) {
      nav("/");
    }
  }, [auth.user]);

  return (
    <div className={s.wrapper}>
      <form className={s.form} onSubmit={handleSumbit}>
        <input type="text" placeholder="login" onChange={(e) => setName(e.target.value)} />
        <input type="text" placeholder="password" onChange={(e) => setPass(e.target.value)} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Auth;

