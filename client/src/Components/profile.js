import "../styles/profile.css";
import { GlobalContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";
import userProfile from "../assets/user.png";
function Profile() {
  const { pending, completed, Axios, removeLocalToken, loggingOut } =
    GlobalContext();
  const Navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const deleteUser = async () => {
    Axios.post("/users/delete");
    Navigate("/landing", { replace: true });
    loggingOut();
    removeLocalToken();
  };
  return (
    <div className="profile">
      <div className="image">
        <img src={userProfile} alt="" />
      </div>
      <div className="name">
        <h2>{user.name}</h2>
      </div>
      <div className="info">
        <h3>{user.city}</h3>
        <span>{user.age}</span>
      </div>
      <div className="status">
        <span className="completed">Completed {completed() || 0}</span>
        <span className="pending">pending {pending() || 0}</span>
      </div>
      <div className="edit">
        <span className="error" onClick={deleteUser}>
          Remove Profile
        </span>
      </div>
    </div>
  );
}

export default Profile;
