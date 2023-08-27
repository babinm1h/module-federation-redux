import React from "react";
import s from "./Logo.module.scss";
import img from "../assets/men.png";

const Logo = () => {
  return (
    <div className={s.wrapper}>
      app1
      <img src={img} alt="" className={s.logo} />
    </div>
  );
};

export default Logo;

