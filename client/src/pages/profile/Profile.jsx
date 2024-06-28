import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";


export default function Profile() {
  const [user,setUser] = useState({});
  const username = useParams().username;
  
  //fetch user from get user by id (api)
  const fetchUser = async()=>{
    //here use username manually,to get query from url use(paramsHook)
    const res = await axios.get(`http://localhost:8800/api/users?username=${username}`);
     setUser(res.data);
   }
   useEffect(() => {
     fetchUser();
   }, [username]);

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={user.coverPicture||"/assets/person/noCover.png"}
                alt=""
              />
              <img
                className="profileUserImg"
                src={user?.profilePicture||"/assets/person/noAvatar.png"}
                alt=""
              />
            </div>
            <div className="profileInfo">
                <h4 className="profileInfoName">{user.username}</h4>
                <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <Rightbar user={user}/>
          </div>
        </div>
      </div>
    </>
  );
}