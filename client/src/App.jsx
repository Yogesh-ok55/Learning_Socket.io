import { useEffect, useState } from 'react';
import './App.css';
import { io } from "socket.io-client";

function App() {
  const [message, setMessage] = useState("");
  const [mess, setMess] = useState([]);
  const [id, setId] = useState("");
  const [id1, setId1] = useState("");

  useEffect(() => {
    // Initialize the socket connection once
    const socket = io("http://localhost:3000");

    socket.on("connect", () => {
      console.log("connected");
      console.log("connection id: ", socket.id);
      setId(socket.id);
    });

    socket.on("welcome", (s) => {
      console.log(s);
    });

    socket.on("messages", (m) => {
      console.log(m);
      setMess((prevMess) => [...prevMess, m]);
    });

    // Cleanup on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (message.trim() !== "" && id1.trim() !== "") {
      const socket = io("http://localhost:3000");  // Get the same socket instance
      socket.emit("message", { message, id1 });
    }
  }

  return (
    <>
      <h1>id: {id}</h1>
      <input 
        type='text' 
        placeholder='message' 
        value={message} 
        onChange={(e) => setMessage(e.target.value)} 
      />
      <input 
        type='text' 
        placeholder='id to send message' 
        value={id1} 
        onChange={(e) => setId1(e.target.value)} 
      />
      <button onClick={handleSubmit}>Submit</button>
      {mess.map((m, index) => (
        <p key={index}>{m}</p>
      ))}
    </>
  );
}

export default App;
