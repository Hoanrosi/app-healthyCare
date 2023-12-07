import React, { useState, useEffect } from "react";
import icon_avatar from "../../components/image/icon-profile-avatar.png";
import icon_rank from "../../components/image/Vector.png";
import image from "../../components/image/avatar_1.jpg";
import UploadImage from "../../components/Upload";
import { Cascader, InputNumber, Space } from "antd";
import "./profile.scss";
import icon_email from "../../components/image/icon-email.png";
import icon_phone from "../../components/image/smartphone 6.png";
import axios from "axios";

const Profile: React.FC = () => {
  const [formData, setFormData] = useState({
    useName: "",
    email: "",
    phone: " ",
    weight: 48,
    height: 160,
  });
  const [profileImage, setProfileImage] = useState(image);
  const [dataInfor, setDataInfor] = useState<array>();
  const [loading, setLoading] = useState(false);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        setProfileImage(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChangeUserName = (value: string) => {
    setFormData({
      ...formData,
      useName: value,
    });
  };
  const handleChangeEmail = (value: string) => {
    setFormData({
      ...formData,
      email: value,
    });
  };
  const handleChangePhone = (value: string) => {
    setFormData({
      ...formData,
      phone: value,
    });
  };

  const handleChangeWeight = (value: number) => {
    setFormData({
      ...formData,
      weight: value,
    });

    console.log(formData.weight, 2222);
  };

  const handleChangeHeight = (value: number) => {
    setFormData({
      ...formData,
      height: value,
    });
  };

  const handleSaveEvent = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        "http://localhost:3000/informations",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setLoading(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchDataInfor = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/getinformations"
        );
        console.log(response.data);
        setDataInfor(response.data);
        setLoading(false);
        console.log(dataInfor, 3333);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchDataInfor();
  }, [loading]);

  return (
    <div className="profile">
      <div className="profile-content">
        <div className="profile-left">
          <div className="profile-left-header">
            <div className="profile-avatar">
              <img src={profileImage} className="profile-image" alt="Profile" />
              <label className="profile-icon-camera-label">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="profile-icon-camera-input"
                />
                <img
                  src={icon_avatar}
                  className="profile-icon-camera"
                  alt="Change Profile Image"
                />
              </label>
            </div>
          </div>
          <div className="proflie-name">
            {/* {healthData && healthData.valueHeartBeat !== undefined
              ? healthData.valueHeartBeat
              : "_"} */}
            {/* <div className="profile-name-value">
              {dataInfor && dataInfor.useName !== undefined
                ? dataInfor.useName
                : "_"}
            </div> */}
            <div className="profile-name-value">
              {dataInfor &&
              dataInfor.length > 0 &&
              dataInfor[0].useName !== undefined
                ? dataInfor[0].useName
                : "_"}
            </div>

            <img
              src={icon_rank}
              className="profile-name-icon"
              alt="Rank Icon"
            />
          </div>

          <div className="profile-information-brief">
            <div className="profile-information-brief-item">
              <svg
                className="icon"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M17.9159 3.42435C17.6687 2.60038 16.9045 2 16 2H2C1.0959 2 0.331914 2.5999 0.084381 3.42336L9 7.881L17.9159 3.42435ZM18 14L17.9994 5.618L9 10.118L-0.000640869 5.618L-8.26549e-08 14C-8.26549e-08 15.1046 0.89543 16 2 16H16C17.1046 16 18 15.1046 18 14Z"
                  fill="black"
                />
              </svg>
              <div className="profile-brief-item-heading">
                {dataInfor &&
                dataInfor.length > 0 &&
                dataInfor[0].email !== undefined
                  ? dataInfor[0].email
                  : "_"}
              </div>
            </div>
            <div className="profile-information-brief-item">
              <svg
                className="icon"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
              >
                <path
                  d="M6 1L7 5L5.08721 6.21256L5.23726 6.54236C6.51723 9.25413 8.70734 11.452 11.4135 12.7418L11.7885 12.9133L13 11L17 12V17C8.26864 17 1.1708 10.0061 1.00304 1.31487L1 1H6Z"
                  fill="black"
                />
              </svg>
              <div className="profile-brief-item-heading">
                {dataInfor &&
                dataInfor.length > 0 &&
                dataInfor[0].phone !== undefined
                  ? dataInfor[0].phone
                  : "_"}
              </div>
            </div>
            <div className="profile-information-brief-item">
              <svg
                className="icon"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M11 2C11 0.89543 10.1046 0 9 0C7.89544 0 7 0.89543 7 2C7 3.10457 7.89544 4 9 4C10.1046 4 11 3.10457 11 2ZM12.0012 6.85001C13.5671 6.68557 15.0055 6.38561 16.3162 5.94868L15.6838 4.05132L15.2733 4.18163C13.4725 4.7256 11.3816 5 9 5C6.43526 5 4.20755 4.68176 2.31623 4.05132L1.68378 5.94868L2.10992 6.08454C3.30464 6.44842 4.60108 6.70324 5.99911 6.85004L6 18H8V13H10V18H12L12.0012 6.85001Z"
                  fill="black"
                />
              </svg>
              <div className="profile-brief-item-heading">
                {dataInfor &&
                dataInfor.length > 0 &&
                dataInfor[0].height !== undefined
                  ? dataInfor[0].height
                  : "_"}{" "}
                cm
              </div>
            </div>
            <div className="profile-information-brief-item">
              <svg
                className="icon"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M15 0C13.3431 0 12 1.34315 12 3H14C14 2.44772 14.4477 2 15 2C15.5523 2 16 2.44772 16 3C16 3.25591 15.8536 3.48687 15.3415 3.93492C15.3047 3.96708 15.264 4.00211 15.2205 4.03951C15.0213 4.21085 14.7641 4.43208 14.5651 4.65595C14.31 4.94298 14 5.39224 14 6V7H16V6.05909C16.0112 6.04291 16.03 6.01837 16.0599 5.98468C16.1616 5.87023 16.2861 5.76263 16.4719 5.60212C16.5281 5.55351 16.59 5.50005 16.6585 5.44008C17.1464 5.01313 18 4.24409 18 3C18 1.34315 16.6569 0 15 0ZM15.985 6.08332C15.985 6.08333 15.9853 6.08258 15.9861 6.08105L15.985 6.08332Z"
                  fill="black"
                />
                <path
                  d="M12 6C12 8.20914 10.2091 10 8 10C5.79086 10 4 8.20914 4 6C4 3.79086 5.79086 2 8 2C10.2091 2 12 3.79086 12 6Z"
                  fill="black"
                />
                <path
                  d="M15 14C15 14 13.25 11 8 11C2.75 11 1 14 1 14V17H15V14Z"
                  fill="black"
                />
                <path
                  d="M15 10C15.5523 10 16 9.55229 16 9C16 8.44771 15.5523 8 15 8C14.4477 8 14 8.44771 14 9C14 9.55229 14.4477 10 15 10Z"
                  fill="black"
                />
              </svg>
              <div className="profile-brief-item-heading">
                {dataInfor &&
                dataInfor.length > 0 &&
                dataInfor[0].weight !== undefined
                  ? dataInfor[0].weight
                  : "_"}{" "}
                kg
              </div>
            </div>
          </div>
        </div>

        <div className="profile-right">
          <div className="profile-right-heading">User Profile</div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="143"
            height="2"
            viewBox="0 0 143 2"
            fill="none"
          >
            <path d="M-0.00244141 1.23901L143 1.23901" stroke="#D0D0D0" />
          </svg>

          {/* ======= upload file========= */}
          <UploadImage />

          <div className="profile-right-form">
            <div className="profile-right-form-name">
              <label>User Name</label>
              <input
                type="text"
                value={formData.useName}
                onChange={(e) => handleChangeUserName(e.target.value)}
              />
            </div>

            <div className="profile-right-form-info">
              <div className="profile-right-form-info-email">
                <label>Email Address</label>
                <div className="input-suffix">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                  >
                    <path
                      d="M25.6667 10.0426V19.5416C25.6667 21.5635 24.0841 23.2157 22.0902 23.3273L21.875 23.3333H6.12504C4.10317 23.3333 2.45092 21.7507 2.33937 19.7568L2.33337 19.5416V10.0426L13.594 15.9418C13.8484 16.0749 14.1517 16.0749 14.406 15.9418L25.6667 10.0426ZM6.12504 4.66663H21.875C23.8405 4.66663 25.4568 6.16219 25.6478 8.07743L14 14.1788L2.35226 8.07743C2.53621 6.23312 4.04175 4.77798 5.90815 4.67273L6.12504 4.66663Z"
                      fill="#ABB1BB"
                    />
                  </svg>
                  <input
                    type="text"
                    value={formData.email}
                    onChange={(e) => handleChangeEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="profile-right-form-info-email">
                <label>Phone Number</label>
                <div className="input-suffix">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                  >
                    <path
                      d="M18.375 2.33337C19.8247 2.33337 21 3.50863 21 4.95837V23.0417C21 24.4914 19.8247 25.6667 18.375 25.6667H9.625C8.17525 25.6667 7 24.4914 7 23.0417V4.95837C7 3.50863 8.17525 2.33337 9.625 2.33337H18.375ZM15.4583 21H12.5417C12.0584 21 11.6667 21.3918 11.6667 21.875C11.6667 22.3583 12.0584 22.75 12.5417 22.75H15.4583C15.9416 22.75 16.3333 22.3583 16.3333 21.875C16.3333 21.3918 15.9416 21 15.4583 21Z"
                      fill="#ABB1BB"
                    />
                  </svg>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => handleChangePhone(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="profile-right-form-weight-height">
              <Space direction="vertical">
                <InputNumber
                  addonBefore={
                    <Cascader
                      placeholder="weight (kg)"
                      style={{ width: 150 }}
                    />
                  }
                  value={formData.weight}
                  onChange={(value) =>
                    handleChangeWeight(value as number | undefined)
                  }
                />
                <InputNumber
                  addonBefore={
                    <Cascader placeholder="height(m)" style={{ width: 150 }} />
                  }
                  value={formData.height}
                  onChange={(value) =>
                    handleChangeHeight(value as number | undefined)
                  }
                />
              </Space>
            </div>
            <button className="btn" onClick={handleSaveEvent}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
