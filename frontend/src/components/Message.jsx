import './Message.css'
import bus from "../utils/bus";

import {useState, useEffect} from 'react'

const Message = () => {
  let [type, setType] = useState('');
  let [visibility, setVisibility] = useState(false);
  let [message, setMessage] = useState("");

  useEffect(() => {
    bus.addListener("flash", ({ message, type }) => {
      setVisibility(true);
      setMessage(message);
      setType(type);
      setTimeout(() => {
        setVisibility(false);
      }, 4000);
    });
  }, []);

  useEffect(() => {
    if (document.querySelector(".close") !== null) {
      document
        .querySelector(".close")
        .addEventListener("click", () => setVisibility(false));
    }
  });

  return (
    visibility && (
      <div className={`message ${[type]}`}>{message}</div>
    )
  );
}

export default Message