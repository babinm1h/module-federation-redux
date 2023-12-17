import React, { Suspense } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

const AdminMain = React.lazy(() => import("./pages/AdminMain/AdminMain"));
const PostPage = React.lazy(() => import("./pages/PostPage/PostPage"));

const App = () => {
  return (
    <Suspense fallback={<div>LOADING...</div>}>
      <Routes>
        <Route index element={<AdminMain />} />
        <Route path="/:id/*" element={<PostPage />} />
      </Routes>
    </Suspense>
  );
};

export default App;

