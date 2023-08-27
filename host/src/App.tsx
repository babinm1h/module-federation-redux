import React from "react";
import HostLogo from "./components/HostLogo";
//@ts-ignore
const App1Logo = React.lazy(() => import("components/LogoBlock"));

const App = () => {
  return (
    <div>
      <App1Logo />
      <HostLogo />
    </div>
  );
};

export default App;

