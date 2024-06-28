import { useEffect, useState } from "react";
import "./chatonline.css";
import axios from "axios";

function Chatonline({ onlineUsers, currentId, setCurrentChat }) {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  console.log(onlineFriends);
  useEffect(() => {
    const getFriends = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8800/api/users/friends/" + currentId
        );
        setFriends(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [currentId]);

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  }, [friends, onlineUsers]);

  const handleClick = async (user) => {
    try {
      const res = await axios.get(
        `http://localhost:8800/api/conversations/find/${currentId}/${user._id}`
      );
      console.log(res);
      setCurrentChat(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="chatOnline">
      {onlineFriends.map((o) => (
        <div
          className="chatOnlineFriend"
          key={o._id}
          onClick={() => handleClick(o)}>
          <div className="chatOnlineImgContainer">
            <img
              className="chatOnlineImg"
              src={o?.profilePicture || "/assets/person/noAvatar.png"}
              alt=""
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{o?.username}</span>
        </div>
      ))}
    </div>
  );
}

export default Chatonline;
