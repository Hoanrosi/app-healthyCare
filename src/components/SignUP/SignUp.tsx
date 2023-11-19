import React, { useState } from "react";
import backgroundFirst from "../image/background-2.png";
import backgroundSecond from "../image/background-1.png";
import icon_email from "../image/Message.png";
import icon_look from "../image/Lock.png";
import icon_Show from "../image/Show.png";
import icon_google from "../image/google.png";
import icon_facebook from "../image/Facebook.png";
import icon_profile from "../image/Profile.png";
import icon_mobile from "../image/smartphone 6.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./sign-up.scss";

const SignUp: React.FC = () => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios
      .post("http://localhost:3000/signup", {
        name,
        mobile,
        email,
        password,
      })
      .then((result) => {
        console.log(result);
        navigate("/home");
      })
      .catch((err) => console.log(err));
    console.log("Submitted");
  };

  return (
    <div className="sign-up-layout">
      <div className="sign-up-header">
        <div className="sign-up-image">
          <img src={backgroundFirst} className="image-background-first" />
          <img src={backgroundSecond} className="image-background-second" />
        </div>
      </div>
      <div className="sign-up-form">
        <div className="sign-up-form-heading">Sign up</div>
        <div className="sign-up-form-description">Create an account here</div>
        <form className="sign-up-form-info" onSubmit={handleSubmit}>
          <div className="sign-up-form-item">
            <div className="form-item-suffix">
              <img src={icon_profile} className="icon-form" />
            </div>
            <input
              type="text"
              className="form-input"
              value={name}
              placeholder="Create an account here"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="sign-up-form-item">
            <div className="form-item-suffix">
              <img src={icon_mobile} className="icon-form" />
            </div>
            <input
              type="text"
              className="form-input"
              value={mobile}
              placeholder="Mobile Number"
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>
          <div className="sign-up-form-item">
            <div className="form-item-suffix">
              <img src={icon_email} className="icon-form" />
            </div>
            <input
              type="email"
              className="form-input"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="sign-up-form-item">
            <div className="form-item-suffix">
              <img src={icon_look} className="icon-form" />
            </div>
            <input
              type="password"
              className="form-input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <img src={icon_Show} className="icon-form" />
          </div>

          <div className="sign-up-form-des">
            By signing up you agree with our Terms of Use
          </div>
          <button className="sign-up-form-btn">Sign UP</button>
        </form>

        <div className="sign-up-footer">
          <div className="sign-up-footer-choose">
            <div className="sign-up-footer-choose-title">OR</div>
          </div>
          <div className="sign-up-social-network">
            <div className="sign-up-social-icon">
              <img src={icon_google} className="icon-google" />
            </div>
            <div className="sign-up-social-title">Login with Gmai</div>
          </div>
          <div className="sign-up-social-network">
            <div className="sign-up-social-icon">
              <img src={icon_facebook} className="icon-facebook" />
            </div>
            <div className="sign-up-social-title">Login with Facebook</div>
          </div>

          <div className="new-user">
            <div className="title">
              New member?{" "}
              <Link to="/" className="title-sign-up">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
