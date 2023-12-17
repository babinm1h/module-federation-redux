import React from "react";
import { useParams } from "react-router-dom";

import { useAuthContext } from "host/AuthContext";

const PostPage = () => {
  const params = useParams();
  const auth = useAuthContext();

  console.log("REMOTE AUTH CTX", auth);

  return (
    <div>
      <h2>Hello {auth?.user?.name}</h2>
      <div>APP1 POST PAGE - {params.id}</div>
    </div>
  );
};

export default PostPage;

