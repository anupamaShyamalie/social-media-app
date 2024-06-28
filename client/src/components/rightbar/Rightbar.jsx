import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@mui/icons-material";

export default function Rightbar({ user }) {
  const { user: currentUser,dispatch } = useContext(AuthContext);
  const [friends, setFriends] = useState([]);
  const [follow, setFollow] = useState(currentUser?.followings.includes(user?._id));

  useEffect(() => {
    setFollow(currentUser?.followings.includes(user?._id));
  }, [currentUser, user]);
  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get(
          "http://localhost:8800/api/users/friends/" + user._id
        );
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user]);

  const haddleClick = async () => {
    try {
      if (follow) {
        await axios.put(
          "http://localhost:8800/api/users/" + user._id + "/unfollow",
          { userId: currentUser._id }
        );
        dispatch({type:"UNFOLLOW",payload:user._id})
      } else {
        await axios.put(
          "http://localhost:8800/api/users/" + user._id + "/follow",
          { userId: currentUser._id }
        );
        dispatch({type:"FOLLOW",payload:user._id})
      }
    } catch (err) {
      console.log(err);
    }
    setFollow(!follow);
  };

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>Anupama Pathiranage</b> and <b>3 other friends</b> have a birhday
            today.
          </span>
        </div>
        <img
          className="rightbarAd"
          src="https://cdn.pixabay.com/animation/2022/11/03/16/42/16-42-39-820_512.gif"
          alt=""
        />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={haddleClick}>
            {follow ? "Unfollow" : "Follow"}
            {follow ? <Remove /> : <Add />}
          </button>
        )}
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user?.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user?.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">
              {user?.relationship === 0
                ? "single"
                : user.relationship === 1
                ? "Married"
                : "."}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>

        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <Link
              to={"/profile/" + friend.username}
              style={{ textDecoration: "none", color: "inherit" }}>
              <div className="rightbarFollowing">
                <img
                  src={
                    friend.profilePicture
                      ? `http://localhost:8800/images/${friend?.profilePicture}`
                      : "/assets/person/noAvatar.png"
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">
                  {friend?.username}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
