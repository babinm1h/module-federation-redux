import React, { Suspense } from "react";
import { BrowserRouter, Navigate, Route, RouterProvider, Routes } from "react-router-dom";
import MainLayout from "./components/MainLayout/MainLayout";
import { AuthContextProvider } from "./context/AuthContext";
import { Provider } from "react-redux";

import { store, addReducer } from "state/store";

const HostMain = React.lazy(() => import("./pages/HostMain/HostMain"));
const AuthPage = React.lazy(() => import("./pages/AuthPage/AuthPage"));

const AdminService = React.lazy(() => import("app1/AdminService"));
const App1 = React.lazy(() => import("app1/App1"));

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AuthContextProvider>
          <MainLayout>
            <Suspense fallback={<div>LOADING...</div>}>
              <Routes>
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/" element={<HostMain />} />
                <Route path="/admin/*" element={<App1 />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </MainLayout>
        </AuthContextProvider>
      </BrowserRouter>
    </Provider>
  );
};

export default App;

