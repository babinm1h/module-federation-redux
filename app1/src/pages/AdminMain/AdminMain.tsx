import Logo from "@/components/Logo";
import React, { useEffect, useState } from "react";
import s from "./AdminMain.module.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postsSliceActions } from "@/slices/posts.slice";

interface IPost {
  id: number;
  title: string;
}

const AdminMain = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const { posts } = useSelector((state: any) => state?.posts);

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
      .then((res) => dispatch(postsSliceActions.setPosts(res.value)));
  }, []);

  return (
    <div>
      Admin app1
      <Logo />
      <div className={s.list}>
        {(posts as IPost[]).map((p) => (
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

