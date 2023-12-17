// @ts-nocheck
import React, { PropsWithChildren, useEffect } from "react";
import Navigation from "../Navigation/Navigation";

import s from "./MainLayout.module.scss";

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className={s.wrap}>
      <Navigation />
      <main>{children}</main>
    </div>
  );
};

export default MainLayout;

