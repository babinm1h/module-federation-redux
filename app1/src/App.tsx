import React, { Suspense } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

const AdminMain = React.lazy(() => import("./pages/AdminMain/AdminMain"));
const PostPage = React.lazy(() => import("./pages/PostPage/PostPage"));
const ChatPage = React.lazy(() => import("./pages/Chat/Chat"));

const App = () => {
  return (
    <Suspense fallback={<div>LOADING...</div>}>
      <Routes>
        <Route index element={<AdminMain />} />
        <Route path="/:id/*" element={<PostPage />} />
        <Route path="chat" element={<ChatPage />} />
      </Routes>
    </Suspense>
  );
};

export default App;

