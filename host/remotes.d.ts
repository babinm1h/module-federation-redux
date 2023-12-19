/// <reference types="react" />

declare module "app1/App1" {
  const App1: React.ComponentType;

  export default App1;
}

declare module "app1/AdminService" {
  const AdminService: React.ComponentType;

  export default AdminService;
}

declare module "state/store" {
  export const store: any;
  export const addReducer: (name: string, currentReducers: any) => void;
}

