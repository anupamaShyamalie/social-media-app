import "./message.css";
import { format } from "timeago.js";

function Message({ message, own }) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          alt=""
          className="messageImg"
          src="https://cdn.pixabay.com/photo/2024/02/04/04/11/fashion-8551487_1280.jpg"
        />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}

export default Message;
