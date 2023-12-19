import HostLogo from "@/components/HostLogo/HostLogo";
import React, { useEffect, useState } from "react";
import s from "./HostMain.module.scss";
import { IUser } from "@/models/user.model";

const HostMain = () => {
  const [users, setUsers] = useState<IUser[]>([]);

  // const fetchGenerator = function* () {
  //     try {
  //       const usersFetch = yield fetch("https://jsonplaceholder.typicode.com/users");
  //       const users = yield usersFetch.json();

  //       return users;
  //     } catch (err) {}
  //   };

  //   function execute(generator: any, yieldValue: any) {
  //     let next = generator.next(yieldValue);

  //     if (!next.done) {
  //       next.value.then(
  //         (result) => execute(generator, result),
  //         (err) => generator.throw(err)
  //       );
  //     } else {
  //       // обработаем результат return из генератора
  //       // обычно здесь вызов callback или что-то в этом духе
  //       console.log(next.value);
  //     }
  //   }

  //   console.log(execute(fetchGenerator()), "gener");

  const asyncFetchGenerator = async function* () {
    try {
      const usersFetch = await fetch("https://jsonplaceholder.typicode.com/users");
      const users = await usersFetch.json();

      yield users;
    } catch (err) {}
  };

  useEffect(() => {
    asyncFetchGenerator()
      .next()
      .then((res) => setUsers(res.value));
  }, []);

  return (
    <div>
      <HostLogo />
      <ul className={s.list}>
        {users.map((u) => {
          return (
            <li key={u.id} className={s.user}>
              <span>{u.id}</span>
              <span>{u.name}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default HostMain;

