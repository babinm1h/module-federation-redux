import React from "react";
import s from "./HostLogo.module.scss";
import img from "../assets/log.png";

const HostLogo = () => {
  return (
    <div className={s.wrapper}>
      host
      <img src={img} alt="" className={s.logo} />
    </div>
  );
};

export default HostLogo;

