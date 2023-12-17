import Logo from "@/components/Logo";
import React, { useEffect, useState } from "react";
import s from "./AdminMain.module.scss";
import { useNavigate } from "react-router-dom";

interface IPost {
  id: number;
  title: string;
}

const AdminMain = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const nav = useNavigate();

  const handleUserClick = (id: number) => {
    return () => {
      nav(`/admin/${id}`);
    };
  };

  const asyncFetchGenerator = async function* () {
    try {
      const usersFetch = await fetch("https://jsonplaceholder.typicode.com/posts");
      const users = await usersFetch.json();

      yield users;
    } catch (err) {}
  };

  useEffect(() => {
    asyncFetchGenerator()
      .next()
      .then((res) => setPosts(res.value));
  }, []);

  return (
    <div>
      Admin app1
      <Logo />
      <div className={s.list}>
        {posts.map((p) => (
          <div key={p.id} className={s.item} onClick={handleUserClick(p.id)}>
            <span>{p.id}</span>
            <span>{p.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminMain;

