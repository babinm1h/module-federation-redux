import React, { useCallback, useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "host/AuthContext";
import s from "./Chat.module.scss";

const WS_URL = `ws://localhost:8000`;

interface IMessage {
  event: "connect" | "message";
  id: number;
  user: string;
  text: string;
}

const Chat = () => {
  const socketRef = useRef(new WebSocket(WS_URL));

  const [msg, setMsg] = useState("");
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const { user } = useAuthContext();

  const handleSocket = useCallback(() => {
    if (!user) return;
    const socket = socketRef.current;

    socket.onmessage = (ev) => {
      const message = JSON.parse(ev.data);
      console.log("msg", message);
      setMessages((prev) => [message, ...prev]);
    };

    socket.onopen = (ws) => {
      console.log(ws, "Socket connected");
      setConnected(true);
      const message = { event: "connect", id: Date.now(), user: user.name };
      socket.send(JSON.stringify(message));
    };

    socket.onerror = (ev) => {
      console.log(ev, "Socket error");
    };

    socket.onclose = (ev) => {
      console.log(ev, "Socket closed");
      setConnected(false);
    };
  }, [user]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const message: IMessage = { event: "message", id: Date.now(), user: user.name, text: msg };
    socketRef.current.send(JSON.stringify(message));
    setMsg("");
  };

  useEffect(() => {
    handleSocket();
  }, [handleSocket]);

  if (!connected || !user) {
    return <NavLink to={"/auth"}>Need to auth</NavLink>;
  }

  return (
    <form onSubmit={handleSendMessage}>
      <input type="text" placeholder="message" onChange={(e) => setMsg(e.target.value)} value={msg} />
      <button type="submit">send</button>

      <ul style={{ marginTop: "20px" }} className={s.list}>
        {messages.map((msg) => {
          return msg.event === "connect" ? (
            <li key={msg.id}>
              <span>{msg.user} connected to chat!</span>
            </li>
          ) : (
            <li key={msg.id} className={msg.user === user.name ? `${s.msg} ${s.ownMsg}` : s.msg}>
              <span>{msg.user}</span>: <span>{msg.text}</span>
            </li>
          );
        })}
      </ul>
    </form>
  );
};

export default Chat;

