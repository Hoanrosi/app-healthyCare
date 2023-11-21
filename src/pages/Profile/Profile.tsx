import React, { useState } from "react";

import "./profile.scss";

const Profile: React.FC = () => {
  const [nickName, setNickName] = useState("Pham Hoan");
  return (
    <div className="profile">
      <div className="container">
        <div className="profile-heading">Information Profile</div>

        <div className="profile-list-infor">
          <input
            type="text"
            className="profile-input"
            value="ID 123456"
            disabled
          />
          <input
            type="text"
            className="profile-input"
            value={nickName}
            onChange={(e) => setNickName(e.target.value)}
          />
          <input
            type="text"
            className="profile-input"
            value="ID 123456"
            disabled
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
