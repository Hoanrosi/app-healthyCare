import axios from "axios";
import { useNavigate } from "react-router-dom";
import icon_logout from "../../components/image/icon-logout.png";

const Logout: React.FC = () => {
  const navigate = useNavigate();
  const logout = () => {
    axios
      .post(
        "http://localhost:3000/logout",
        {
          authToken: localStorage.getItem("authToken"),
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        console.log(res);
        localStorage.clear();
        navigate("/");
      })
      .catch((err) => {
        console.error("Error during logout:", err);
      });
  };
  return (
    <div>
      <img src={icon_logout} className="icon-sidebar" onClick={logout} />
    </div>
  );
};

export default Logout;
