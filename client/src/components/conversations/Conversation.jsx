import { useContext, useEffect, useState } from "react";
import "./conversation.css";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

function Conversation({ conversation }) {
  const { user: currentUser } = useContext(AuthContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);
    const getUser = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8800/api/users?userId=" + friendId
        );
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);
  // console.log(user);
  return (
    <div className="conversation">
      <img
        src={user?.profilePicture || "/assets/person/noAvatar.png"}
        
        alt=""
        className="conversationImg"
      />
      <span className="conversationText">{user?.username}</span>
    </div>
  );
}

export default Conversation;
