import { IProfile } from "@/models/profile.model";
import { PropsWithChildren, createContext, useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({
  user: null,
  onLogout: () => {},
  onLogin: (name: string, pass: string) => {},
});

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [profile, setProfile] = useState<IProfile | null>(null);
  const nav = useNavigate();

  useEffect(() => {
    const authProfile = localStorage.getItem("profile");
    if (!authProfile) return nav("/auth");

    if (authProfile && !profile) {
      setProfile(JSON.parse(authProfile));
    }
  }, [profile]);

  const onLogout = useCallback(() => {
    localStorage.removeItem("profile");
    setProfile(null);
  }, []);

  const onLogin = useCallback((name: string, pass: string) => {
    const user = { name, pass };
    localStorage.setItem("profile", JSON.stringify(user));
    setProfile(user);
    nav("/");
  }, []);

  console.log(profile);

  return <AuthContext.Provider value={{ user: profile, onLogout, onLogin }}>{children}</AuthContext.Provider>;
};

