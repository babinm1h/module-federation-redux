/// <reference types="react" />

declare module "host/AuthContext" {
  const useAuthContext: () => any;
  const AuthContextProvider: React.FC;
}

declare module "state/store" {
  export const store: any;
  export const addReducer: (name: string, currentReducers: any) => void;
}

